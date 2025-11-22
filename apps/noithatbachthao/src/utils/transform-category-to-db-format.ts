/**
 * Transform form data to database format
 */
export function transformCategoryToDbFormat(formData: Omit<Category, 'id'>): Omit<CategoryDataBase, 'id'> {
	return {
		name: formData.name,
		image: formData.image || '',
		url: formData.url,
		description: formData.description,
		show_in_nav: !!formData.showInNav,
		parent_id: formData.parentId,
	}
}
