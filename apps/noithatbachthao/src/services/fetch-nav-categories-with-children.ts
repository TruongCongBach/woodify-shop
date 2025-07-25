import { supabase } from '@/lib/supabase/client'

export async function fetchNavCategoriesWithChildren(): Promise<CategoryTree[]> {

	const { data: categories, error } = await supabase
	.from('categories')
	.select('*')
	.eq('show_in_nav', true) // chỉ lấy category show_in_nav = true

	if (error) {
		console.error('[fetchNavCategoriesWithChildren]', error)
		throw error
	}
	if (!categories) return []


	function buildTree(parentId: string | null): CategoryTree[] {
		return (categories || [])
		.filter(cat => cat.parent_id === parentId)
		.map(cat => ({
			...cat,
			children: buildTree(cat.id), // đệ quy tìm con
		}))
	}

	// Bắt đầu từ root (parent_id = null)
	return buildTree(null)
}
