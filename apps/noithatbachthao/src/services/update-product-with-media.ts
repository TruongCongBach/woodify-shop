import { ProductFormData } from "@/components/product-form"
import { UploadedMedia } from "@/components/product-form/MediaUpload"
import { checkProductUrlExists } from "@/utils/check-product-url-exists"
import { ProductUrlExistsError } from "@/utils/ProductUrlExistsError"
import { processUploadedMedia } from '@/services/process-uploaded-media'
import { transformProductToDbFormat } from '@/utils/transform-product-to-db-format'
import { updateProduct } from '@/services/product-api'
import { MediaUploadError } from '@/services/media-upload-error'

const FOLDER = 'ke-tivi'
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
		const allMediaItems = await processUploadedMedia(FOLDER, uploadedMedia, existingMediaItems)

		// 4. Handle default image selection
		const finalFormData = { ...formData }

		// If default_image is not set or not valid, find first available image
		if (!finalFormData.defaultImage ||
			!allMediaItems.some(item => item.src === finalFormData.defaultImage)) {
			const firstImage = allMediaItems.find(item => item.type === 'image')
			if (firstImage) {
				finalFormData.defaultImage = firstImage.src
			}
		}

		// 5. Prepare update data
		const updateData: Partial<Product> = transformProductToDbFormat(finalFormData, allMediaItems)

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
