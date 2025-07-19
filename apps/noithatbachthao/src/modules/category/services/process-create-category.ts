import { CategoryFormData } from '@/modules/category/components/category-form'
import { createCategory, updateCategory } from '@/modules/category/services/index'

export const processCreateCategory = async (formData: CategoryFormData, mediaFile: File | undefined) => {
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
  const category = await createCategory({
		name: formData.name,
		url: formData.url,
		description: formData.description || '',
		image: imageUrl,
	})
	if(formData.children) {
		await Promise.all(
			formData.children.map((child) => {
				return updateCategory(child,{
					parent_id: category.id,
				})
			}),
		)
	}
	return category
}
