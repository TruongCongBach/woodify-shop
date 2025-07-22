import { ProductFormData } from '@/components/product-form'

/**
 * Transform form data to database format
 */
export function transformProductToDbFormat(formData: ProductFormData, media: MediaItem[]): Omit<any, 'id'> {
	return {
		name: formData.name,
		url: formData.url,
		default_image: formData.defaultImage || '',
		price: formData.price,
		description: formData.description,
		short_description: formData.shortDescription || null,
		category_id: formData.categoryId,
		media: media,
		attributes: formData.attributes || [],
		tags: formData.tags || []
	}
}
