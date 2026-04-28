// ── Nudge engine — compares snapshots and generates behavioral alerts ──

import type { EnrichedPosition } from '@/lib/enrich';
import type { GoalProgress } from '@/lib/goals';

// ── Types ──────────────────────────────────────────────────────────────

export type NudgeSeverity = 'info' | 'warning' | 'urgent';

export type NudgeType =
  | 'welcome'
  | 'hf-alert'
  | 'score-drop'
  | 'concentration'
  | 'volatility'
  | 'goal-milestone'
  | 'inactivity'
  | 'score-improvement';

export interface Nudge {
  id: string;
  type: NudgeType;
  severity: NudgeSeverity;
  timestamp: string;
  read: boolean;
  /** i18n interpolation values */
  data: Record<string, string | number>;
}

export interface PositionSnapshot {
  timestamp: string;
  nudgeScore: number;
  healthFactor: number | null;
  solPriceUsd: number;
  topTokenPercent: number;
  topTokenSymbol: string;
}

// ── Snapshot creation ─────────────────────────────────────────────────

export function createSnapshot(enriched: EnrichedPosition): PositionSnapshot {
  const { portfolio, nudgeScore, position } = enriched;
  const topToken = portfolio.tokens.length > 0 ? portfolio.tokens[0] : null;

  return {
    timestamp: new Date().toISOString(),
    nudgeScore: nudgeScore.overall,
    healthFactor: position.position?.healthFactor ?? null,
    solPriceUsd: portfolio.solValueUsd / Math.max(portfolio.solBalance, 0.0001),
    topTokenPercent: topToken?.percentOfTotal ?? 0,
    topTokenSymbol: topToken?.symbol ?? 'SOL',
  };
}

// ── Thresholds ────────────────────────────────────────────────────────

const HF_URGENT = 1.2;
const HF_WARNING = 1.5;
const SCORE_DELTA_THRESHOLD = 10;
const CONCENTRATION_THRESHOLD = 70;
const VOLATILITY_PERCENT = 10;
const INACTIVITY_DAYS = 3;

// ── Nudge generation ──────────────────────────────────────────────────

function makeId(type: NudgeType): string {
  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function checkHFAlert(
  enriched: EnrichedPosition,
): Nudge | null {
  const hf = enriched.position.position?.healthFactor ?? null;
  if (hf === null) return null;

  if (hf < HF_URGENT) {
    return {
      id: makeId('hf-alert'),
      type: 'hf-alert',
      severity: 'urgent',
      timestamp: new Date().toISOString(),
      read: false,
      data: {
        hf: Number(hf.toFixed(2)),
        margin: Number((enriched.position.position!.marginPercent).toFixed(1)),
      },
    };
  }

  if (hf < HF_WARNING) {
    return {
      id: makeId('hf-alert'),
      type: 'hf-alert',
      severity: 'warning',
      timestamp: new Date().toISOString(),
      read: false,
      data: {
        hf: Number(hf.toFixed(2)),
        margin: Number((enriched.position.position!.marginPercent).toFixed(1)),
      },
    };
  }

  return null;
}

function checkScoreDrop(
  enriched: EnrichedPosition,
  last: PositionSnapshot | null,
): Nudge | null {
  if (!last) return null;
  const delta = enriched.nudgeScore.overall - last.nudgeScore;
  if (delta <= -SCORE_DELTA_THRESHOLD) {
    return {
      id: makeId('score-drop'),
      type: 'score-drop',
      severity: 'warning',
      timestamp: new Date().toISOString(),
      read: false,
      data: {
        previous: last.nudgeScore,
        current: enriched.nudgeScore.overall,
        delta: Math.abs(delta),
      },
    };
  }
  return null;
}

function checkScoreImprovement(
  enriched: EnrichedPosition,
  last: PositionSnapshot | null,
): Nudge | null {
  if (!last) return null;
  const delta = enriched.nudgeScore.overall - last.nudgeScore;
  if (delta >= SCORE_DELTA_THRESHOLD) {
    return {
      id: makeId('score-improvement'),
      type: 'score-improvement',
      severity: 'info',
      timestamp: new Date().toISOString(),
      read: false,
      data: {
        previous: last.nudgeScore,
        current: enriched.nudgeScore.overall,
        delta,
      },
    };
  }
  return null;
}

function checkConcentration(enriched: EnrichedPosition): Nudge | null {
  const topToken = enriched.portfolio.tokens[0];
  if (!topToken || topToken.percentOfTotal < CONCENTRATION_THRESHOLD) return null;

  return {
    id: makeId('concentration'),
    type: 'concentration',
    severity: 'warning',
    timestamp: new Date().toISOString(),
    read: false,
    data: {
      symbol: topToken.symbol,
      percent: Math.round(topToken.percentOfTotal),
    },
  };
}

function checkVolatility(
  enriched: EnrichedPosition,
  last: PositionSnapshot | null,
): Nudge | null {
  if (!last || last.solPriceUsd === 0) return null;

  const currentPrice = enriched.portfolio.solValueUsd /
    Math.max(enriched.portfolio.solBalance, 0.0001);
  const changePct = ((currentPrice - last.solPriceUsd) / last.solPriceUsd) * 100;

  if (Math.abs(changePct) < VOLATILITY_PERCENT) return null;

  return {
    id: makeId('volatility'),
    type: 'volatility',
    severity: Math.abs(changePct) >= 20 ? 'warning' : 'info',
    timestamp: new Date().toISOString(),
    read: false,
    data: {
      direction: changePct > 0 ? 'up' : 'down',
      percent: Math.round(Math.abs(changePct)),
    },
  };
}

function checkGoalMilestone(
  goalProgress: GoalProgress[],
  last: PositionSnapshot | null,
): Nudge | null {
  if (!last) return null;

  for (const goal of goalProgress) {
    const justCompleted = goal.steps.find(
      (s) => s.done && s.type === 'quiz',
    );
    if (justCompleted && goal.completed > 0) {
      return {
        id: makeId('goal-milestone'),
        type: 'goal-milestone',
        severity: 'info',
        timestamp: new Date().toISOString(),
        read: false,
        data: {
          goalId: goal.goalId,
          completed: goal.completed,
          total: goal.total,
        },
      };
    }
  }
  return null;
}

function checkInactivity(last: PositionSnapshot | null): Nudge | null {
  if (!last) return null;

  const lastVisit = new Date(last.timestamp).getTime();
  const now = Date.now();
  const daysSinceVisit = (now - lastVisit) / (1000 * 60 * 60 * 24);

  if (daysSinceVisit < INACTIVITY_DAYS) return null;

  return {
    id: makeId('inactivity'),
    type: 'inactivity',
    severity: 'info',
    timestamp: new Date().toISOString(),
    read: false,
    data: { days: Math.floor(daysSinceVisit) },
  };
}

function checkWelcome(lastSnapshot: PositionSnapshot | null): Nudge | null {
  if (lastSnapshot !== null) return null;
  return {
    id: makeId('welcome'),
    type: 'welcome',
    severity: 'info',
    timestamp: new Date().toISOString(),
    read: false,
    data: {},
  };
}

// ── Main generator ────────────────────────────────────────────────────

export function generateNudges(
  current: EnrichedPosition,
  lastSnapshot: PositionSnapshot | null,
  goalProgress: GoalProgress[],
): Nudge[] {
  const nudges: Nudge[] = [];

  const welcome = checkWelcome(lastSnapshot);
  if (welcome) nudges.push(welcome);

  const hfNudge = checkHFAlert(current);
  if (hfNudge) nudges.push(hfNudge);

  const scoreDrop = checkScoreDrop(current, lastSnapshot);
  if (scoreDrop) nudges.push(scoreDrop);

  const concentration = checkConcentration(current);
  if (concentration) nudges.push(concentration);

  const volatility = checkVolatility(current, lastSnapshot);
  if (volatility) nudges.push(volatility);

  const goalMilestone = checkGoalMilestone(goalProgress, lastSnapshot);
  if (goalMilestone) nudges.push(goalMilestone);

  const inactivity = checkInactivity(lastSnapshot);
  if (inactivity) nudges.push(inactivity);

  const scoreUp = checkScoreImprovement(current, lastSnapshot);
  if (scoreUp) nudges.push(scoreUp);

  return nudges;
}
