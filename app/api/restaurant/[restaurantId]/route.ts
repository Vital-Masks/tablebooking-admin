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

export async function GET(
  request: NextRequest,
  { params }: { params: { restaurantId: string } }
) {
  try {
    const restaurant = mockRestaurants.find(r => r.id === params.restaurantId);
    
    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ result: restaurant });
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurant' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { restaurantId: string } }
) {
  try {
    const body = await request.json();
    
    // In a real application, you would update in your database
    const updatedRestaurant = {
      id: params.restaurantId,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ result: updatedRestaurant });
  } catch (error) {
    console.error('Error updating restaurant:', error);
    return NextResponse.json(
      { error: 'Failed to update restaurant' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { restaurantId: string } }
) {
  try {
    // In a real application, you would delete from your database
    return NextResponse.json({ result: { success: true } });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    return NextResponse.json(
      { error: 'Failed to delete restaurant' },
      { status: 500 }
    );
  }
}
