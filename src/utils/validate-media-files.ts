/**
 * Helper function to validate media files before upload
 */
export function validateMediaFiles(files: File[]): { valid: boolean; errors: string[] } {
	const errors: string[] = []
	const maxFileSize = 10 * 1024 * 1024 // 10MB
	const allowedTypes = [
		'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
		'video/mp4', 'video/webm', 'video/ogg'
	]

	files.forEach((file, index) => {
		// Check file size
		if (file.size > maxFileSize) {
			errors.push(`File ${index + 1} (${file.name}) quá lớn. Tối đa 10MB.`)
		}

		// Check file type
		if (!allowedTypes.includes(file.type)) {
			errors.push(`File ${index + 1} (${file.name}) không được hỗ trợ. Chỉ chấp nhận ảnh và video.`)
		}
	})

	return {
		valid: errors.length === 0,
		errors
	}
}
