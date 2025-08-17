import { NextRequest, NextResponse } from 'next/server';

// Mock data for development
const mockRestaurants = [
  {
    id: '1',
    name: 'Sample Restaurant 1',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '+1-555-0123',
    email: 'restaurant1@example.com',
    cuisine: 'Italian',
    rating: 4.5,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Sample Restaurant 2',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210',
    phone: '+1-555-0456',
    email: 'restaurant2@example.com',
    cuisine: 'Mexican',
    rating: 4.2,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    // In a real application, you would fetch from your database
    return NextResponse.json({ result: mockRestaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real application, you would save to your database
    const newRestaurant = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ result: newRestaurant });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json(
      { error: 'Failed to create restaurant' },
      { status: 500 }
    );
  }
}
