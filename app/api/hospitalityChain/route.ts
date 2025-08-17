import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real application, you would save to your database
    const newHospitalChain = {
      _id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ result: newHospitalChain });
  } catch (error) {
    console.error('Error creating hospital chain:', error);
    return NextResponse.json(
      { error: 'Failed to create hospital chain' },
      { status: 500 }
    );
  }
}
