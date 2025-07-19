import { supabase } from "@/lib/supabase"

/**
 * Check if product URL already exists
 */
export async function checkProductUrlExists(url: string, excludeId?: string): Promise<boolean> {
	try {

		let query = supabase
		.from('products')
		.select('id')
		.eq('url', url)

		// Exclude current product ID when updating
		if (excludeId) {
			query = query.neq('id', excludeId)
		}

		// Don't use .single() to avoid PGRST116 error
		const { data, error } = await query

		if (error) {
			console.error('Database error checking URL:', error)
			throw error
		}

		// Return true if any records found, false if empty array
		return data && data.length > 0
	} catch (error) {
		console.error('Error checking product URL:', error)
		throw error
	}
}
