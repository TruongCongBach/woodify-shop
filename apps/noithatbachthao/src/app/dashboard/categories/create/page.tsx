'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CategoryForm, CategoryFormData } from '@/modules/category/components/category-form'
import { useCategories } from '@/modules/category/hooks/useCategories'
import { processCreateCategory } from '@/modules/category/services/process-create-category'

export default function NewCategoryPage() {
	const router = useRouter()
	const { data: allCategories } = useCategories()

	const handleSubmit = async (formData: CategoryFormData, file: File | undefined) => {
		try {
			await processCreateCategory(formData as any, file)
			toast.success('Tạo danh mục thành công')
			router.push('/dashboard/categories')
		} catch (error) {
			console.error(error)
			toast.error('Có lỗi xảy ra khi tạo danh mục')
		}
	}

	const subOptions = (allCategories || []).map((c) => ({
		id: c.id,
		name: c.name,
	}))

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Tạo danh mục mới</h1>
			<CategoryForm
				initialValues={{
					name: '',
					url: '',
					image: '',
					description: '',
					children: [],
				}}
				categories={subOptions}
				onSubmitAction={handleSubmit}
				isEditing={false}
				onCancel={() => router.push('/dashboard/categories')}
			/>
		</div>
	)
}
