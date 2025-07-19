import { processUploadedMedia } from '@/modules/cloudinary/processUploadedMedia'
import { ProductFormData } from '@/modules/product/components/product-form'
import { UploadedMedia } from '@/modules/product/components/product-form/MediaUpload'
import { ProductUrlExistsError } from '@/modules/product/utils/ProductUrlExistsError'
import { checkProductUrlExists } from '@/modules/product/utils/checkProductUrlExists'
import { updateProduct } from '@/modules/product/services/index'
import { MediaUploadError } from '@/modules/cloudinary/MediaUploadError'
import { transformToDbFormat } from '@/modules/product/utils/transformToDbFormat'

/**
 * Update an existing product with media upload
 */
export async function updateProductWithMedia(
	productId: string,
	formData: ProductFormData,
	uploadedMedia: UploadedMedia,
	existingProduct?: Product
): Promise<Product> {
	try {
		// 1. Check if URL already exists (excluding current product)
		const urlExists = await checkProductUrlExists(formData.url, productId)
		if (urlExists) {
			throw new ProductUrlExistsError(formData.url)
		}

		// 2. Get existing media or empty array
		const existingMediaItems = existingProduct?.media || []

		// 3. Process and upload new media files
		const allMediaItems = await processUploadedMedia(uploadedMedia, existingMediaItems)

		// 4. Handle default image selection
		let finalFormData = { ...formData }

		// If default_image is not set or not valid, find first available image
		if (!finalFormData.defaultImage ||
			!allMediaItems.some(item => item.src === finalFormData.defaultImage)) {
			const firstImage = allMediaItems.find(item => item.type === 'image')
			if (firstImage) {
				finalFormData.defaultImage = firstImage.src
			}
		}

		// 5. Prepare update data
		const updateData: Partial<Product> = transformToDbFormat(finalFormData, allMediaItems)

		// 6. Update product in database
		return await updateProduct(productId, updateData)

	} catch (error) {
		console.error('Error updating product with media:', error)

		if (error instanceof ProductUrlExistsError || error instanceof MediaUploadError) {
			throw error
		}

		throw new Error(`Không thể cập nhật sản phẩm: ${JSON.stringify(error)}`)
	}
}
