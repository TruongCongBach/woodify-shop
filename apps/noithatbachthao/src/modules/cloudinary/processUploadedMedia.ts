import { UploadedMedia } from '@/modules/product/components/product-form/MediaUpload'
import { uploadMultipleFiles } from './uploadMultipleFiles'

/**
 * Process uploaded media and convert to MediaItem format
 */
export async function processUploadedMedia(
	uploadedMedia: UploadedMedia,
	existingMedia: MediaItem[] = []
): Promise<MediaItem[]> {
	try {
		// Upload new files and get URLs
		const uploadedUrls = await uploadMultipleFiles(uploadedMedia.files)

		// Create MediaItem objects for new uploads
		const newMediaItems: MediaItem[] = uploadedUrls.map((url, index) => ({
			src: url,
			type: uploadedMedia.type,
			alt: `${uploadedMedia.type} ${index + 1}`
		}))

		// Combine existing media with new uploads
		return [...existingMedia, ...newMediaItems]
	} catch (error) {
		console.error('Error processing uploaded media:', error)
		throw error
	}
}
