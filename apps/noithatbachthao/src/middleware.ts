// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List các route cần bảo vệ
const protectedRoutes = ['/dashboard']

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const isProtected = protectedRoutes.some((route) =>
		pathname.startsWith(route),
	)

	if (!isProtected) return NextResponse.next()

	const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

	if (!token || token.role !== 'admin') {
		// Nếu chưa đăng nhập, chuyển hướng đến trang signin
		const signInUrl = new URL('/signin', request.url)
		signInUrl.searchParams.set('callbackUrl', pathname) // để redirect lại sau khi login
		return NextResponse.redirect(signInUrl)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*'],
}
