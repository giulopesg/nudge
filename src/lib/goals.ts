// ── Goals system — connects crypto with real-life purposes ──────────

export type GoalId = 'reserva' | 'independencia' | 'aprender' | 'rendimento' | 'remessas';

export interface GoalStep {
  id: string;
  type: 'quiz' | 'education' | 'portfolio' | 'kamino' | 'action';
  /** XP reward for completing this step */
  xp: number;
  /** For education steps: which topicId must be read */
  topicId?: string;
  /** For portfolio steps: condition checker key */
  conditionKey?: string;
}

export const GOAL_STEPS: Record<GoalId, GoalStep[]> = {
  aprender: [
    { id: 'quiz-done', type: 'quiz', xp: 100 },
    { id: 'read-whatIsHF', type: 'education', xp: 75, topicId: 'whatIsHF' },
    { id: 'read-whatAreStablecoins', type: 'education', xp: 75, topicId: 'whatAreStablecoins' },
    { id: 'read-whatIsDiversification', type: 'education', xp: 75, topicId: 'whatIsDiversification' },
    { id: 'read-whatIsKamino', type: 'education', xp: 75, topicId: 'whatIsKamino' },
  ],
  reserva: [
    { id: 'has-stablecoins', type: 'portfolio', xp: 75, conditionKey: 'hasStablecoins' },
    { id: 'stables-10pct', type: 'portfolio', xp: 75, conditionKey: 'stablesAbove10' },
    { id: 'hold-7days', type: 'action', xp: 150, conditionKey: 'holdStables7d' },
  ],
  independencia: [
    { id: 'wallet-created', type: 'action', xp: 150, conditionKey: 'walletCreated' },
    { id: 'quiz-done', type: 'quiz', xp: 100 },
    { id: 'read-whatIsNudgeScore', type: 'education', xp: 75, topicId: 'whatIsNudgeScore' },
  ],
  rendimento: [
    { id: 'read-whatIsKamino', type: 'education', xp: 75, topicId: 'whatIsKamino' },
    { id: 'has-kamino-position', type: 'kamino', xp: 100, conditionKey: 'hasKaminoPosition' },
    { id: 'hf-above-1.5', type: 'kamino', xp: 100, conditionKey: 'hfAbove1_5' },
  ],
  remessas: [
    { id: 'has-usdc', type: 'portfolio', xp: 75, conditionKey: 'hasUSDC' },
    { id: 'read-transfers', type: 'education', xp: 75, topicId: 'whatAreStablecoins' },
    { id: 'first-transfer', type: 'action', xp: 150, conditionKey: 'firstTransfer' },
  ],
};

/** Sum all XP for a given goal's steps */
export function calcGoalTotalXp(goalId: GoalId): number {
  return GOAL_STEPS[goalId].reduce((sum, step) => sum + step.xp, 0);
}

// ── Education progress tracking ─────────────────────────────────────

export interface EducationProgress {
  topicsRead: string[];
  readDates: Record<string, string>;
}

// ── Goal progress calculation ───────────────────────────────────────

export interface GoalProgress {
  goalId: GoalId;
  total: number;
  completed: number;
  steps: Array<GoalStep & { done: boolean }>;
}

interface ProgressContext {
  quizDone: boolean;
  topicsRead: string[];
  hasStablecoins: boolean;
  stablesAbove10: boolean;
  walletCreated: boolean;
  hasKaminoPosition: boolean;
  hfAbove1_5: boolean;
  hasUSDC: boolean;
}

function isStepDone(step: GoalStep, ctx: ProgressContext): boolean {
  switch (step.type) {
    case 'quiz':
      return ctx.quizDone;
    case 'education':
      return step.topicId ? ctx.topicsRead.includes(step.topicId) : false;
    case 'portfolio':
      if (step.conditionKey === 'hasStablecoins') return ctx.hasStablecoins;
      if (step.conditionKey === 'stablesAbove10') return ctx.stablesAbove10;
      if (step.conditionKey === 'hasUSDC') return ctx.hasUSDC;
      return false;
    case 'kamino':
      if (step.conditionKey === 'hasKaminoPosition') return ctx.hasKaminoPosition;
      if (step.conditionKey === 'hfAbove1_5') return ctx.hfAbove1_5;
      return false;
    case 'action':
      if (step.conditionKey === 'walletCreated') return ctx.walletCreated;
      // holdStables7d and firstTransfer not trackable yet
      return false;
    default:
      return false;
  }
}

export function calcGoalProgress(
  goalId: GoalId,
  ctx: ProgressContext,
): GoalProgress {
  const steps = GOAL_STEPS[goalId];
  const enriched = steps.map((s) => ({ ...s, done: isStepDone(s, ctx) }));
  return {
    goalId,
    total: steps.length,
    completed: enriched.filter((s) => s.done).length,
    steps: enriched,
  };
}

export function buildProgressContext(opts: {
  quizDone: boolean;
  topicsRead: string[];
  hasStablecoins: boolean;
  stablecoinPercent: number;
  walletConnected: boolean;
  hasKaminoPosition: boolean;
  healthFactor: number | null;
  hasUSDC: boolean;
}): ProgressContext {
  return {
    quizDone: opts.quizDone,
    topicsRead: opts.topicsRead,
    hasStablecoins: opts.hasStablecoins,
    stablesAbove10: opts.stablecoinPercent >= 10,
    walletCreated: opts.walletConnected,
    hasKaminoPosition: opts.hasKaminoPosition,
    hfAbove1_5: opts.healthFactor !== null && opts.healthFactor >= 1.5,
    hasUSDC: opts.hasUSDC,
  };
}
