import useSWR from 'swr'
import { useMemo } from 'react'
import { buildFiltersFromAttributes } from '@/utils/build-filters-from-attributes'
import { getAttributeByCategory } from '@/services/category/get-attribute-by-category'


export const useProductAttributesByCategoryId = (categoryId: string) => {
	const { data, error, isLoading } = useSWR<any[]>(
		categoryId ? ['attributes', categoryId] : null,
		() => getAttributeByCategory(categoryId),
	)

	const filters = useMemo(() => {
		if(!data || data.length === 0) return []
		return buildFiltersFromAttributes(data)
	}, [data])

	return {
		data,
		filters,
		isLoading,
		isError: !!error
	}
}
