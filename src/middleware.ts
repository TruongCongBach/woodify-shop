import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const host = request.headers.get('host')

    // Redirect www to non-www
    if (host?.startsWith('www.')) {
        const newHost = host.replace(/^www\./, '')
        const newUrl = new URL(request.url)
        newUrl.host = newHost
        newUrl.protocol = 'https'

        return NextResponse.redirect(newUrl, {
            status: 301, // Permanent redirect
        })
    }

    return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
