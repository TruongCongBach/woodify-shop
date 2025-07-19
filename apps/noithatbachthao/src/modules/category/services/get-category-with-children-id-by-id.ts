import { supabase } from '@/lib/supabase'

export const getCategoryWithChildrenIdById = async (id: string) => {
	// Lấy category cha
	const { data: category, error: categoryError } = await supabase
	.from('categories')
	.select('*')
	.eq('id', id)
	.single()

	if (categoryError) throw categoryError
	if (!category) return undefined

	// Lấy danh sách category con
	const { data: children, error: childrenError } = await supabase
	.from('categories')
	.select('id')
	.eq('parent_id', id)

	if (childrenError) throw childrenError

	return {
		...category,
		children: children ?? [],
	}
}
