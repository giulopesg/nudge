// ── POST: add/remove wallet from cron watch list ────────────────────

import { NextResponse } from 'next/server';
import { addWatchedWallet, removeWatchedWallet } from '@/lib/kv';

export async function POST(request: Request) {
  const body = await request.json();
  const { wallet, action } = body as { wallet?: string; action?: string };

  if (!wallet || wallet.length < 32) {
    return NextResponse.json({ error: 'Invalid wallet' }, { status: 400 });
  }

  if (action === 'remove') {
    await removeWatchedWallet(wallet);
    return NextResponse.json({ ok: true, action: 'removed' });
  }

  await addWatchedWallet(wallet);
  return NextResponse.json({ ok: true, action: 'added' });
}
