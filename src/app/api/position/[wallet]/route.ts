import { NextResponse } from 'next/server';
import { getFullPosition } from '@/lib/kamino';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ wallet: string }> },
) {
  const { wallet } = await params;

  if (!wallet || wallet.length < 32) {
    return NextResponse.json(
      { error: 'Invalid wallet address' },
      { status: 400 },
    );
  }

  try {
    const data = await getFullPosition(wallet);
    return NextResponse.json(data);
  } catch (err) {
    console.error('Position API error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch position' },
      { status: 500 },
    );
  }
}
