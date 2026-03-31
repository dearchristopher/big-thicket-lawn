import { createContext, useContext, useState, useEffect } from 'react'
import { sanityClient, queries, type SiteSettings } from '../lib/sanity'

interface SiteSettingsContextValue {
  data: SiteSettings | null
  loading: boolean
  error: Error | null
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  data: null,
  loading: true,
  error: null,
})

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient.fetch<SiteSettings>(queries.siteSettings)
      .then(setData)
      .catch(err => setError(err instanceof Error ? err : new Error('Unknown error')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <SiteSettingsContext.Provider value={{ data, loading, error }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteSettingsContext() {
  return useContext(SiteSettingsContext)
}
