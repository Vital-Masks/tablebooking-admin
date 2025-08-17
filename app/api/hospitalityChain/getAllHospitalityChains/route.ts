import { NextResponse } from 'next/server';

// Mock data for development
const mockHospitalChains = [
  {
    _id: '1',
    chainName: 'Cinnamon Hotels & Resorts',
    description: 'Luxury hotel chain in Sri Lanka',
    contactNo: '+94-11-249-1000',
    email: 'info@cinnamonhotels.com',
    website: 'https://www.cinnamonhotels.com',
    address: '117, Sir Chittampalam A. Gardiner Mawatha, Colombo 02, Sri Lanka',
    city: 'Colombo',
    country: 'Sri Lanka',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    chainName: 'Jetwing Hotels',
    description: 'Premier hospitality chain in Sri Lanka',
    contactNo: '+94-11-470-4700',
    email: 'info@jetwinghotels.com',
    website: 'https://www.jetwinghotels.com',
    address: 'Jetwing House, 117, Sir Chittampalam A. Gardiner Mawatha, Colombo 02, Sri Lanka',
    city: 'Colombo',
    country: 'Sri Lanka',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    chainName: 'Mövenpick Hotels & Resorts',
    description: 'International hotel chain',
    contactNo: '+41-44-828-4000',
    email: 'info@moevenpick-hotels.com',
    website: 'https://www.moevenpick-hotels.com',
    address: 'Mövenpick Hotel, Colombo, Sri Lanka',
    city: 'Colombo',
    country: 'Sri Lanka',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    // In a real application, you would fetch from your database
    return NextResponse.json({ result: mockHospitalChains });
  } catch (error) {
    console.error('Error fetching hospital chains:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hospital chains' },
      { status: 500 }
    );
  }
}
