import { NextRequest, NextResponse } from 'next/server'
import { getProductsByConditions } from '@/services/product/get-products-by-conditions'
import { searchProductsForChatbot } from '@/services/chatbot/product-service'

export async function GET(request: NextRequest) {
	try {
		const type = request.nextUrl.searchParams.get('type')

		if (type === 'chatbot-search') {
			const query = request.nextUrl.searchParams.get('query') ?? ''
			const products = await searchProductsForChatbot(query)
			return NextResponse.json(products)
		}

		const products = await getProductsByConditions({})
		return NextResponse.json(products)
	} catch (error) {
		console.error('Failed to fetch category tree:', error)
		return NextResponse.json(
			{ message: 'Failed to fetch category tree' },
			{ status: 500 }
		)
	}
}
