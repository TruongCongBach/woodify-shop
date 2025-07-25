// src/modules/category/hooks/useNavCategories.ts
import useSWR from 'swr'
import { fetchNavCategoriesWithChildren } from '@/services/fetch-nav-categories-with-children'

export function useNavCategoriesWithChildren() {
	return useSWR<CategoryTree[]>('nav-categories-with-children', fetchNavCategoriesWithChildren)
}
