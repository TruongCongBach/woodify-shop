'use client'

import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useProductById } from '@/modules/product/hooks/useProductById'
import ProductForm, { ProductFormData } from '@/modules/product/components/product-form'
import { useState } from 'react'
import { UploadedMedia } from '@/modules/product/components/product-form/MediaUpload'
import { validateMediaFiles } from '@/modules/product/utils/validateMediaFiles'
import { ProductUrlExistsError } from '@/modules/product/utils/ProductUrlExistsError'
import { MediaUploadError } from '@/modules/cloudinary/MediaUploadError'
import { useCategories } from '@/modules/category/hooks/useCategories'
import { updateProductWithMedia } from '@/modules/product/services/updateProductWithMedia'

export default function ProductEditPage() {
	const { id } = useParams<{id: string}>()
	const router = useRouter()
	const { data: allCategories } = useCategories()

	const { product, isLoading } = useProductById(id)

	const [loading, setLoading] = useState(false)
	const [urlError, setUrlError] = useState<string | null>(null)

	const handleSubmit = async (formData: ProductFormData, media: UploadedMedia) => {
		try {
			setLoading(true)

			// Validate files first
			const validation = validateMediaFiles(media.files)
			if (!validation.valid) {
				alert(validation.errors.join('\n'))
				return
			}
			console.log(formData, media)
			await updateProductWithMedia(id, formData, media, product)

			toast.success('Product update successfully')
			router.push('/dashboard/products')

		} catch (error) {
			if (error instanceof ProductUrlExistsError) {
				// Show specific URL error message
				setUrlError(error.message)
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

	const categoryOptions = (allCategories || []).map((c) => ({
		id: c.id,
		name: c.name,
	}))

	if (isLoading) {
		return <div>
			<p>Loading product...</p>
		</div>
	}
	return (
		<div className="max-w-3xl mx-auto p-6">
			<ProductForm
				categories={categoryOptions}
				product={product}
				onSubmitAction={handleSubmit}
				onCancel={() => router.push('/dashboard/products')}
			/>
		</div>
	)
}
