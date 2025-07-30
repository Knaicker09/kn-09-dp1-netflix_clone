import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './app/lib/session';
import { cookies } from 'next/headers';

// Define protected and public routes
const protectedRoutes = ['/browse'];
const publicRoutes = ['/login', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Get session from cookies
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect to browse if accessing public route with valid session
  if (isPublicRoute && session?.userId && path !== '/') {
    return NextResponse.redirect(new URL('/browse', req.nextUrl));
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};