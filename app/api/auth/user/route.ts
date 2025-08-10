import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        firstName: session.firstName,
        lastName: session.lastName,
        email: session.email,
        contactNo: session.contactNo,
        birthDate: session.birthDate,
        addressLine1: session.addressLine1,
        addressLine2: session.addressLine2,
        city: session.city,
        state: session.state,
        anniversaryDate: session.anniversaryDate,
      }
    });
  } catch (error) {
    console.error('Error fetching user session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
