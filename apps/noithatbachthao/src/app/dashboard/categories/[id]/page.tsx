'use client'

import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CategoryForm, CategoryFormData } from '@/modules/category/components/category-form'
import { useCategoryWithChildrenIdById } from '@/modules/category/hooks/useCategoryById'
import { useCategories } from '@/modules/category/hooks/useCategories'
import { processUpdateCategory } from '@/modules/category/services/process-update-category'

export default function EditCategoryPage() {
	const router = useRouter()
	const { id } = useParams() as {id: string}

	const { category, isLoading } = useCategoryWithChildrenIdById(id)
	const { data: allCategories } = useCategories()

	const handleSubmit = async (formData: CategoryFormData, file: File | undefined) => {
		console.log(file)
		try {
			await processUpdateCategory(id, formData, file)
			toast.success('Cập nhật danh mục thành công')
			router.push('/dashboard/categories')
		} catch (error) {
			console.error(error)
			toast.error('Có lỗi xảy ra khi cập nhật danh mục')
		}
	}

	if (isLoading || !category) return <div className="p-4">Đang tải...</div>

	const subOptions = (allCategories || []).filter((c) => c.id !== id).map((c) => ({
		id: c.id,
		name: c.name,
	}))

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Chỉnh sửa danh mục</h1>
			<CategoryForm
				initialValues={{
					name: category.name,
					url: category.url,
					image: category.image ?? '',
					description: category.description ?? '',
					children: category?.children?.map((s) => s.id) ?? [],
				}}
				categories={subOptions}
				onSubmitAction={handleSubmit}
				isEditing
				onCancel={() => router.push('/dashboard/categories')}
			/>
		</div>
	)
}
