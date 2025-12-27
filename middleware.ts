import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * URL Normalization Middleware
 * 
 * Policy: NO trailing slash (except root)
 * - Redirects /path/ to /path (308 permanent)
 * - Prevents loops by checking already-normalized URLs
 * - Ignores static assets, API routes, and Next.js internals
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip normalization for:
  // - Static files (has extension)
  // - API routes
  // - Next.js internals
  // - Files in public folder (images, etc.)
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/_static/') ||
    pathname.includes('.') && !pathname.endsWith('/') // Has extension (e.g., .jpg, .png, .json)
  ) {
    return NextResponse.next()
  }

  // Root path: allow both / and keep as-is
  if (pathname === '/') {
    return NextResponse.next()
  }

  // Remove trailing slash (except root)
  if (pathname.endsWith('/')) {
    const normalizedPathname = pathname.slice(0, -1)
    const url = request.nextUrl.clone()
    url.pathname = normalizedPathname
    
    // Preserve query string
    url.search = request.nextUrl.search
    
    return NextResponse.redirect(url, 308) // Permanent redirect
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
}




















