import { NextResponse } from 'next/server';

// Mock data for development
const mockGuestUsers = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    city: 'New York',
    country: 'USA',
    registrationDate: new Date('2024-01-15').toISOString(),
    lastLogin: new Date('2024-08-17').toISOString(),
    status: 'active',
    totalBookings: 5,
    totalSpent: 1250.00,
    preferences: {
      cuisine: ['Italian', 'Mexican'],
      diningStyle: ['Casual Dining'],
      dietaryRestrictions: ['Vegetarian']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-0456',
    city: 'Los Angeles',
    country: 'USA',
    registrationDate: new Date('2024-02-20').toISOString(),
    lastLogin: new Date('2024-08-16').toISOString(),
    status: 'active',
    totalBookings: 3,
    totalSpent: 890.00,
    preferences: {
      cuisine: ['Japanese', 'Thai'],
      diningStyle: ['Fine Dining'],
      dietaryRestrictions: ['Gluten-Free']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    phone: '+1-555-0789',
    city: 'Chicago',
    country: 'USA',
    registrationDate: new Date('2024-03-10').toISOString(),
    lastLogin: new Date('2024-08-15').toISOString(),
    status: 'active',
    totalBookings: 8,
    totalSpent: 2100.00,
    preferences: {
      cuisine: ['American', 'Steakhouse'],
      diningStyle: ['Casual Dining', 'Fine Dining'],
      dietaryRestrictions: []
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@example.com',
    phone: '+1-555-0321',
    city: 'Miami',
    country: 'USA',
    registrationDate: new Date('2024-04-05').toISOString(),
    lastLogin: new Date('2024-08-14').toISOString(),
    status: 'active',
    totalBookings: 2,
    totalSpent: 450.00,
    preferences: {
      cuisine: ['Seafood', 'Mediterranean'],
      diningStyle: ['Casual Dining'],
      dietaryRestrictions: ['Dairy-Free']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    phone: '+1-555-0654',
    city: 'Seattle',
    country: 'USA',
    registrationDate: new Date('2024-05-12').toISOString(),
    lastLogin: new Date('2024-08-13').toISOString(),
    status: 'active',
    totalBookings: 6,
    totalSpent: 1680.00,
    preferences: {
      cuisine: ['Asian Fusion', 'Sushi'],
      diningStyle: ['Fine Dining'],
      dietaryRestrictions: ['Vegan']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    // In a real application, you would fetch from your database
    return NextResponse.json({ result: mockGuestUsers });
  } catch (error) {
    console.error('Error fetching guest users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guest users' },
      { status: 500 }
    );
  }
}
