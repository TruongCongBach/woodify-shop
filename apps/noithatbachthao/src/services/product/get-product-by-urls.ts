import { supabase } from '@/lib/supabase'


export async function getProductsByUrls(urls: string[]): Promise<ProductDataBase[]> {
	if (urls.length === 0) return []

	// 1. Get products theo danh sách URL
	const { data: products, error: prodError } = await supabase
	.from('products')
	.select('*')
	.in('url', urls)

	if (prodError) throw prodError
	if (!products || products.length === 0) return []

	// 2. Get tất cả attributes của các product
	const productIds = products.map(p => p.id)
	const { data: attributes, error: attrError } = await supabase
	.from('product_attributes')
	.select('*')
	.in('product_id', productIds)

	if (attrError) throw attrError

	// 3. Kết hợp products với attributes tương ứng
	return products.map(product => {
		const productAttrs = attributes?.filter(attr => attr.product_id === product.id) || []
		return {
			...product,
			attributes: productAttrs,
		}
	})
}
