import { supabase } from "@/lib/supabase"

export async function fetchCategories(): Promise<Category[]> {
	const { data, error } = await supabase
	.from('categories')
	.select('*')
	.order('created_at', { ascending: false })

	if (error) throw error
	return data
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
	const { data, error } = await supabase
	.from('categories')
	.select('*')
	.eq('id', id)
	.single()

	if (error) throw error
	return data
}

export async function createCategory(category: Omit<Category, 'id'>): Promise<Category> {
	const { data, error } = await supabase
	.from('categories')
	.insert(category)
	.select()
	.single()

	if (error) throw error
	return data
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
	return data
}

export async function deleteCategory(id: string): Promise<void> {
	const { error } = await supabase
	.from('categories')
	.delete()
	.eq('id', id)

	if (error) throw error
}

export async function getCategoryTree(): Promise<CategoryTree[]> {
	const { data, error } = await supabase
	.from('categories')
	.select('*')
	.order('created_at', { ascending: false })

	if (error) throw error

	const categoryMap: Record<string, CategoryTree> = {}
	data.forEach((cat) => {
		categoryMap[cat.id] = {
			id: cat.id,
			name: cat.name,
			url: cat.url,
			children: []
		}
	})

	const tree: CategoryTree[] = []
	data.forEach((cat) => {
		if (cat.parent_id) {
			categoryMap[cat.parent_id].children.push(categoryMap[cat.id])
		} else {
			tree.push(categoryMap[cat.id])
		}
	})

	return tree
}
