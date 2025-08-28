import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // جلوگیری از redirect loop
  const url = request.nextUrl.clone()
  
  // اگر درخواست برای root domain است، اجازه عبور دهید
  if (url.pathname === '/') {
    return NextResponse.next()
  }
  
  // برای سایر مسیرها هم اجازه عبور دهید
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
