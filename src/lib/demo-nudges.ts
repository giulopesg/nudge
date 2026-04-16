// ── Pre-built demo nudges per persona ───────────────────────────────

import type { Nudge } from './nudges';
import type { DemoPersonaId } from './demo';

// Timestamps relative to "now" for realistic feel
const hoursAgo = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();
const daysAgo = (d: number) => new Date(Date.now() - d * 86400_000).toISOString();

// ── Marina — gentle persona, no Kamino ─────────────────────────────

const MARINA_NUDGES: Nudge[] = [
  {
    id: 'demo-marina-inactivity',
    type: 'inactivity',
    severity: 'info',
    timestamp: hoursAgo(2),
    read: false,
    data: { days: 3 },
  },
  {
    id: 'demo-marina-goal',
    type: 'goal-milestone',
    severity: 'info',
    timestamp: daysAgo(1),
    read: true,
    data: { goalId: 'aprender', completed: 1, total: 5 },
  },
];

// ── Rafael — direct persona, Kamino attention ─────────────────────

const RAFAEL_NUDGES: Nudge[] = [
  {
    id: 'demo-rafael-hf',
    type: 'hf-alert',
    severity: 'warning',
    timestamp: hoursAgo(6),
    read: false,
    data: { hf: 1.35, margin: 85.2 },
  },
  {
    id: 'demo-rafael-score',
    type: 'score-drop',
    severity: 'warning',
    timestamp: daysAgo(1),
    read: true,
    data: { previous: 58, current: 45, delta: 13 },
  },
];

// ── Luna — technical persona, Kamino danger ────────────────────────

const LUNA_NUDGES: Nudge[] = [
  {
    id: 'demo-luna-hf',
    type: 'hf-alert',
    severity: 'urgent',
    timestamp: hoursAgo(1),
    read: false,
    data: { hf: 1.02, margin: 4.4 },
  },
  {
    id: 'demo-luna-concentration',
    type: 'concentration',
    severity: 'warning',
    timestamp: hoursAgo(12),
    read: false,
    data: { symbol: 'SOL', percent: 72 },
  },
  {
    id: 'demo-luna-score',
    type: 'score-drop',
    severity: 'warning',
    timestamp: daysAgo(2),
    read: true,
    data: { previous: 42, current: 28, delta: 14 },
  },
];

// ── SemPosicao — encouraging persona, beginner ────────────────────

const SEMPOSICAO_NUDGES: Nudge[] = [
  {
    id: 'demo-semposicao-goal',
    type: 'goal-milestone',
    severity: 'info',
    timestamp: hoursAgo(4),
    read: false,
    data: { goalId: 'aprender', completed: 1, total: 5 },
  },
];

// ── Export ─────────────────────────────────────────────────────────

const DEMO_NUDGES: Record<DemoPersonaId, Nudge[]> = {
  marina: MARINA_NUDGES,
  rafael: RAFAEL_NUDGES,
  luna: LUNA_NUDGES,
  semposicao: SEMPOSICAO_NUDGES,
};

export function getDemoNudges(personaId: DemoPersonaId): Nudge[] {
  return DEMO_NUDGES[personaId] ?? [];
}
