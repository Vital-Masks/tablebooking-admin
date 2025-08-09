import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check for authentication cookie
    const authCookie = request.cookies.get('auth-token');
    const isLoggedInCookie = request.cookies.get('isLoggedIn');
    
    if (authCookie && isLoggedInCookie?.value === 'true') {
      // User is authenticated
      return NextResponse.json({ 
        isAuthenticated: true, 
        user: JSON.parse(authCookie.value) 
      });
    }
    
    // User is not authenticated
    return NextResponse.json({ isAuthenticated: false });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
