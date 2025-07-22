import { CategoryFormData } from '@/components/category-form'
import { createCategory, updateCategory } from '@/services/categoryAPI'
import { transformCategoryToDbFormat } from '@/utils/transformCategoryToDbFormat'

export const processCreateCategory = async (formData: CategoryFormData, mediaFile: File | undefined) => {
	let imageUrl= undefined
	if (mediaFile) {
		const form = new FormData()
		form.append('file', mediaFile)
		form.append('folder', 'categories')

		const res = await fetch('/api/upload-image', {
			method: 'POST',
			body: form,
		})

		const result = await res.json()
		imageUrl = result.url
	}
  const category = await createCategory(transformCategoryToDbFormat({
		...formData,
		image: imageUrl,
	}))
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
