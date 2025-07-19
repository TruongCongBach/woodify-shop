import { MediaUploadError } from "./MediaUploadError"

/**
 * Upload a single file and return the URL
 */
export async function uploadSingleFile(file: File): Promise<string> {
	try {
		const form = new FormData()
		form.append('file', file)

		const res = await fetch('/api/upload-image', {
			method: 'POST',
			body: form,
		})

		if (!res.ok) {
			throw new Error(`Upload failed: ${res.status} ${res.statusText}`)
		}

		const result = await res.json()

		if (!result.url) {
			throw new Error('No URL returned from upload API')
		}

		return result.url
	} catch (error) {
		console.error('Error uploading file:', error)
		throw new MediaUploadError(`Failed to upload file: ${file.name}`)
	}
}
