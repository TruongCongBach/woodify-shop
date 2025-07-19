// src/modules/product/services/productService.ts

import { supabase } from '@/lib/supabase'

export async function fetchProducts(): Promise<Product[]> {
	const { data, error } = await supabase.from('products').select('*')
	if (error) throw error
	return data?.map(value => {
		return {
			...value,
			defaultImage: value.default_image || '',
		}
	})
}

export async function deleteProduct(id: string) {
	const { error } = await supabase.from('products').delete().eq('id', id)
	if (error) throw error
}

export async function getProductById(id: string): Promise<Product | undefined> {
	const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
	if (error) throw error
	return {
		...data,
		defaultImage: data.default_image || '',
		categoryId: data.category_id || '',
		price: `${data.price}` || `0`,
	}
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
	const { data, error } = await supabase.from('products').insert(product).select().single()
	if (error) throw error
	return data
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
	const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single()
	if (error) throw error
	return data
}

export async function searchProducts(query: string): Promise<Product[]> {
	const { data, error } = await supabase
		.from('products')
		.select('*')
		.ilike('name', `%${query}%`)
		.or(`description.ilike.%${query}%`)

	if (error) throw error
	return data
}

