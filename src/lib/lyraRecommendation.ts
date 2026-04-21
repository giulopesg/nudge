// ── Lyra recommendation engine ──────────────────────────────────────
// Pure function: receives dashboard data + behavioral profile → returns i18n key + params + contextual follow-ups.

import type { NudgeScore, PortfolioBalance } from '@/lib/portfolio';
import type { KaminoPosition } from '@/lib/kamino';
import type { Character } from '@/lib/rpg';
import type { NeurotageId, GoalId } from '@/lib/neurotags';

export interface RecommendationInput {
  nudgeScore: NudgeScore | null;
  portfolio: PortfolioBalance | null;
  kaminoPosition: KaminoPosition | null;
  character: Character | null;
  neurotags: NeurotageId[];
  goals: GoalId[];
}

export interface RecommendationResult {
  key: string;
  params: Record<string, string | number>;
  followUpKeys: string[];
}

export function getRecommendation(input: RecommendationInput): RecommendationResult {
  const { nudgeScore, portfolio, kaminoPosition, character, neurotags, goals } = input;
  const zone = nudgeScore?.zone ?? 'safe';
  const hf = kaminoPosition?.healthFactor;
  const margin = kaminoPosition?.marginPercent ?? null;

  const isExplorer = neurotags.includes('exploradora') || neurotags.includes('curiosa');
  const wantsSafety = neurotags.includes('quer-seguranca');
  const isAttentive = neurotags.includes('atenta');
  const wantsYield = goals.includes('rendimento');
  const wantsLearn = goals.includes('aprender');
  const wantsReserve = goals.includes('reserva');
  const wantsIndependence = goals.includes('independencia');

  // 1. Danger + low HF → immediate liquidation risk
  if (zone === 'danger' && hf !== undefined && hf < 1.3) {
    return {
      key: 'lyra.recommend.dangerHF',
      params: { hf: hf.toFixed(2) },
      followUpKeys: ['howCollateral', 'howReduceDebt'],
    };
  }

  // 2. Danger + tight margin
  if (zone === 'danger' && margin !== null && margin < 40) {
    return {
      key: 'lyra.recommend.dangerMargin',
      params: { margin: Math.round(margin) },
      followUpKeys: ['howCollateral', 'howReduceDebt'],
    };
  }

  // 3. Attention + Kamino
  if (zone === 'attention' && kaminoPosition) {
    return {
      key: wantsSafety ? 'lyra.recommend.attentionSafe' : 'lyra.recommend.attentionKamino',
      params: { hf: (hf ?? 0).toFixed(2), margin: Math.round(margin ?? 0) },
      followUpKeys: ['howCollateral', 'howMonitor'],
    };
  }

  // 4. Portfolio concentrated (top token > 80%)
  const topToken = portfolio?.tokens[0];
  if (topToken && topToken.percentOfTotal > 80) {
    return {
      key: isExplorer ? 'lyra.recommend.concentrateExplorer' : 'lyra.recommend.concentrate',
      params: { symbol: topToken.symbol, pct: Math.round(topToken.percentOfTotal) },
      followUpKeys: ['howDiversify', 'howStables'],
    };
  }

  // 5. No stablecoins (< 5%)
  const stablePct = portfolio
    ? portfolio.tokens.filter((t) => t.isStablecoin).reduce((s, t) => s + t.percentOfTotal, 0)
    : 0;
  if (portfolio && stablePct < 5) {
    return {
      key: wantsReserve ? 'lyra.recommend.noStablesReserve' : 'lyra.recommend.noStables',
      params: {},
      followUpKeys: ['howStables', 'howDiversify'],
    };
  }

  // 6. Beginner
  if (character && character.level <= 1) {
    const key = wantsLearn
      ? 'lyra.recommend.beginnerLearn'
      : wantsYield
        ? 'lyra.recommend.beginnerYield'
        : 'lyra.recommend.beginnerExplore';
    return { key, params: {}, followUpKeys: ['howStables', 'howYield'] };
  }

  // 7. Safe zone — neurotag-aware actionable tips
  if (zone === 'safe') {
    const score = nudgeScore?.overall ?? 0;
    if (isExplorer || wantsYield) {
      return { key: 'lyra.recommend.safeExplorer', params: { score }, followUpKeys: ['howYield', 'howDiversify'] };
    }
    if (wantsSafety || wantsReserve) {
      return { key: 'lyra.recommend.safeSecurity', params: { score }, followUpKeys: ['howStables', 'howMonitor'] };
    }
    if (isAttentive) {
      return { key: 'lyra.recommend.safeMonitor', params: { score }, followUpKeys: ['howMonitor', 'howDiversify'] };
    }
    if (wantsLearn || wantsIndependence) {
      return { key: 'lyra.recommend.safeLearner', params: { score }, followUpKeys: ['howYield', 'howStables'] };
    }
    return { key: 'lyra.recommend.allGood', params: { score }, followUpKeys: ['howDiversify', 'howYield'] };
  }

  // 8. Fallback
  return { key: 'lyra.recommend.generic', params: {}, followUpKeys: ['health', 'kamino'] };
}
