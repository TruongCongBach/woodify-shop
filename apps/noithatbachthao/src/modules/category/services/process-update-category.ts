import { CategoryFormData } from '@/modules/category/components/category-form'
import { updateCategory } from '@/modules/category/services/index'
import { getCategoryWithChildrenIdById } from '@/modules/category/services/get-category-with-children-id-by-id'

export const processUpdateCategory = async (categoryId: string, formData: CategoryFormData, mediaFile: File | undefined) => {

	let imageUrl= undefined
	if (mediaFile) {
		const form = new FormData()
		form.append('file', mediaFile)

		const res = await fetch('/api/upload-image', {
			method: 'POST',
			body: form,
		})

		const result = await res.json()
		imageUrl = result.url
	}


	// Cập nhật chính category
	const category = await updateCategory(categoryId, {
		name: formData.name,
		url: formData.url,
		description: formData.description || '',
		image: imageUrl,
	})

	// Lấy danh sách con hiện có trong DB
	const currentCategory = await getCategoryWithChildrenIdById(categoryId)
	const currentChildIds = new Set(currentCategory?.children.map((c:any) => c.id) ?? [])

	const newChildIds = new Set(formData.children ?? [])

	const childrenToAdd = [...newChildIds].filter((id) => !currentChildIds.has(id))
	const childrenToRemove = [...currentChildIds].filter((id: any) => !newChildIds.has(id))

	// Gán parent_id cho những category được thêm vào
	await Promise.all(
		childrenToAdd.map((childId) =>
			updateCategory(childId, { parent_id: categoryId }),
		),
	)

	// Gỡ parent_id cho những category bị xoá khỏi children hoặc không truyền children
	await Promise.all(
		childrenToRemove.map((childId: any) =>
			updateCategory(childId, { parent_id: null }),
		),
	)

	return category
}
