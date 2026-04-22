import { NextResponse } from 'next/server';
import { generateDesignTokens } from '@/lib/design-tokens';

export async function GET() {
  const tokens = generateDesignTokens();
  return NextResponse.json(tokens, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
