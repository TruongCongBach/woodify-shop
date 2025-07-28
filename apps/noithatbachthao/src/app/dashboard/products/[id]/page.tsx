'use client'

import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'
import { MediaUploadError } from '@/services/media/media-upload-error'
import { ProductUrlExistsError } from '@/utils/ProductUrlExistsError'
import { validateMediaFiles } from '@/utils/validate-media-files'
import { useCategories } from '@/hooks/useCategories'
import { useProductById } from '@/hooks/useProductById'
import { ProductForm, ProductFormData } from '@/components/product-form'
import { UploadedMedia } from '@/components/product-form/MediaUpload'
import { updateProductWithMedia } from '@/services/product/update-product-with-media'

export default function ProductEditPage() {
	const { id } = useParams<{id: string}>()
	const router = useRouter()
	const { data: allCategories } = useCategories()

	const { product, isLoading } = useProductById(id)

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
			await updateProductWithMedia(id, formData, media, product)

			toast.success('Product update successfully')
			router.push('/dashboard/products')

		} catch (error) {
			if (error instanceof ProductUrlExistsError) {
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


	if (isLoading) {
		return <div>
			<p>Loading product...</p>
		</div>
	}
	return (
		<div className="max-w-3xl mx-auto p-6">
			<ProductForm
				categories={allCategories || []}
				product={product}
				onSubmitAction={handleSubmit}
				onCancel={() => router.push('/dashboard/products')}
				loading={loading}
			/>
		</div>
	)
}
