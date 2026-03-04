import { useState, useEffect } from 'react'

/**
 * Hook to detect if the URL has ?review=true query parameter
 * Used to show prominent review modal and CTA instead of the quote CTA
 */
export function useReviewMode(): boolean {
  const [isReviewMode, setIsReviewMode] = useState(false)

  useEffect(() => {
    const checkReviewMode = () => {
      const params = new URLSearchParams(window.location.search)
      setIsReviewMode(params.get('review') === '')
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
