import { supabase } from '@/lib/supabase'
import { parseQueryWithAI } from './ai-service'
import type { QueryAttributes, Recommendation, SearchResult } from './types'

const PRODUCT_TYPES = ['kệ', 'sofa', 'mõ', 'bàn', 'ghế', 'tủ']
const MATERIALS = ['hương đá', 'gỗ xoan', 'xoan đào', 'gỗ sồi', 'sồi']

export async function getQueryAttributes(query: string): Promise<QueryAttributes> {
	const aiResult = await parseQueryWithAI(query)
	if (aiResult) {
		return aiResult
	}

	console.log('[SEARCH] AI failed or skipped, falling back to local parsing')
	return parseQuery(query)
}

export async function searchProducts(query: string, context: QueryAttributes | null = null): Promise<SearchResult> {
	try {
		const attributes = context ?? await getQueryAttributes(query)
		const { productType } = attributes

		console.log(`[SEARCH] Context - Type: ${attributes.productType}, Material: ${attributes.material}, Price: ${JSON.stringify(attributes.priceRange)}, Dims: ${attributes.dimensions.join(', ')}`)

		let dbQuery = supabase
			.from('products')
			.select('id, name, price, description, url, default_image, media, category_id')

		if (productType) {
			dbQuery = dbQuery.ilike('name', `%${productType}%`)
		}

		const { data, error } = await dbQuery.limit(100)
		if (error) throw error

		const rawProducts = data ?? []
		const filtered = applyFilters(rawProducts, attributes)

		let recommendations: Recommendation[] = []
		if (filtered.length === 0 && rawProducts.length > 0) {
			console.log('[SEARCH] No exact matches, generating recommendations...')
			recommendations = generateRecommendations(rawProducts, attributes)
		}

		return {
			products: filtered.slice(0, 8),
			attributes,
			recommendations: recommendations.slice(0, 5),
		}
	} catch (err) {
		console.error('Unexpected error in searchProducts:', err)
		return { products: [], attributes: context ?? parseQuery(query), recommendations: [] }
	}
}

export async function searchProductsForChatbot(query: string): Promise<ProductDataBase[]> {
	const result = await searchProducts(query)
	return result.products
}

export async function getProductById(id: string): Promise<ProductDataBase | null> {
	const { data, error } = await supabase
		.from('products')
		.select('*')
		.eq('id', id)
		.single()

	if (error) return null
	return data
}

function parseQuery(query: string): QueryAttributes {
	const lowerQuery = query.toLowerCase()

	let productType: string | null = null
	for (const type of PRODUCT_TYPES) {
		if (lowerQuery.includes(type)) {
			productType = type
			break
		}
	}

	const dimensionSet = new Set<string>()
	const patternXmY = /(\d+)m(\d+)/g
	let matches = [...lowerQuery.matchAll(patternXmY)]
	matches.forEach(match => dimensionSet.add(`${match[1]}m${match[2]}`))

	const patternDecimalM = /(\d+)[.,](\d+)\s*m/g
	matches = [...lowerQuery.matchAll(patternDecimalM)]
	matches.forEach(match => dimensionSet.add(`${match[1]}.${match[2]}`))

	const patternVietnameseM = /(\d+)\s*mét\s*(\d+)?/g
	matches = [...lowerQuery.matchAll(patternVietnameseM)]
	matches.forEach(match => {
		if (match[2]) {
			dimensionSet.add(`${match[1]}m${match[2]}`)
		} else {
			dimensionSet.add(`${match[1]}m`)
		}
	})

	let material: string | null = null
	for (const candidate of MATERIALS) {
		if (lowerQuery.includes(candidate)) {
			material = candidate
			break
		}
	}

	let priceRange: QueryAttributes['priceRange'] = null
	if (lowerQuery.includes('triệu')) {
		const numbers = lowerQuery.match(/\d+/g)
		if (numbers && numbers.length >= 2) {
			priceRange = { min: Number(numbers[0]) * 1000000, max: Number(numbers[1]) * 1000000 }
		} else if (numbers && numbers.length === 1) {
			if (lowerQuery.includes('dưới') || lowerQuery.includes('tầm')) {
				priceRange = { min: null, max: Number(numbers[0]) * 1000000 }
			} else if (lowerQuery.includes('trên')) {
				priceRange = { min: Number(numbers[0]) * 1000000, max: null }
			}
		}
	}

	return {
		intent: 'search',
		productType,
		dimensions: [...dimensionSet],
		material,
		priceRange,
	}
}

function applyFilters(products: ProductDataBase[], attrs: QueryAttributes): ProductDataBase[] {
	return products.filter(product => {
		const nameDesc = `${product.name} ${product.description ?? ''}`.toLowerCase()

		if (attrs.material) {
			const material = attrs.material.toLowerCase()
			const keywords = material.split(' ').filter(keyword => keyword !== 'gỗ')
			const matchMaterial = keywords.every(keyword => nameDesc.includes(keyword))
			if (!matchMaterial) return false
		}

		if (attrs.priceRange) {
			const rawPrice = typeof product.price === 'number' ? product.price : Number(product.price)
			const price = Number.isFinite(rawPrice) ? rawPrice : 0
			if (attrs.priceRange.min !== null && price < attrs.priceRange.min) return false
			if (attrs.priceRange.max !== null && price > attrs.priceRange.max) return false
		}

		if (attrs.dimensions.length > 0) {
			const matchDim = attrs.dimensions.some(dim => nameDesc.includes(dim.toLowerCase()))
			if (!matchDim) return false
		}

		return true
	})
}

function generateRecommendations(allProducts: ProductDataBase[], attrs: QueryAttributes): Recommendation[] {
	const results: Recommendation[] = []
	const dimensionAdvice = '\n\n💡 Mẹo: Nếu vị trí kê nhà mình hơi chật, bên em có nhận đặt hàng theo kích thước yêu cầu để vừa vặn nhất với phòng khách nhà mình ạ!'

	const relaxedDims = applyFilters(allProducts, { ...attrs, dimensions: [] })
	if (relaxedDims.length > 0) {
		results.push({
			reason: `Dạ hiện tại mẫu ${attrs.dimensions[0] ?? 'kích thước này'} gỗ ${attrs.material ?? ''} em đang hết, nhưng em có sẵn các mẫu gỗ ${attrs.material ?? ''} đẹp không kém với kích thước khác ạ:${dimensionAdvice}`,
			products: relaxedDims.slice(0, 3),
		})
	}

	const relaxedMaterial = applyFilters(allProducts, { ...attrs, material: null })
	if (relaxedMaterial.length > 0) {
		results.push({
			reason: `Dạ mẫu ${attrs.dimensions[0] ?? ''} gỗ ${attrs.material ?? ''} em chưa có sẵn, nhưng cùng tầm giá và kích thước đó em có những chất liệu khác rất sang trọng ạ:`,
			products: relaxedMaterial.slice(0, 3),
		})
	}

	const relaxedPrice = applyFilters(allProducts, { ...attrs, priceRange: null })
	if (relaxedPrice.length > 0) {
		results.push({
			reason: `Kệ ${attrs.material ?? ''} ${attrs.dimensions[0] ?? ''} ở phân khúc giá khác bên em đang sẵn hàng đây ạ. Anh/chị xem qua nhé:`,
			products: relaxedPrice.slice(0, 3),
		})
	}

	return results
}
