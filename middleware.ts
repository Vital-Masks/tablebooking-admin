import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { nextUrl } = request;
    
    // Check for authentication cookies using a more compatible approach
    let isLoggedIn = false;
    
    try {
        const authCookie = request.cookies.get('auth-token');
        const isLoggedInCookie = request.cookies.get('isLoggedIn');
        
        // Determine if user is logged in based on cookies
        isLoggedIn = !!(authCookie?.value && isLoggedInCookie?.value === 'true');
    } catch (error) {
        // If there's an error accessing cookies, assume user is not logged in
        isLoggedIn = false;
    }

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
}

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