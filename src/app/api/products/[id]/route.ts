import { NextRequest, NextResponse } from 'next/server'
import { updateProductWithMedia } from '@/services/product/update-product-with-media'

export async function PATCH(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { formData, media, existingProduct } = await request.json()
		const { id } = await context.params

		const result = await updateProductWithMedia(id, formData, media, existingProduct)

		return NextResponse.json({ success: true, product: result })

	} catch (error) {
		console.error('Error updating product:', error)
		
		return NextResponse.json(
			{ 
				error: error instanceof Error 
					? error.message 
					: 'Đã xảy ra lỗi khi cập nhật sản phẩm'
			},
			{ status: 500 }
		)
	}
}
