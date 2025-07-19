import { ProductFormData } from '@/modules/product/components/product-form'
import { UploadedMedia } from '../components/product-form/MediaUpload'
import { ProductUrlExistsError } from '../utils/ProductUrlExistsError'
import { checkProductUrlExists } from '../utils/checkProductUrlExists'
import { processUploadedMedia } from '@/modules/cloudinary/processUploadedMedia'
import { transformToDbFormat } from '@/modules/product/utils/transformToDbFormat'
import { createProduct } from '@/modules/product/services/index'
import { MediaUploadError } from '@/modules/cloudinary/MediaUploadError'




/**
 * Create a new product with media upload
 */
export async function createProductWithMedia(
	formData: ProductFormData,
	uploadedMedia: UploadedMedia
): Promise<Product> {
	try {
		// 1. Check if URL already exists
		const urlExists = await checkProductUrlExists(formData.url)
		if (urlExists) {
			throw new ProductUrlExistsError(formData.url)
		}

		// 2. Process and upload media files
		const mediaItems = await processUploadedMedia(uploadedMedia)

		let finalFormData = { ...formData }

		if(finalFormData.defaultImage && mediaItems.length > 0) {
			const indexOfDefaultImage = uploadedMedia.previews.findIndex((item: string) => item === finalFormData.defaultImage)
			if( indexOfDefaultImage !== -1) {
				// If default image is not in uploaded previews, reset it
				finalFormData.defaultImage = mediaItems[indexOfDefaultImage].src // Set to index image if available
			}
		}

		// 3. Set default image if not specified and we have images
		if (!finalFormData.defaultImage && mediaItems.length > 0) {
			const firstImage = mediaItems.find(item => item.type === 'image')
			if (firstImage) {
				finalFormData.defaultImage = firstImage.src
			}
		}


		// 4. Transform to database format
		const productData = transformToDbFormat(finalFormData, mediaItems)

		// 5. Create product in database
		return await createProduct(productData)

	} catch (error) {
		console.error('Error creating product with media:', error)

		if (error instanceof ProductUrlExistsError || error instanceof MediaUploadError) {
			throw error
		}

		throw new Error(`Không thể tạo sản phẩm: ${JSON.stringify(error)}`)
	}
}
