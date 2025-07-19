// app/api/upload-image/route.ts
import { uploadImageToCloudinary } from '@/modules/cloudinary/upload'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs' // bắt buộc cần nodejs để dùng stream

export async function POST(req: NextRequest) {
	const formData = await req.formData()
	const file = formData.get('file') as File

	if (!file) {
		return NextResponse.json({ error: 'No file provided' }, { status: 400 })
	}

	const arrayBuffer = await file.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	try {
		const url = await uploadImageToCloudinary(buffer, 'categories')
		return NextResponse.json({ url })
	} catch (err) {
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
	}
}
