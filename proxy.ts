import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import appConfig from '@/config'

const PROTECTED_ROUTES = ['/dashboard']

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	const userAgent = request.headers.get('user-agent') || ''
	const isBot = /Googlebot|Bingbot|YandexBot|Baiduspider/i.test(userAgent)

	if (isBot) {
		const canonicalHost = 'noithatbachthao.com'
		const host = request.headers.get('host')
		if (host && host !== canonicalHost && host.includes(canonicalHost)) {
			const url = request.url.replace(
				`https://${host}`,
				`https://${canonicalHost}`,
			)
			return NextResponse.redirect(new URL(url, request.url))
		}
		return NextResponse.next()
	}

	const isProtected = PROTECTED_ROUTES.some((route) =>
		pathname.startsWith(route),
	)

	if (!isProtected) return NextResponse.next()

	const token = await getToken({
		req: request,
		secret: appConfig.nextAuth.secret,
	})

	if (!token || token.role !== 'admin') {
		const signInUrl = new URL('/login', request.url)
		signInUrl.searchParams.set('callbackUrl', pathname)
		return NextResponse.redirect(signInUrl)
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}
