import { NextRequest, NextResponse } from 'next/server'
import { createProductWithMedia } from '@/services/product/create-product-with-media'

export async function POST(request: NextRequest) {
	try {
		const { formData, media } = await request.json()

		const result = await createProductWithMedia(formData, media)

		return NextResponse.json({ success: true, product: result })

	} catch (error) {
		console.error('Error creating product:', error)
		
		return NextResponse.json(
			{ 
				error: error instanceof Error 
					? error.message 
					: 'Đã xảy ra lỗi khi tạo sản phẩm'
			},
			{ status: 500 }
		)
	}
}
