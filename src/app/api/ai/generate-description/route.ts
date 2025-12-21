import { NextRequest, NextResponse } from 'next/server'
import { generateProductDescriptionServer } from '@/services/ai/generate-product-description-server'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { productName, categoryName, attributes } = body

		if (!productName) {
			return NextResponse.json(
				{ error: 'Product name is required' },
				{ status: 400 }
			)
		}

		const result = await generateProductDescriptionServer({
			productName,
			categoryName,
			attributes
		})

		return NextResponse.json(result)

	} catch (error) {
		console.error('Error in AI description API:', error)
		
		return NextResponse.json(
			{ 
				error: error instanceof Error 
					? error.message 
					: 'Đã xảy ra lỗi khi tạo mô tả sản phẩm'
			},
			{ status: 500 }
		)
	}
}
