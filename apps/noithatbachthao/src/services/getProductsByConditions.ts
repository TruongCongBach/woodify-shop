import { supabase } from '@/lib/supabase'
import { transformProductToFormData } from '@/utils/transformProductToFormData'

interface Conditions {
	categoryId?: string
	attributes?: ProductAttribute[]
	priceRange?: string
	page?: number
	pageSize?: number
}

export const getProductsByConditions = async ({
	categoryId,
	attributes = [],
	priceRange,
	page = 1,
	pageSize = 12,
}: Conditions) => {
	console.log('Service called with:', {
		categoryId,
		attributes,
		priceRange,
		page,
		pageSize
	})

	const from = (page - 1) * pageSize
	const to = from + pageSize - 1

	// Nếu không có attribute filters, query đơn giản
	if (attributes.length === 0) {
		let query = supabase
		.from('products')
		.select('*', { count: 'exact' })
		.range(from, to)
		.order('created_at', { ascending: false })

		if (categoryId) {
			query = query.eq('category_id', categoryId)
		}

		if (priceRange) {
			query = applyPriceFilter(query, priceRange)
		}

		const { data, error, count } = await query

		if (error) {
			console.error('Supabase error (simple query):', error)
			throw error
		}

		return {
			data: data?.map(transformProductToFormData) ?? [],
			total: count ?? 0,
			page,
			pageSize,
		}
	}

	// Group attributes by key
	const attributeGroups = attributes.reduce((acc, attr) => {
		if (!acc[attr.key]) {
			acc[attr.key] = []
		}
		acc[attr.key].push(attr.value)
		return acc
	}, {} as Record<string, any[]>)

	console.log('Attribute groups:', attributeGroups)

	// Tìm product IDs thỏa mãn điều kiện
	let productIds: string[] = []
	const attributeKeys = Object.keys(attributeGroups)

	for (let i = 0; i < attributeKeys.length; i++) {
		const key = attributeKeys[i]
		const values = attributeGroups[key]

		console.log(`Filtering by key "${key}" with values:`, values)

		// Query với OR cho các values của cùng key
		let attrQuery = supabase
		.from('product_attributes')
		.select('product_id')
		.eq('key', key)
		.in('value', values.map(String)) // OR condition cho các values

		if (categoryId) {
			attrQuery = attrQuery.eq('category_id', categoryId)
		}

		const { data: attrData, error: attrError } = await attrQuery

		if (attrError) {
			console.error(`Error filtering attribute ${key}:`, attrError)
			throw attrError
		}

		const currentProductIds = attrData?.map(item => item.product_id) ?? []
		console.log(`Products matching ${key} in [${values.join(', ')}]:`, currentProductIds.length)

		if (i === 0) {
			productIds = currentProductIds
		} else {
			// AND giữa các keys khác nhau
			productIds = productIds.filter(id => currentProductIds.includes(id))
		}

		console.log(`Remaining products after filtering key "${key}":`, productIds.length)

		// Nếu không còn product nào thỏa mãn, return empty
		if (productIds.length === 0) {
			return {
				data: [],
				total: 0,
				page,
				pageSize,
			}
		}
	}

	console.log('Final product IDs:', productIds)

	// Lấy products theo IDs đã filter
	if (productIds.length === 0) {
		return {
			data: [],
			total: 0,
			page,
			pageSize,
		}
	}

	// Count total trước khi phân trang
	let countQuery = supabase
	.from('products')
	.select('id', { count: 'exact' })
	.in('id', productIds)

	if (categoryId) {
		countQuery = countQuery.eq('category_id', categoryId)
	}

	if (priceRange) {
		countQuery = applyPriceFilter(countQuery, priceRange)
	}

	const { count } = await countQuery

	// Lấy dữ liệu với phân trang
	let finalQuery = supabase
	.from('products')
	.select('*')
	.in('id', productIds)
	.range(from, to)
	.order('created_at', { ascending: false })

	if (categoryId) {
		finalQuery = finalQuery.eq('category_id', categoryId)
	}

	if (priceRange) {
		finalQuery = applyPriceFilter(finalQuery, priceRange)
	}

	const { data, error } = await finalQuery

	if (error) {
		console.error('Supabase error (final query):', error)
		throw error
	}

	console.log('Final query result:', {
		dataLength: data?.length,
		total: count,
		from,
		to
	})

	const result = {
		data: data?.map(transformProductToFormData) ?? [],
		total: count ?? 0,
		page,
		pageSize,
	}

	console.log('Service returning:', result)
	return result
}

// Helper function để apply price filter
function applyPriceFilter(query: any, priceRange: string) {
	const [min, max] = priceRange.split('-').map(Number)

	if (!isNaN(min) && !isNaN(max)) {
		// Range: "100-500"
		return query.gte('price', min).lte('price', max)
	} else if (priceRange.endsWith('+')) {
		// Min only: "500+"
		const minPrice = parseInt(priceRange.replace('+', ''))
		return query.gte('price', minPrice)
	} else if (priceRange.startsWith('-')) {
		// Max only: "-100"
		const maxPrice = parseInt(priceRange.replace('-', ''))
		return query.lte('price', maxPrice)
	}

	return query
}
