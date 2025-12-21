import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import config from '@/config'

export async function POST(request: NextRequest) {
	// Xác thực request (quan trọng để bảo mật)
	const secret = request.nextUrl.searchParams.get('secret')

	if (secret !== config.revalidateSecret) {
		return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
	}

	try {
		// Revalidate trang home
		revalidatePath('/')

		// Hoặc revalidate tất cả pages có tag 'products'
		// revalidateTag('products')

		return NextResponse.json({
			message: 'Homepage revalidated successfully',
			revalidated: true,
			now: Date.now()
		})
	} catch (error: any) {
		return NextResponse.json({
			message: 'Error revalidating',
			error: error.message
		}, { status: 500 })
	}
}

// Sử dụng: POST /api/revalidate?secret=your-secret-token
