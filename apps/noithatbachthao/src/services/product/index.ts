// src/modules/product/services/productService.ts

import { supabase } from '@/lib/supabase'
import { transformProductToFormData } from '@/utils/transform-product-to-form-data'

export async function fetchProducts(): Promise<Product[]> {
	const { data, error } = await supabase.from('products').select('*').order('updated_at', { ascending: true });
	if (error) throw error
	return data?.map(value => {
		return transformProductToFormData(value)
	})
}

export async function deleteProduct(id: string) {
	const { error } = await supabase.from('products').delete().eq('id', id)
	if (error) throw error
}

export async function getProductById(id: string): Promise<Product | undefined> {
	// 1. Get product
	const { data: product, error: prodError } = await supabase
	.from('products')
	.select('*')
	.eq('id', id)
	.single()
	if (prodError) throw prodError

	// 2. Get attributes
	const { data: attributes, error: attrError } = await supabase
	.from('product_attributes')
	.select('*')
	.eq('product_id', id)
	if (attrError) throw attrError

	// 3. Combine
	return transformProductToFormData({
		...product,
		attributes: attributes || [],
	})
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
	const { data, error } = await supabase.from('products').insert(product).select().single()

	if (!Array.isArray(product.attributes)) {
		return transformProductToFormData(data)
	}
	for (const attribute of product.attributes) {
		if (!attribute.key || !attribute.value) {
			throw new Error('Each attribute must have a name and value')
		}
	}
	let attributesData: any[] = []
	// Insert each attribute into the product_attributes table
	for (const attribute of product.attributes) {
		const { data, error } = await supabase.from('product_attributes').insert(attribute).select().single()
		if (error) throw error
		console.log('Attribute created:', data)
		attributesData = [...attributesData, data]
	}

	if (error) throw error
	return transformProductToFormData({
		...data,
		attributes: attributesData,
	})
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
	// 1. Update product
	const { attributes, ...otherField} = updates
	const { data: updatedProduct, error: productError } = await supabase
	.from('products')
	.update({
		...otherField,
		updated_at: new Date().toISOString()
	})
	.eq('id', id)
	.select()
	.single()
	if (productError) throw productError

	// 2. Delete old attributes
	const { error: delError } = await supabase
	.from('product_attributes')
	.delete()
	.eq('product_id', id)
	if (delError) throw delError

	// 3. Insert new attributes
	if (attributes && attributes.length > 0) {
		const newAttrs = attributes.map(attr => ({
			...attr,
			product_id: id,
			category_id: updatedProduct.category_id,
		}))
		const { error: attrError } = await supabase
		.from('product_attributes')
		.insert(newAttrs)
		if (attrError) throw attrError
	}
	// 4. Return updated product (attributes can be fetched separately)
	return transformProductToFormData(updatedProduct)
}

export async function searchProducts(query: string): Promise<Product[]> {
	const { data, error } = await supabase
		.from('products')
		.select('*')
		.ilike('name', `%${query}%`)
		.or(`description.ilike.%${query}%`)

	if (error) throw error
	return data?.map(value => {
		return transformProductToFormData(value)
	})
}

