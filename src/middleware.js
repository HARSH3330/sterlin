import { NextResponse } from 'next/server';
import { getAuthUser } from './lib/auth';

export async function middleware(request) {
  const user = await getAuthUser();
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!user || user.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect account routes
  if (pathname.startsWith('/account') || pathname.startsWith('/checkout')) {
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/checkout/:path*'],
};
