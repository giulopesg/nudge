// ── Vercel KV (Upstash Redis) client for server-side monitoring ──────

import { Redis } from '@upstash/redis';
import type { Nudge, PositionSnapshot } from '@/lib/nudges';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// ── Key helpers ─────────────────────────────────────────────────────

const WALLETS_KEY = 'monitor:wallets';
const snapshotKey = (w: string) => `monitor:snapshot:${w}`;
const nudgesKey = (w: string) => `monitor:nudges:${w}`;

const MAX_NUDGES = 50;
const NUDGE_TTL_SECONDS = 30 * 24 * 60 * 60; // 30 days

// ── Watched wallets ─────────────────────────────────────────────────

export async function addWatchedWallet(wallet: string): Promise<void> {
  await redis.sadd(WALLETS_KEY, wallet);
}

export async function removeWatchedWallet(wallet: string): Promise<void> {
  await redis.srem(WALLETS_KEY, wallet);
}

export async function getWatchedWallets(): Promise<string[]> {
  return (await redis.smembers(WALLETS_KEY)) as string[];
}

// ── Snapshots ───────────────────────────────────────────────────────

export async function getServerSnapshot(
  wallet: string,
): Promise<PositionSnapshot | null> {
  return redis.get<PositionSnapshot>(snapshotKey(wallet));
}

export async function saveServerSnapshot(
  wallet: string,
  snapshot: PositionSnapshot,
): Promise<void> {
  await redis.set(snapshotKey(wallet), snapshot);
}

// ── Nudge history ───────────────────────────────────────────────────

export async function getServerNudges(wallet: string): Promise<Nudge[]> {
  return (await redis.get<Nudge[]>(nudgesKey(wallet))) ?? [];
}

export async function appendServerNudges(
  wallet: string,
  newNudges: Nudge[],
): Promise<void> {
  if (newNudges.length === 0) return;
  const existing = await getServerNudges(wallet);
  const merged = [...newNudges, ...existing].slice(0, MAX_NUDGES);
  await redis.set(nudgesKey(wallet), merged, { ex: NUDGE_TTL_SECONDS });
}
