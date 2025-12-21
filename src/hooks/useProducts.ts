// src/modules/product/hooks/useProducts.ts
import useSWR from 'swr'
import { fetchProducts } from '@/services/product'

export function useProducts() {
	return useSWR('products', fetchProducts)
}
