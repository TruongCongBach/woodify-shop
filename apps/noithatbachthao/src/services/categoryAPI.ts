import { supabase } from '@/lib/supabase/client'
import { supabase as supabasejs } from '@/lib/supabase'
import { transformCategoryToFormData } from '@/utils/transformCategoryToFormData'

export async function fetchCategories(): Promise<Category[]> {
	const { data, error } = await supabase
	.from('categories')
	.select('*')
	.order('created_at', { ascending: false })

	if (error) throw error
	return data?.map((item) => {
		return transformCategoryToFormData(item)
	})
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
	const { data, error } = await supabase
	.from('categories')
	.select('*')
	.eq('id', id)
	.single()

	if (error) throw error
	return transformCategoryToFormData(data)
}

export async function createCategory(category: Omit<Category, 'id'>): Promise<Category> {
	const { data, error } = await supabase
	.from('categories')
	.insert(category)
	.select()
	.single()

	if (error) throw error
	return transformCategoryToFormData(data)
}

export async function updateCategory(id: string, updates: {
	name?: string;
	url?: string;
	parent_id?: string | null;
	description?: string;
	image?: string | null;
}): Promise<Category> {
	const { data, error } = await supabase
	.from('categories')
	.update(updates)
	.eq('id', id)
	.select()
	.single()

	if (error) throw error
	return transformCategoryToFormData(data)
}

export async function deleteCategory(id: string): Promise<void> {
	const { error } = await supabase
	.from('categories')
	.delete()
	.eq('id', id)

	if (error) throw error
}

export async function getCategoryTree(): Promise<CategoryTree[]> {
	const { data, error } = await supabasejs
	.from('categories')
	.select('*')
	.order('created_at', { ascending: false })

	if (error) throw error
	const dataTransformed = data?.map((item) => {
		return transformCategoryToFormData(item)
	})
	const categoryMap: Record<string, CategoryTree> = {}
	dataTransformed.forEach((cat: any) => {
		categoryMap[cat.id] = {
			id: cat.id,
			name: cat.name,
			url: cat.url,
			showInNav: cat.showInNav,
			children: [],
		}
	})

	const tree: CategoryTree[] = []
	dataTransformed.forEach((cat) => {
		const parent = categoryMap[cat.parentId ?? '']
		const current = categoryMap[cat.id]

		if (cat.parentId && parent && current && parent.children) {
			parent.children.push(current)
		} else {
			tree.push(current)
		}
	})

	return tree
}
