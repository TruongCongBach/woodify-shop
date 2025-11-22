import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/',
  '/product',
  '/category',
  '/ve-chung-toi',
  '/lien-he',
  '/chinh-sach-bao-hanh',
  '/chinh-sach-van-chuyen',
  '/about-us',
  '/login'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip for bots (Googlebot, Bingbot, etc.)
  const userAgent = request.headers.get('user-agent') || ''
  const isBot = /Googlebot|Bingbot|YandexBot|Baiduspider/i.test(userAgent)
  if (isBot) {
    // Force canonical domain for bots
    const canonicalHost = 'noithatbachthao.com' // non-www
    const host = request.headers.get('host')
    if (host && host !== canonicalHost && host.includes(canonicalHost)) {
      const url = request.url.replace(`https://${host}`, `https://${canonicalHost}`)
      return NextResponse.redirect(new URL(url, request.url))
    }
    return NextResponse.next()
  }

  // Auth check for protected paths (dashboard)
  if (pathname.startsWith('/dashboard')) {
    // Add your Supabase/NextAuth session check here
    // For now, assume public or implement createMiddlewareClient
    // Skip for simplicity since main issue is bots
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}