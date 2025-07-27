'use client'

import { CategoryForm, CategoryFormData } from '@/components/category-form'
import { useCategories } from '@/hooks/useCategories'
import { processCreateCategory } from '@/services/category/process-create-category'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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

	const subOptions = (allCategories || [])

	return (
		<div className="max-w-2xl mx-auto p-6">
			<CategoryForm
				initialValues={{
					name: '',
					url: '',
					image: '',
					description: '',
					children: [],
					showInNav: false,
				}}
				categories={subOptions}
				onSubmitAction={handleSubmit}
				isEditing={false}
				onCancel={() => router.push('/dashboard/categories')}
			/>
		</div>
	)
}
