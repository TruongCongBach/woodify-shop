import { supabase } from '@/lib/supabase'
import { transformProductToFormData } from '@/utils/transform-product-to-form-data'

/**
 * Fetch a limited number of products for homepage display
 * @param limit - Number of products to fetch (default: 10)
 * @returns Promise<Product[]>
 */
export async function fetchFeaturedProducts(limit: number = 10): Promise<Product[]> {
	const { data, error } = await supabase
		.from('products')
		.select('*')
		.order('updated_at', { ascending: false })
		.limit(limit);
	
	if (error) throw error
	
	return data?.map(value => {
		return transformProductToFormData(value)
	}) || []
}
