'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'
import { MediaUploadError } from '@/services/media/media-upload-error'
import { useCategories } from '@/hooks/useCategories'
import { ProductForm, ProductFormData } from '@/components/product-form'
import { UploadedMedia } from '@/components/product-form/MediaUpload'
import { validateMediaFiles } from '@/utils/validate-media-files'
import { createProductWithMedia } from '@/services/product/create-product-with-media'
import { ProductUrlExistsError } from '@/utils/ProductUrlExistsError'

export default function NewProductPage() {
	const router = useRouter()
	const { data: allCategories } = useCategories()
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (formData: ProductFormData, media: UploadedMedia) => {
		try {
			setLoading(true)

			// Validate files first
			const validation = validateMediaFiles(media.files)
			if (!validation.valid) {
				alert(validation.errors.join('\n'))
				return
			}
			await createProductWithMedia(formData, media)

			toast.success('Product create successfully')
			router.push('/dashboard/products')

		} catch (error) {
			if (error instanceof ProductUrlExistsError) {
				// Show specific URL error message
			} else if (error instanceof MediaUploadError) {
				// Show media upload error
				toast.error(error.message)
			} else {
				// General error
				console.error('Error:', error)
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-3xl mx-auto p-6">
			<ProductForm
				categories={allCategories || []}
				onSubmitAction={handleSubmit}
				onCancel={() => router.push('/dashboard/products')}
				loading={loading}
			/>
		</div>
	)
}
