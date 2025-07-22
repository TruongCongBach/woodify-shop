import { NextResponse } from 'next/server'
import { getProductsByConditions } from '@/services/getProductsByConditions'

export async function GET() {
	try {
		const products = await getProductsByConditions({

		})
		return NextResponse.json(products)
	} catch (error) {
		console.error('Failed to fetch category tree:', error)
		return NextResponse.json(
			{ message: 'Failed to fetch category tree' },
			{ status: 500 }
		)
	}
}
