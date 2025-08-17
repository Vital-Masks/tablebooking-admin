import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real application, you would save to your database
    const newGuestUser = {
      _id: Date.now().toString(),
      ...body,
      registrationDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      status: 'active',
      totalBookings: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ 
      status: 'Successfully created guest user',
      result: newGuestUser 
    });
  } catch (error) {
    console.error('Error creating guest user:', error);
    return NextResponse.json(
      { error: 'Failed to create guest user' },
      { status: 500 }
    );
  }
}
