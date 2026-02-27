import {useState, useEffect} from 'react'
import {sanityClient, queries, type Testimonial, type PhotoGallery, type Service, type SiteSettings, type FacebookImport, type FAQ, type PricingTier, type WhyChooseUsItem, type CTASection} from '../lib/sanity'

// Generic hook for fetching any Sanity query
export function useSanityQuery<T>(query: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await sanityClient.fetch<T>(query)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query])

  return {data, loading, error}
}

// Specific hooks for common queries
export function useFeaturedTestimonials() {
  return useSanityQuery<Testimonial[]>(queries.featuredTestimonials)
}

export function useAllTestimonials() {
  return useSanityQuery<Testimonial[]>(queries.allTestimonials)
}

export function useFeaturedGalleries() {
  return useSanityQuery<PhotoGallery[]>(queries.featuredGalleries)
}

export function useAllGalleries() {
  return useSanityQuery<PhotoGallery[]>(queries.allGalleries)
}

export function useActiveServices() {
  return useSanityQuery<Service[]>(queries.activeServices)
}

export function useSiteSettings() {
  return useSanityQuery<SiteSettings>(queries.siteSettings)
}

export function usePendingFacebookImports() {
  return useSanityQuery<FacebookImport[]>(queries.pendingImports)
}

// Hook for fetching a single service by slug
export function useService(slug: string) {
  return useSanityQuery<Service>(queries.serviceBySlug(slug))
}

// Hook for fetching galleries by category
export function useGalleriesByCategory(category: string) {
  const query = queries.galleriesByCategory(category)
  return useSanityQuery<PhotoGallery[]>(query)
}

// Hook for fetching FAQs
export function useActiveFAQs() {
  return useSanityQuery<FAQ[]>(queries.activeFAQs)
}

// Hook for fetching pricing tiers
export function useActivePricingTiers() {
  return useSanityQuery<PricingTier[]>(queries.activePricingTiers)
}

// Hook for fetching Why Choose Us items
export function useActiveWhyChooseUs() {
  return useSanityQuery<WhyChooseUsItem[]>(queries.activeWhyChooseUs)
}

// Hook for fetching a CTA section by ID
export function useCTASection(sectionId: string) {
  return useSanityQuery<CTASection>(queries.ctaSectionById(sectionId))
}
