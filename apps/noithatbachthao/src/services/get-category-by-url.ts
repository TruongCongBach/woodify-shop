import { supabase as supabasejs } from '@/lib/supabase'

export const getCategoryByUrl = async (url:string) => {
	const { data, error } = await supabasejs
		.from('categories')
		.select('*')
		.eq('url', url) // Replace with the actual URL you want to query
		.single()

	if (error) {
		console.error('Error fetching category by URL:', error)
		throw error
	}

	return data
}
