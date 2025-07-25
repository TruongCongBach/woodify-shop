
/**
 * Transform database product to form data
 */
export function transformCategoryToFormData(category: CategoryDataBase): Category {
	return {
		id: category.id,
		name: category.url,
		image: category.image || '',
		url: category.url,
		description: category.description,
		showInNav: category.show_in_nav,
		parentId: category.parent_id,
	}
}
