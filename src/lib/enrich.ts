// ── Shared enrichment: PositionResponse → EnrichedPosition ──────────
// Pure function usable from both client hooks and server-side cron.

import type { PositionResponse } from '@/lib/kamino';
import type { PortfolioBalance, NudgeScore } from '@/lib/portfolio';
import { buildPortfolio, calculateNudgeScore } from '@/lib/portfolio';

export interface EnrichedPosition {
  position: PositionResponse;
  portfolio: PortfolioBalance;
  nudgeScore: NudgeScore;
}

/**
 * Enrich a raw PositionResponse with portfolio and nudge score.
 * Deterministic — no side effects, no network calls.
 */
export function enrichPosition(res: PositionResponse): EnrichedPosition {
  const portfolio = buildPortfolio([
    {
      symbol: 'SOL',
      mint: 'native',
      amount: res.balance.solBalance,
      valueUsd: res.balance.solValueUsd,
    },
  ]);

  const nudgeScore = calculateNudgeScore(
    portfolio,
    res.position?.healthFactor ?? null,
  );

  return { position: res, portfolio, nudgeScore };
}
