// src/modules/product/hooks/useProducts.ts
import useSWR from 'swr'
import { fetchProducts } from '@/services/productAPI'

export function useProducts() {
	return useSWR('products', fetchProducts)
}
