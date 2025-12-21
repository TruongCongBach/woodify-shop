'use client'

import { useState, useEffect } from 'react'

interface UseApiOptions<T> {
  initialData?: T
  enabled?: boolean
}

interface UseApiReturn<T> {
  data: T
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const { initialData, enabled = true } = options
  
  const [data, setData] = useState<T>(initialData as T)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      console.error('API Error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (enabled) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}
