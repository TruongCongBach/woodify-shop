import type { QueryAttributes } from './types'

interface ChatbotSession {
	lastAttributes: QueryAttributes
	lastProducts: ProductDataBase[]
	lastInteraction: number
}

const sessions = new Map<string, ChatbotSession>()

export function getSession(userId: string): ChatbotSession {
	if (!sessions.has(userId)) {
		sessions.set(userId, {
			lastAttributes: {
				intent: 'search',
				productType: null,
				dimensions: [],
				material: null,
				priceRange: { min: null, max: null },
			},
			lastProducts: [],
			lastInteraction: Date.now(),
		})
	}

	return sessions.get(userId)!
}

export function updateAttributes(userId: string, newAttrs: Partial<QueryAttributes>): QueryAttributes {
	const session = getSession(userId)

	if (newAttrs.intent) session.lastAttributes.intent = newAttrs.intent
	if (newAttrs.productType) session.lastAttributes.productType = newAttrs.productType
	if (newAttrs.material) session.lastAttributes.material = newAttrs.material

	if (newAttrs.dimensions && newAttrs.dimensions.length > 0) {
		session.lastAttributes.dimensions = newAttrs.dimensions
	}

	if (newAttrs.priceRange) {
		if (newAttrs.priceRange.min !== undefined) session.lastAttributes.priceRange.min = newAttrs.priceRange.min
		if (newAttrs.priceRange.max !== undefined) session.lastAttributes.priceRange.max = newAttrs.priceRange.max
	}

	session.lastInteraction = Date.now()
	return session.lastAttributes
}

export function clearSession(userId: string) {
	sessions.delete(userId)
}
