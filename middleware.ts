import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth((req) => {
    const { nextUrl } = req;
    //   const isLoggedIn = !!req.auth;
    const isLoggedIn = true;

    // Define public routes that don't require authentication
    const publicRoutes = ['/login', '/OTP', '/changePassword'];
    const isPublicRoute = publicRoutes.some(route =>
        nextUrl.pathname.startsWith(route)
    );

    // If user is not logged in and trying to access a protected route
    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', nextUrl));
    }

    // If user is logged in and trying to access login page, redirect to dashboard
    if (isLoggedIn && isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }

    // If user is logged in and accessing the root path, redirect to dashboard
    if (isLoggedIn && nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }

    return NextResponse.next();
});

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};