// ── GET: server-side nudge history for a wallet ─────────────────────

import { NextResponse } from 'next/server';
import { getServerNudges } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ wallet: string }> },
) {
  const { wallet } = await params;

  if (!wallet || wallet.length < 32) {
    return NextResponse.json({ error: 'Invalid wallet' }, { status: 400 });
  }

  const nudges = await getServerNudges(wallet);
  return NextResponse.json(nudges);
}
