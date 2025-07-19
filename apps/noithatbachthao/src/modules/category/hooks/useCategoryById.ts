import useSWR from 'swr'
import { getCategoryById } from '@/modules/category/services'
import { getCategoryWithChildrenIdById } from '@/modules/category/services/get-category-with-children-id-by-id'

export function useCategoryById(id?: string) {
	const shouldFetch = Boolean(id)

	const { data, error, isLoading } = useSWR<Category | undefined>(
		shouldFetch ? `category-${id}` : null,
		():Promise<Category | undefined> => {
			if (!id) return Promise.resolve(undefined)
			return getCategoryById(id)
		}
	)

	return {
		category: data,
		isLoading,
		isError: error
	}
}

export function useCategoryWithChildrenIdById(id?: string) {
	const shouldFetch = Boolean(id)

	const { data, error, isLoading } = useSWR<CategoryTree | undefined>(
		shouldFetch ? `category-with-children-id-by-${id}` : null,
		():Promise<CategoryTree | undefined> => {
			if (!id) return Promise.resolve(undefined)
			return getCategoryWithChildrenIdById(id)
		}
	)

	return {
		category: data,
		isLoading,
		isError: error
	}
}
