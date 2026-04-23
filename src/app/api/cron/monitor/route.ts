// ── Cron endpoint: check all watched wallets every 6h ───────────────

import { NextResponse } from 'next/server';
import { getFullPosition } from '@/lib/kamino';
import { enrichPosition } from '@/lib/enrich';
import { generateNudges, createSnapshot } from '@/lib/nudges';
import {
  getWatchedWallets,
  getServerSnapshot,
  saveServerSnapshot,
  appendServerNudges,
} from '@/lib/kv';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Verify cron secret (Vercel auto-sends Authorization header)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const wallets = await getWatchedWallets();
  let checked = 0;
  let nudgesGenerated = 0;

  for (const wallet of wallets) {
    try {
      const raw = await getFullPosition(wallet);
      const enriched = enrichPosition(raw);
      const lastSnapshot = await getServerSnapshot(wallet);

      // Skip welcome + goals — those are client-only
      const nudges = generateNudges(enriched, lastSnapshot, []);
      const serverNudges = nudges.filter(
        (n) => n.type !== 'welcome' && n.type !== 'goal-milestone',
      );

      if (serverNudges.length > 0) {
        await appendServerNudges(wallet, serverNudges);
        nudgesGenerated += serverNudges.length;
      }

      await saveServerSnapshot(wallet, createSnapshot(enriched));
      checked++;
    } catch (err) {
      console.error(`Cron: failed for ${wallet}:`, err);
    }
  }

  return NextResponse.json({ checked, nudgesGenerated });
}
