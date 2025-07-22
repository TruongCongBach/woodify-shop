import { supabase } from '@/lib/supabase'
import { transformProductToFormData } from '@/utils/transformProductToFormData'

export async function getProductByUrl(url: string): Promise<Product | undefined> {
	// 1. Get product
	const { data: product, error: prodError } = await supabase
	.from('products')
	.select('*')
	.eq('url', url)
	.single()
	if (prodError) throw prodError

	// 2. Get attributes
	const { data: attributes, error: attrError } = await supabase
	.from('product_attributes')
	.select('*')
	.eq('product_id', product.id)
	if (attrError) throw attrError

	// 3. Combine
	return transformProductToFormData({
		...product,
		attributes: attributes || [],
	})
}
