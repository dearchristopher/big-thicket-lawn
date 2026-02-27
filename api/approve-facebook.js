// API route to approve a Facebook import and convert to testimonial or gallery

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'hj2wzg7f'
const SANITY_DATASET = process.env.SANITY_DATASET || 'production'
const SANITY_TOKEN = process.env.SANITY_TOKEN

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

async function sanityMutate(mutations) {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${new Date().getFullYear()}-01-01/data/mutate/${SANITY_DATASET}`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify({mutations}),
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Sanity mutate failed: ${error}`)
  }
  
  return response.json()
}

// Convert Facebook import to Testimonial
async function convertToTestimonial(importDoc, reviewerName) {
  // Create testimonial document
  const testimonialId = `testimonial-${importDoc.fbPostId}`
  const testimonialDoc = {
    _type: 'testimonial',
    _id: testimonialId,
    customerName: importDoc.content?.split('\n')[0]?.substring(0, 50) || 'Customer',
    quote: importDoc.content || '',
    rating: 5, // Default, can be edited in Sanity
    photoUrl: importDoc.mediaUrls?.[0] || '',
    isFeatured: false,
    fromFacebook: true,
    facebookPostId: importDoc.fbPostId,
    date: new Date().toISOString().split('T')[0],
  }
  
  // Update import status
  const updateImport = {
    patch: {
      id: importDoc._id,
      set: {
        status: 'testimonial',
        reviewedBy: reviewerName,
        reviewedAt: new Date().toISOString(),
        convertedToTestimonial: {_ref: testimonialId, _type: 'reference'},
      },
    },
  }
  
  await sanityMutate([
    {create: testimonialDoc},
    updateImport,
  ])
  
  return testimonialId
}

// Convert Facebook import to Photo Gallery
async function convertToGallery(importDoc, reviewerName) {
  // Need at least 2 photos for before/after, or duplicate if only 1
  const beforeUrl = importDoc.mediaUrls?.[0] || ''
  const afterUrl = importDoc.mediaUrls?.[1] || beforeUrl
  
  const galleryId = `gallery-${importDoc.fbPostId}`
  const galleryDoc = {
    _type: 'photoGallery',
    _id: galleryId,
    title: importDoc.content?.split('\n')[0]?.substring(0, 50) || 'Facebook Project',
    beforePhotoUrl: beforeUrl,
    afterPhotoUrl: afterUrl,
    description: importDoc.content || '',
    category: 'lawn-care', // Default, can be edited in Sanity
    isFeatured: false,
    fromFacebook: true,
    facebookPostId: importDoc.fbPostId,
    completedDate: new Date().toISOString().split('T')[0],
  }
  
  const updateImport = {
    patch: {
      id: importDoc._id,
      set: {
        status: 'gallery',
        reviewedBy: reviewerName,
        reviewedAt: new Date().toISOString(),
        convertedToGallery: {_ref: galleryId, _type: 'reference'},
      },
    },
  }
  
  await sanityMutate([
    {create: galleryDoc},
    updateImport,
  ])
  
  return galleryId
}

// Reject Facebook import
async function rejectImport(importDoc, reviewerName) {
  await sanityMutate([{
    patch: {
      id: importDoc._id,
      set: {
        status: 'rejected',
        reviewedBy: reviewerName,
        reviewedAt: new Date().toISOString(),
      },
    },
  }])
}

// Vercel serverless handler
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'})
  }
  
  if (!SANITY_TOKEN) {
    return res.status(500).json({error: 'Sanity token not configured'})
  }
  
  const {importId, action, reviewerName = 'Admin'} = req.body
  
  if (!importId || !action) {
    return res.status(400).json({error: 'Missing required fields: importId, action'})
  }
  
  if (!['testimonial', 'gallery', 'reject'].includes(action)) {
    return res.status(400).json({error: 'Invalid action. Must be: testimonial, gallery, or reject'})
  }
  
  try {
    // Fetch the import document
    const query = `*[_type == "facebookImport" && _id == $importId][0]`
    const importDoc = await sanityFetch(query, {importId})
    
    if (!importDoc) {
      return res.status(404).json({error: 'Import not found'})
    }
    
    if (importDoc.status !== 'pending') {
      return res.status(400).json({error: `Import already ${importDoc.status}`})
    }
    
    // Perform the action
    let resultId
    switch (action) {
      case 'testimonial':
        resultId = await convertToTestimonial(importDoc, reviewerName)
        break
      case 'gallery':
        resultId = await convertToGallery(importDoc, reviewerName)
        break
      case 'reject':
        await rejectImport(importDoc, reviewerName)
        break
    }
    
    return res.status(200).json({
      success: true,
      message: `Import ${action === 'reject' ? 'rejected' : `converted to ${action}`}`,
      importId,
      resultId,
      action,
    })
  } catch (error) {
    console.error('Approval error:', error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}
