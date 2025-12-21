'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'
import { useCategories } from '@/hooks/useCategories'
import { ProductForm, ProductFormData } from '@/components/product-form'
import { UploadedMedia } from '@/components/product-form/MediaUpload'

export default function NewProductPage() {
	const router = useRouter()
	const { data: allCategories } = useCategories()
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (formData: ProductFormData, media: UploadedMedia) => {
		try {
			setLoading(true)

			// Basic validation
			if (media.files.length > 10) {
				toast.error('Không thể upload quá 10 files')
				return
			}

			// Call API endpoint to create product
			const response = await fetch('/api/products', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					formData,
					media
				})
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to create product')
			}

			toast.success('Tạo sản phẩm thành công!')
			router.push('/dashboard/products')

		} catch (error) {
			console.error('Error creating product:', error)
			toast.error(
				error instanceof Error 
					? error.message 
					: 'Đã xảy ra lỗi khi tạo sản phẩm'
			)
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
