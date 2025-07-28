
/**
 * Transform database product to form data
 */
export function transformProductToFormData(product: ProductDataBase): Product {
	return {
		id: product.id,
		name: product.name,
		url: product.url,
		defaultImage: product.default_image || '',
		price: product.price || 0,
		description: product.description || '',
		shortDescription: product.short_description || '',
		categoryId: product.category_id,
		media: product.media as MediaItem[] || [],
		attributes: product.attributes || [],
		tags: product.tags || [],
		originalPrice: product.original_price || 0,
	}
}
