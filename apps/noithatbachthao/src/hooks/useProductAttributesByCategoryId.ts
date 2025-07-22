import useSWR from 'swr'
import { useMemo } from 'react'
import { buildFiltersFromAttributes } from '@/utils/buildFiltersFromAttributes'
import { getAttributeByCategory } from '@/services/getAttributeByCategory'


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
