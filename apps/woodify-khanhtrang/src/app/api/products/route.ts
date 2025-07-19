// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export const runtime = 'edge'

export async function GET() {
	const greeting =  await get('greeting');
	return NextResponse.json(greeting)
}
