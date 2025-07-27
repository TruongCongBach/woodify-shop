import { NextResponse } from 'next/server'
import { getCategoryTree } from '@/services/category'

export async function GET() {
	try {
		const categoryTree = await getCategoryTree()
		return NextResponse.json(categoryTree)
	} catch (error) {
		console.error('Failed to fetch category tree:', error)
		return NextResponse.json(
			{ message: 'Failed to fetch category tree' },
			{ status: 500 }
		)
	}
}
