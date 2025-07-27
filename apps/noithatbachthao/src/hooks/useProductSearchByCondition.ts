import useSWRInfinite from 'swr/infinite'
import { getProductsByConditions } from '@/services/product/get-products-by-conditions'


export interface SearchConditions {
	categoryId?: string
	attributes?: ProductAttribute[]
	priceRange?: string
	pageSize?: number
}

export interface ProductSearchResult {
	products: Product[]
	isLoading: boolean
	isError: boolean
	size: number
	setSize: (size: number) => void
	totalCount: number | null
	hasMore: boolean
}

export function useProductSearchByCondition(
	conditions: SearchConditions,
): ProductSearchResult {
	const {
		categoryId,
		attributes = [],
		priceRange,
		pageSize = 12,
	} = conditions

	const getKey = (
		pageIndex: number,
		previousPageData: { products: Product[]; total: number } | null
	) => {
		// Không có categoryId thì không fetch
		if (!categoryId) return null
		// Nếu page trước không có sản phẩm, dừng fetch tiếp
		if (previousPageData && previousPageData.products.length === 0 && pageIndex != 0) return null

		return [
			'products-search',
			categoryId,
			JSON.stringify(attributes), // Chuyển attributes thành chuỗi JSON
			priceRange ?? '',
			pageIndex + 1, // page bắt đầu từ 1
			pageSize,
		] as any[]
	}

	const { data, error, size, setSize, isLoading: isLoadingApi } = useSWRInfinite(
		getKey,
		async (key) => {
			const [_keyName, _categoryId, attrsStr, priceRangeStr, page, pageSizeNum] = key



			const attrs = typeof attrsStr === 'string' ? JSON.parse(attrsStr || '[]') as ProductAttribute[] : []
			console.log('Fetching products:', {
				categoryId: _categoryId,
				attributes: attrs as ProductAttribute[],
				priceRange: priceRangeStr || undefined,
				page,
				pageSize: pageSizeNum
			})

			const res = await getProductsByConditions({
				categoryId: _categoryId,
				attributes: attrs,
				priceRange: priceRangeStr || undefined,
				page: page,
				pageSize: pageSizeNum,
			})
			console.log(res)
			return {
				products: res.data,
				total: res.total,
			}
		},
		{
			revalidateOnFocus: false,
			onError: (error) => {
				console.error('SWR Error:', error)
			}
		}
	)

	const products = data ? data.flatMap(page => page.products) : []
	const totalCount = data?.[0]?.total ?? null
	const isLoading = isLoadingApi
	const isError = !!error
	const hasMore = products.length < (totalCount ?? 0) && !isLoadingApi

	return {
		products,
		isLoading,
		isError,
		size,
		setSize,
		totalCount,
		hasMore
	}
}
