import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Log incoming requests to API
  if (pathname.startsWith('/api/')) {
    console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`);
  }

  // Protect OTP page - require auth token
  if (pathname.startsWith('/otp')) {
    const token = request.cookies.get('authToken')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/otp/:path*',
  ],
};
