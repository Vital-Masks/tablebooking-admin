import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getUserById } from '@/lib/actions/user.action';

export async function GET(request: NextRequest) {
  try {
    const session: any = await getSession();
    console.log(">>", session);
    const user = await getUserById(session?.userId);
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        userId: session.userId,
        restaurantId: session.restaurantId,
        firstName: session.firstName,
        lastName: session.lastName,
        email: session.email,
        gender: session.gender,
        phoneNumber: session.phoneNumber,
        profilePic: session.profilePic,
        userType: session.userType,
        subscription: session.subscription,
      }
    });
  } catch (error) {
    console.error('Error fetching user session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
