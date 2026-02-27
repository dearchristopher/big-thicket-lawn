// API route to sync Facebook posts to Sanity
// Can be triggered by Vercel Cron or manually

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'hj2wzg7f'
const SANITY_DATASET = process.env.SANITY_DATASET || 'production'
const SANITY_TOKEN = process.env.SANITY_TOKEN
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN

// Simple Sanity client for serverless
async function sanityFetch(query, params = {}) {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${new Date().getFullYear()}-01-01/data/query/${SANITY_DATASET}`
  const queryString = new URLSearchParams({query, params: JSON.stringify(params)}).toString()
  
  const response = await fetch(`${url}?${queryString}`, {
    headers: {
      'Authorization': SANITY_TOKEN ? `Bearer ${SANITY_TOKEN}` : undefined,
    },
  })
  
  if (!response.ok) {
    throw new Error(`Sanity fetch failed: ${response.statusText}`)
  }
  
  const data = await response.json()
  return data.result
}

async function sanityCreate(doc) {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${new Date().getFullYear()}-01-01/data/mutate/${SANITY_DATASET}`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify({
      mutations: [{create: doc}],
    }),
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Sanity create failed: ${error}`)
  }
  
  return response.json()
}

// Fetch posts from Facebook
async function fetchFacebookPosts(limit = 25) {
  if (!FACEBOOK_PAGE_ID || !FACEBOOK_ACCESS_TOKEN) {
    throw new Error('Facebook credentials not configured')
  }
  
  const fields = 'id,message,permalink_url,attachments{media_type,media,subattachments},created_time'
  const url = `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/posts?fields=${fields}&limit=${limit}&access_token=${FACEBOOK_ACCESS_TOKEN}`
  
  const response = await fetch(url)
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Facebook API error: ${error.error?.message || response.statusText}`)
  }
  
  const data = await response.json()
  return data.data || []
}

// Get already imported post IDs
async function getImportedPostIds() {
  const query = `*[_type == "facebookImport"].fbPostId`
  return await sanityFetch(query) || []
}

// Analyze content to suggest action
function analyzeContent(message, mediaCount) {
  const msg = (message || '').toLowerCase()
  
  // Keywords suggesting a testimonial
  const testimonialKeywords = ['review', 'recommend', 'great job', 'amazing', 'excellent', 'love', 'thank', 'thanks', 'appreciate']
  const hasTestimonialKeywords = testimonialKeywords.some(kw => msg.includes(kw))
  
  // Keywords suggesting a transformation/gallery
  const galleryKeywords = ['before', 'after', 'transformation', 'makeover']
  const hasGalleryKeywords = galleryKeywords.some(kw => msg.includes(kw))
  
  if (hasTestimonialKeywords && !hasGalleryKeywords) return 'testimonial'
  if (hasGalleryKeywords || mediaCount >= 2) return 'gallery'
  if (mediaCount === 1) return 'gallery'
  
  return 'none'
}

// Extract media URLs from Facebook post
function extractMediaUrls(post) {
  const urls = []
  const attachments = post.attachments?.data || []
  
  for (const attachment of attachments) {
    if (attachment.media_type === 'photo' && attachment.media?.image?.src) {
      urls.push(attachment.media.image.src)
    }
    
    // Handle albums with multiple photos
    if (attachment.subattachments?.data) {
      for (const sub of attachment.subattachments.data) {
        if (sub.media?.image?.src) {
          urls.push(sub.media.image.src)
        }
      }
    }
  }
  
  return urls
}

// Main sync function
async function syncFacebookPosts() {
  if (!SANITY_TOKEN) {
    return {
      success: false,
      error: 'Sanity token not configured',
      imported: 0,
    }
  }
  
  try {
    // Fetch posts from Facebook
    const posts = await fetchFacebookPosts()
    
    // Get already imported IDs
    const importedIds = await getImportedPostIds()
    
    // Filter to new posts only
    const newPosts = posts.filter(post => !importedIds.includes(post.id))
    
    // Import each new post
    const imported = []
    for (const post of newPosts) {
      const mediaUrls = extractMediaUrls(post)
      const suggestedAction = analyzeContent(post.message, mediaUrls.length)
      
      const doc = {
        _type: 'facebookImport',
        _id: `fb-import-${post.id}`,
        fbPostId: post.id,
        fbPermalinkUrl: post.permalink_url,
        content: post.message || '',
        mediaUrls: mediaUrls,
        mediaType: post.attachments?.data?.[0]?.media_type || 'text',
        importedAt: new Date().toISOString(),
        status: 'pending',
        suggestedAction: suggestedAction,
      }
      
      await sanityCreate(doc)
      imported.push({
        id: post.id,
        suggestedAction,
        mediaCount: mediaUrls.length,
      })
    }
    
    return {
      success: true,
      imported: imported.length,
      posts: imported,
      message: `Imported ${imported.length} new posts from Facebook`,
    }
  } catch (error) {
    console.error('Sync error:', error)
    return {
      success: false,
      error: error.message,
      imported: 0,
    }
  }
}

// Vercel serverless handler
module.exports = async (req, res) => {
  // Allow GET for manual trigger or cron job
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'})
  }
  
  // Optional: verify cron secret if running as cron job
  const cronSecret = req.headers['x-vercel-cron-secret']
  if (cronSecret && cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({error: 'Unauthorized'})
  }
  
  const result = await syncFacebookPosts()
  
  if (result.success) {
    return res.status(200).json(result)
  } else {
    return res.status(500).json(result)
  }
}
