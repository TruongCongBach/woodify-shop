import useSWR from 'swr'
import { getProductById } from '../services'

export function useProductById(id?: string) {
	const shouldFetch = Boolean(id)

	const { data, error, isLoading } = useSWR<Product | undefined>(
		shouldFetch ? `product-${id}` : null,
		():Promise<Product | undefined> => {
			if (!id) return Promise.resolve(undefined)
			return getProductById(id)
		}
	)

	return {
		product: data,
		isLoading,
		isError: error
	}
}
