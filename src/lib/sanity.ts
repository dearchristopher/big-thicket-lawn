import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'hj2wzg7f'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster reads in production
  perspective: 'published', // Only fetch published documents
})

// For authenticated requests (if needed later)
export const sanityWriteClient = import.meta.env.VITE_SANITY_TOKEN
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token: import.meta.env.VITE_SANITY_TOKEN,
      useCdn: false,
    })
  : null

// Helper to build image URLs from SmugMug (since we're using external URLs)
export function getSmugMugImageUrl(url: string) {
  if (!url) return ''
  
  // SmugMug URLs can be modified for sizing
  // If the URL contains size parameters, we might want to modify them
  // For now, return as-is since SmugMug handles sizing via URL params
  return url
}

// GROQ queries for common data fetching
export const queries = {
  // Testimonials
  featuredTestimonials: `*[_type == "testimonial" && isFeatured == true && !(_id in path("drafts.**"))] | order(date desc)`,
  allTestimonials: `*[_type == "testimonial" && !(_id in path("drafts.**"))] | order(date desc)`,
  testimonialsByService: (service: string) => `*[_type == "testimonial" && serviceType == "${service}" && !(_id in path("drafts.**"))] | order(date desc)`,
  
  // Photo Galleries
  featuredGalleries: `*[_type == "photoGallery" && isFeatured == true && !(_id in path("drafts.**"))] | order(completedDate desc)`,
  allGalleries: `*[_type == "photoGallery" && !(_id in path("drafts.**"))] | order(completedDate desc)`,
  galleriesByCategory: (category: string) => `*[_type == "photoGallery" && category == "${category}" && !(_id in path("drafts.**"))] | order(completedDate desc)`,
  
  // Services
  activeServices: `*[_type == "service" && isActive == true && !(_id in path("drafts.**"))] | order(orderIndex asc)`,
  allServices: `*[_type == "service" && !(_id in path("drafts.**"))] | order(orderIndex asc)`,
  serviceBySlug: (slug: string) => `*[_type == "service" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0]`,
  
  // Site Settings
  siteSettings: `*[_type == "siteSettings"][0]`,
  
  // Facebook Imports
  pendingImports: `*[_type == "facebookImport" && status == "pending" && !(_id in path("drafts.**"))] | order(importedAt desc)`,
  recentImports: `*[_type == "facebookImport" && !(_id in path("drafts.**"))] | order(importedAt desc)[0...20]`,
  
  // FAQ
  activeFAQs: `*[_type == "faq" && isActive == true] | order(orderIndex asc)`,
  faqsByCategory: (category: string) => `*[_type == "faq" && category == "${category}" && isActive == true] | order(orderIndex asc)`,
}

// TypeScript types for Sanity documents
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  customerName: string
  quote: string
  rating: number
  photoUrl?: string
  serviceType?: string
  isFeatured: boolean
  date?: string
  fromFacebook: boolean
  facebookPostId?: string
}

export interface PhotoGallery {
  _id: string
  _type: 'photoGallery'
  title: string
  beforePhotoUrl: string
  afterPhotoUrl: string
  description?: string
  category: string
  isFeatured: boolean
  completedDate?: string
  fromFacebook: boolean
  facebookPostId?: string
}

export interface Service {
  _id: string
  _type: 'service'
  name: string
  slug: {current: string}
  shortDescription: string
  fullDescription?: unknown[] // Portable Text
  pricingText?: string
  iconName?: string
  photoUrl?: string
  orderIndex: number
  isActive: boolean
  metaTitle?: string
  metaDescription?: string
}

export interface FacebookImport {
  _id: string
  _type: 'facebookImport'
  fbPostId: string
  fbPermalinkUrl?: string
  content?: string
  mediaUrls?: string[]
  mediaType?: 'photo' | 'video' | 'album' | 'text'
  importedAt: string
  status: 'pending' | 'testimonial' | 'gallery' | 'rejected'
  suggestedAction?: 'testimonial' | 'gallery' | 'none'
  convertedToTestimonial?: {_ref: string}
  convertedToGallery?: {_ref: string}
  reviewedBy?: string
  reviewedAt?: string
  notes?: string
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  phoneNumber?: string
  businessHours?: string
  serviceArea?: string
  heroTitle?: string
  heroSubtitle?: string
  heroImageUrl?: string
  aboutText?: unknown[] // Portable Text
  facebookPageUrl?: string
  facebookPageId?: string
  facebookAccessToken?: string
  metaTitle?: string
  metaDescription?: string
  yearEstablished?: number
  ownerNames?: string
}

export interface FAQ {
  _id: string
  _type: 'faq'
  question: string
  answer: string
  category: string
  orderIndex: number
  isActive: boolean
}
