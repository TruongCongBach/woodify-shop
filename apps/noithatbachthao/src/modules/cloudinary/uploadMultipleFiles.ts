import { uploadSingleFile } from './uploadSingleFile'

/**
 * Upload multiple files concurrently
 */
export async function uploadMultipleFiles(files: File[]): Promise<string[]> {
	if (files.length === 0) return []

	try {
		const uploadPromises = files.map(file => uploadSingleFile(file))
		const urls = await Promise.all(uploadPromises)
		return urls
	} catch (error) {
		console.error('Error uploading multiple files:', error)
		throw error
	}
}
