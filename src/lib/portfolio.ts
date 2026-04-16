// ── Portfolio types & NudgeScore calculation ────────────────────────

export interface TokenBalance {
  symbol: string;
  mint: string; // mint address or 'native' for SOL
  amount: number;
  valueUsd: number;
  percentOfTotal: number; // 0-100
  isStablecoin: boolean;
}

export interface PortfolioBalance {
  tokens: TokenBalance[];
  totalValueUsd: number;
  solBalance: number; // backward compat
  solValueUsd: number; // backward compat
}

export type HealthZone = 'safe' | 'attention' | 'danger';

export interface NudgeScoreMetrics {
  diversificationScore: number; // 0-100, inverted HHI
  stablecoinRatio: number; // 0-100, penalizes outside 10-30%
  concentrationRisk: number; // 0-100, penalizes >70% in 1 token
  kaminoHealthScore: number; // 0-100, from HF or 100 if no loan
}

export interface NudgeScore {
  overall: number; // 0-100 composite
  zone: HealthZone;
  metrics: NudgeScoreMetrics;
  topConcern: string | null; // i18n key of biggest problem
}

// ── Known stablecoins ───────────────────────────────────────────────

const STABLECOIN_SYMBOLS = new Set(['USDC', 'USDT', 'DAI', 'PYUSD', 'UXD']);

export function isStablecoin(symbol: string): boolean {
  return STABLECOIN_SYMBOLS.has(symbol.toUpperCase());
}

// ── Score calculation helpers ───────────────────────────────────────

/**
 * Diversification via inverted HHI (Herfindahl-Hirschman Index).
 * HHI = sum of squared market shares. Lower HHI = more diverse.
 * Score = 100 * (1 - HHI). Single token → 0, perfect split → ~100.
 */
function calcDiversification(tokens: TokenBalance[]): number {
  if (tokens.length <= 1) return 0;
  const hhi = tokens.reduce((sum, t) => sum + (t.percentOfTotal / 100) ** 2, 0);
  // Normalize: HHI ranges from 1/n (perfect) to 1.0 (single token)
  // Score from 0 (single) to 100 (perfectly spread)
  return Math.round(Math.max(0, Math.min(100, (1 - hhi) * 100)));
}

/**
 * Stablecoin allocation score.
 * Ideal range: 10-30% of portfolio in stablecoins.
 * Below 10%: penalize linearly. Above 30%: slight penalty (too conservative).
 * 0% stables → 30 points. 20% → 100 points. 50% → 70 points.
 */
function calcStablecoinScore(tokens: TokenBalance[]): number {
  const totalValue = tokens.reduce((s, t) => s + t.valueUsd, 0);
  if (totalValue === 0) return 50;

  const stableValue = tokens
    .filter((t) => t.isStablecoin)
    .reduce((s, t) => s + t.valueUsd, 0);
  const ratio = stableValue / totalValue;

  // Sweet spot: 10-30%
  if (ratio >= 0.1 && ratio <= 0.3) return 100;
  // Below 10%: linear drop to 30 at 0%
  if (ratio < 0.1) return Math.round(30 + (ratio / 0.1) * 70);
  // Above 30%: gentle drop to 60 at 100%
  return Math.round(100 - ((ratio - 0.3) / 0.7) * 40);
}

/**
 * Concentration risk: penalizes having >50% in a single token.
 * Max allocation <50% → 100. At 70% → 60. At 100% → 0.
 */
function calcConcentrationScore(tokens: TokenBalance[]): number {
  if (tokens.length === 0) return 50;
  const maxPercent = Math.max(...tokens.map((t) => t.percentOfTotal));
  if (maxPercent <= 50) return 100;
  // Linear drop: 50% → 100, 100% → 0
  return Math.round(Math.max(0, 100 - ((maxPercent - 50) / 50) * 100));
}

/**
 * Kamino health score from Health Factor.
 * No loan → 100. HF >= 2.0 → 100. HF 1.5 → 80. HF 1.2 → 50. HF 1.0 → 10.
 */
function calcKaminoHealthScore(healthFactor: number | null): number {
  if (healthFactor === null) return 100; // No loan = perfect health
  if (healthFactor >= 2.0) return 100;
  if (healthFactor >= 1.5) {
    // 1.5→80, 2.0→100
    return Math.round(80 + ((healthFactor - 1.5) / 0.5) * 20);
  }
  if (healthFactor >= 1.2) {
    // 1.2→50, 1.5→80
    return Math.round(50 + ((healthFactor - 1.2) / 0.3) * 30);
  }
  if (healthFactor >= 1.0) {
    // 1.0→10, 1.2→50
    return Math.round(10 + ((healthFactor - 1.0) / 0.2) * 40);
  }
  return 0;
}

// ── Identify top concern ────────────────────────────────────────────

function findTopConcern(metrics: NudgeScoreMetrics, hasKamino: boolean): string | null {
  const concerns: { key: string; score: number }[] = [
    { key: 'concentration.title', score: metrics.concentrationRisk },
    { key: 'stablecoin.title', score: metrics.stablecoinRatio },
    { key: 'goodDiversification.title', score: metrics.diversificationScore },
  ];

  if (hasKamino) {
    concerns.push({ key: 'kaminoHF.title', score: metrics.kaminoHealthScore });
  }

  // Lowest score = biggest concern
  const worst = concerns.reduce((a, b) => (a.score < b.score ? a : b));
  return worst.score < 70 ? worst.key : null;
}

// ── Main calculation ────────────────────────────────────────────────

/**
 * Calculate composite NudgeScore from portfolio + optional Kamino HF.
 *
 * Weights:
 * - With Kamino: diversification 20% + stablecoin 15% + concentration 20% + kamino 45%
 * - Without Kamino: diversification 35% + stablecoin 30% + concentration 35%
 */
export function calculateNudgeScore(
  portfolio: PortfolioBalance,
  healthFactor: number | null,
): NudgeScore {
  const hasKamino = healthFactor !== null;

  const metrics: NudgeScoreMetrics = {
    diversificationScore: calcDiversification(portfolio.tokens),
    stablecoinRatio: calcStablecoinScore(portfolio.tokens),
    concentrationRisk: calcConcentrationScore(portfolio.tokens),
    kaminoHealthScore: calcKaminoHealthScore(healthFactor),
  };

  let overall: number;
  if (hasKamino) {
    overall =
      metrics.diversificationScore * 0.2 +
      metrics.stablecoinRatio * 0.15 +
      metrics.concentrationRisk * 0.2 +
      metrics.kaminoHealthScore * 0.45;
  } else {
    overall =
      metrics.diversificationScore * 0.35 +
      metrics.stablecoinRatio * 0.3 +
      metrics.concentrationRisk * 0.35;
  }

  overall = Math.round(overall);

  const zone: HealthZone =
    overall >= 65 ? 'safe' : overall >= 35 ? 'attention' : 'danger';

  return {
    overall,
    zone,
    metrics,
    topConcern: findTopConcern(metrics, hasKamino),
  };
}

// ── Portfolio builder from token list ───────────────────────────────

export function buildPortfolio(
  tokens: Array<{ symbol: string; mint: string; amount: number; valueUsd: number }>,
): PortfolioBalance {
  const totalValueUsd = tokens.reduce((s, t) => s + t.valueUsd, 0);
  const solToken = tokens.find((t) => t.mint === 'native' || t.symbol === 'SOL');

  const enriched: TokenBalance[] = tokens
    .filter((t) => t.valueUsd > 0 || t.amount > 0)
    .map((t) => ({
      ...t,
      percentOfTotal: totalValueUsd > 0 ? (t.valueUsd / totalValueUsd) * 100 : 0,
      isStablecoin: isStablecoin(t.symbol),
    }))
    .sort((a, b) => b.valueUsd - a.valueUsd);

  return {
    tokens: enriched,
    totalValueUsd,
    solBalance: solToken?.amount ?? 0,
    solValueUsd: solToken?.valueUsd ?? 0,
  };
}
