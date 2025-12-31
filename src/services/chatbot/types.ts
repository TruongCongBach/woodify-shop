export type ChatbotIntent = 'search' | 'gallery'

export interface PriceRange {
	min: number | null
	max: number | null
}

export interface QueryAttributes {
	intent: ChatbotIntent
	productType: string | null
	dimensions: string[]
	material: string | null
	priceRange: PriceRange | null
}

export interface Recommendation {
	reason: string
	products: ProductDataBase[]
}

export interface SearchResult {
	products: ProductDataBase[]
	attributes: QueryAttributes
	recommendations: Recommendation[]
}

export interface ChatbotTemplatePayload {
	type: 'template'
	payload: {
		template_type: 'generic'
		elements: unknown[]
		image_aspect_ratio?: 'horizontal' | 'square'
	}
}

export type ChatbotResponse =
	| { type: 'text'; content: string }
	| { type: 'template'; payload: ChatbotTemplatePayload['payload'] }
	| { type: 'combo'; text: string; carousel: ChatbotTemplatePayload }
