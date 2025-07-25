import useSWR from 'swr'
import { getProductByUrl } from '@/services/get-product-by-url'

export function useProductByUrl(url?: string) {
	const shouldFetch = Boolean(url)

	const { data, error, isLoading } = useSWR<Product | undefined>(
		shouldFetch ? `product-${url}` : null,
		():Promise<Product | undefined> => {
			if (!url) return Promise.resolve(undefined)
			return getProductByUrl(url)
		}
	)

	return {
		product: data,
		isLoading,
		isError: error
	}
}
