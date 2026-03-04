import {useState, useEffect} from 'react'

/**
 * Hook to detect if we're on the /review route or have ?review=true query parameter
 * Used to show prominent review modal and CTA instead of the quote CTA
 */
export function useReviewMode(): boolean {
  const [isReviewMode, setIsReviewMode] = useState(false)

  useEffect(() => {
    const checkReviewMode = () => {
      const params = new URLSearchParams(window.location.search)
      const isReviewRoute = window.location.pathname === '/review'
      const isReviewQuery = params.get('review') === 'true'
      setIsReviewMode(isReviewRoute || isReviewQuery)
    }

    checkReviewMode()

    // Listen for URL changes (for SPAs that use history API)
    const handlePopState = () => checkReviewMode()
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return isReviewMode
}
