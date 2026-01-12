import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Get the token from cookies
    const token = request.cookies.get('admin_token')?.value;

    // 2. Define protected routes
    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
    const isLoginRoute = request.nextUrl.pathname.startsWith('/login');

    // 3. Redirect logic

    // If trying to access dashboard WITHOUT token -> Redirect to Login
    if (isDashboardRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If trying to access login WITH token -> Redirect to Dashboard (Optional UX)
    if (isLoginRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};