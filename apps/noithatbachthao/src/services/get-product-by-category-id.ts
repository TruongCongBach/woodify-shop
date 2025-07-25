import { supabase as supabasejs } from '@/lib/supabase'

export const getProductByCategoryId = async (categoryId: string, pagination: {
	page: number
	pageSize: number
}) => {
	const page = pagination.page || 1
	const pageSize = pagination.pageSize || 10
	const from = (page - 1) * pageSize
	const to = from + pageSize - 1
	const { data, error } = await supabasejs
	.from('products')
	.select('*')
	.eq('category_id', categoryId)
	.order('created_at', { ascending: false })
	.range(from, to)

	if (error) {
		console.error('Error fetching products by category ID:', error)
		throw error
	}

	if(!data || data.length === 0) {
		console.warn('No products found for category ID:', categoryId)
		return []
	}
	return data
}
