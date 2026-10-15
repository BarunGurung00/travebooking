import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  // Placeholder static response until database is linked
  const mockResults = [
    { type: 'trek', title: 'Everest Base Camp Trek', region: 'Khumbu' },
    { type: 'destination', title: 'Pokhara Valley', region: 'Gandaki' },
    { type: 'transport', title: 'Kathmandu to Pokhara Tourist Bus', price: 'NPR 1,200' },
  ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  return NextResponse.json({ results: mockResults });
}