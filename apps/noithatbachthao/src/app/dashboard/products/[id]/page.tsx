'use client'

import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'
import { useCategories } from '@/hooks/useCategories'
import { useProductById } from '@/hooks/useProductById'
import { ProductForm, ProductFormData } from '@/components/product-form'
import { UploadedMedia } from '@/components/product-form/MediaUpload'

export default function ProductEditPage() {
	const { id } = useParams<{id: string}>()
	const router = useRouter()
	const { data: allCategories } = useCategories()

	const { product, isLoading } = useProductById(id)

	const [loading, setLoading] = useState(false)

	const handleSubmit = async (formData: ProductFormData, media: UploadedMedia) => {
		try {
			setLoading(true)

			// Basic validation
			if (media.files.length > 10) {
				toast.error('Không thể upload quá 10 files')
				return
			}

			// Call API endpoint to update product
			const response = await fetch(`/api/products/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					formData,
					media,
					existingProduct: product
				})
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to update product')
			}

			toast.success('Cập nhật sản phẩm thành công!')
			router.push('/dashboard/products')

		} catch (error) {
			console.error('Error updating product:', error)
			toast.error(
				error instanceof Error 
					? error.message 
					: 'Đã xảy ra lỗi khi cập nhật sản phẩm'
			)
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
