'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { EnrichedPosition } from '@/hooks/usePosition';
import type { GoalProgress } from '@/lib/goals';
import type { Nudge } from '@/lib/nudges';
import type { DemoPersonaId } from '@/lib/demo';
import { generateNudges, createSnapshot } from '@/lib/nudges';
import { getDemoNudges } from '@/lib/demo-nudges';
import {
  getSnapshot, saveSnapshot,
  getNudgeHistory, saveNudges,
  markNudgeRead as storeMarkNudgeRead,
} from '@/lib/store';

interface UseNudgesResult {
  nudges: Nudge[];
  unreadCount: number;
  markAsRead: (nudgeId: string) => void;
  markAllAsRead: () => void;
}

/** Merge server nudges with local, deduplicating by id */
function mergeNudgeLists(local: Nudge[], server: Nudge[]): Nudge[] {
  const ids = new Set(local.map((n) => n.id));
  const unique = server.filter((n) => !ids.has(n.id));
  return [...local, ...unique].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

export function useNudges(
  wallet: string | null,
  position: EnrichedPosition | null,
  goalProgress: GoalProgress[],
  isDemo: boolean,
  personaId: DemoPersonaId | null,
): UseNudgesResult {
  const [nudges, setNudges] = useState<Nudge[]>([]);
  const registeredRef = useRef<string | null>(null);

  // Auto-register wallet for cron monitoring + fetch server nudges
  useEffect(() => {
    if (isDemo || !wallet) return;
    if (registeredRef.current === wallet) return;
    registeredRef.current = wallet;

    // Register (fire-and-forget)
    fetch('/api/monitor/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet, action: 'add' }),
    }).catch(() => {});

    // Fetch server nudge history and merge
    fetch(`/api/monitor/nudges/${wallet}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((serverNudges: Nudge[]) => {
        if (serverNudges.length === 0) return;
        setNudges((prev) => mergeNudgeLists(prev, serverNudges));
      })
      .catch(() => {});
  }, [isDemo, wallet]);

  // Demo mode: load static demo nudges (adjust state during render)
  const [prevPersonaId, setPrevPersonaId] = useState<DemoPersonaId | null>(null);
  if (isDemo && personaId && personaId !== prevPersonaId) {
    setPrevPersonaId(personaId);
    setNudges(getDemoNudges(personaId));
  } else if ((!isDemo || !personaId) && prevPersonaId) {
    setPrevPersonaId(null);
  }

  // Real mode: compare snapshots and generate nudges
  const lastPositionRef = useRef<string | null>(null);
  useEffect(() => {
    if (isDemo || !wallet || !position) return;

    const ts = position.position.timestamp;
    if (ts === lastPositionRef.current) return;
    lastPositionRef.current = ts;

    const lastSnapshot = getSnapshot(wallet);
    const history = getNudgeHistory(wallet);
    const newNudges = generateNudges(position, lastSnapshot, goalProgress);

    // Merge: new nudges first, then existing history (deduped by type+severity within 1h)
    const oneHourAgo = Date.now() - 3600_000;
    const recentTypes = new Set(
      history
        .filter((n) => new Date(n.timestamp).getTime() > oneHourAgo)
        .map((n) => `${n.type}:${n.severity}`),
    );

    const uniqueNew = newNudges.filter(
      (n) => !recentTypes.has(`${n.type}:${n.severity}`),
    );

    const merged = [...uniqueNew, ...history];

    // Async setState to avoid cascading render warning
    Promise.resolve(merged).then(setNudges);

    // Persist
    if (uniqueNew.length > 0) {
      saveNudges(wallet, merged);
    }
    saveSnapshot(wallet, createSnapshot(position));
  }, [isDemo, wallet, position, goalProgress]);

  const markAsRead = useCallback(
    (nudgeId: string) => {
      setNudges((prev) =>
        prev.map((n) => (n.id === nudgeId ? { ...n, read: true } : n)),
      );
      if (wallet && !isDemo) {
        storeMarkNudgeRead(wallet, nudgeId);
      }
    },
    [wallet, isDemo],
  );

  const markAllAsRead = useCallback(() => {
    setNudges((prev) => prev.map((n) => ({ ...n, read: true })));
    if (wallet && !isDemo) {
      nudges.filter((n) => !n.read).forEach((n) => storeMarkNudgeRead(wallet, n.id));
    }
  }, [wallet, isDemo, nudges]);

  const unreadCount = nudges.filter((n) => !n.read).length;

  return { nudges, unreadCount, markAsRead, markAllAsRead };
}
