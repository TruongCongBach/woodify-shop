'use client'

import { useState, useEffect } from 'react'
import { fetchFeaturedProducts } from '@/services/product/fetch-featured-products'

export function useFeaturedProducts(limit: number = 10) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchFeaturedProducts(limit)
        setProducts(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching featured products:', err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit])

  return {
    products,
    loading,
    error,
  }
}
