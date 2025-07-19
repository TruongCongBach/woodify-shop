// lib/upload-image.ts

import { Readable } from 'stream'
import type { UploadApiResponse } from 'cloudinary'
import { cloudinary } from '@/lib/cloudinary'

export async function uploadImageToCloudinary(buffer: Buffer, folder = 'noithatbachthao'): Promise<string> {
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{ folder },
			(error, result: UploadApiResponse | undefined) => {
				if (error || !result) {
					return reject(error)
				}
				resolve(result.secure_url)
			}
		)

		Readable.from(buffer).pipe(uploadStream)
	})
}



