// src/modules/category/hooks/useNavCategories.ts
import useSWR from 'swr'
import { fetchNavCategoriesWithChildren } from '../services/fetchNavCategoriesWithChildren'

export function useNavCategoriesWithChildren() {
	return useSWR<CategoryTree[]>('nav-categories-with-children', fetchNavCategoriesWithChildren)
}
