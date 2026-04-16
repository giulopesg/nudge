// ── Contextual insights generator ───────────────────────────────────
// Generates prioritized insights explaining WHAT happened and WHY.

import type { PortfolioBalance, NudgeScore } from './portfolio';
import type { KaminoPosition } from './kamino';
import type { CommProfile } from './communication';

export type InsightType = 'info' | 'warning' | 'action';

export interface Insight {
  id: string;
  type: InsightType;
  titleKey: string; // i18n key (profile variant appended by component)
  bodyKey: string;
  interpolation: Record<string, string | number>;
  actionKey?: string; // micro-action label
  actionHref?: string;
  priority: number; // lower = more urgent
}

// ── Thresholds ──────────────────────────────────────────────────────

const CONCENTRATION_WARN = 60; // >60% in one token
const STABLECOIN_LOW = 10; // <10% in stablecoins
const SMALL_PORTFOLIO_USD = 200;
const HF_ATTENTION = 1.5;
const HF_DANGER = 1.2;

// ── Generator ───────────────────────────────────────────────────────

export function generateInsights(
  portfolio: PortfolioBalance,
  score: NudgeScore,
  position: KaminoPosition | null,
  _profile: CommProfile,
): Insight[] {
  const insights: Insight[] = [];

  // 1. Kamino HF dropping (highest priority if present)
  if (position && position.healthFactor < HF_ATTENTION) {
    const isDanger = position.healthFactor < HF_DANGER;
    insights.push({
      id: 'kamino-hf',
      type: isDanger ? 'action' : 'warning',
      titleKey: 'kaminoHF.title',
      bodyKey: 'kaminoHF.body',
      interpolation: {
        hf: position.healthFactor.toFixed(2),
        margin: Math.round(position.marginPercent),
      },
      actionKey: isDanger ? 'kaminoHF.action' : undefined,
      actionHref: isDanger
        ? 'https://app.kamino.finance/lending/deposit'
        : undefined,
      priority: isDanger ? 1 : 3,
    });
  }

  // 2. Concentration risk
  const topToken = portfolio.tokens[0]; // sorted by value desc
  if (topToken && topToken.percentOfTotal > CONCENTRATION_WARN) {
    insights.push({
      id: 'concentration',
      type: topToken.percentOfTotal > 80 ? 'warning' : 'info',
      titleKey: 'concentration.title',
      bodyKey: 'concentration.body',
      interpolation: {
        symbol: topToken.symbol,
        percent: Math.round(topToken.percentOfTotal),
      },
      priority: 5,
    });
  }

  // 3. Low stablecoin allocation
  const stablePercent = portfolio.tokens
    .filter((t) => t.isStablecoin)
    .reduce((s, t) => s + t.percentOfTotal, 0);
  if (stablePercent < STABLECOIN_LOW && portfolio.totalValueUsd > 50) {
    insights.push({
      id: 'low-stables',
      type: 'info',
      titleKey: 'stablecoin.title',
      bodyKey: 'stablecoin.body',
      interpolation: {
        percent: Math.round(stablePercent * 10) / 10,
      },
      actionKey: 'stablecoin.action',
      priority: 7,
    });
  }

  // 4. Small portfolio (encouraging)
  if (portfolio.totalValueUsd < SMALL_PORTFOLIO_USD && portfolio.totalValueUsd > 0) {
    insights.push({
      id: 'small-portfolio',
      type: 'info',
      titleKey: 'smallPortfolio.title',
      bodyKey: 'smallPortfolio.body',
      interpolation: {
        total: Math.round(portfolio.totalValueUsd),
      },
      priority: 10,
    });
  }

  // 5. Good diversification (positive reinforcement)
  if (
    score.metrics.diversificationScore >= 70 &&
    portfolio.tokens.length >= 3
  ) {
    insights.push({
      id: 'good-diversification',
      type: 'info',
      titleKey: 'goodDiversification.title',
      bodyKey: 'goodDiversification.body',
      interpolation: {
        count: portfolio.tokens.length,
      },
      priority: 12,
    });
  }

  // Sort by priority (lower = more urgent = first)
  return insights.sort((a, b) => a.priority - b.priority);
}
