// src/modules/category/hooks/useCategories.ts
import useSWR from 'swr'
import { fetchCategories } from '@/services/category'

export function useCategories() {
	return useSWR<Category[]>('categories', fetchCategories)
}
