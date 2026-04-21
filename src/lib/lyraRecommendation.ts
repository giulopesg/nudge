// ── Lyra recommendation engine ──────────────────────────────────────
// Pure function: receives dashboard data + behavioral profile → returns i18n key + params + contextual follow-ups.

import type { NudgeScore, PortfolioBalance } from '@/lib/portfolio';
import type { KaminoPosition } from '@/lib/kamino';
import type { Character } from '@/lib/rpg';
import type { NeurotageId, GoalId } from '@/lib/neurotags';
import type { InventoryItemId } from '@/lib/rpg';

// ── Character context for smart framing ─────────────────────────────

export interface CharacterContext {
  className: string;
  level: number;
  tier: string;
  stats: { clarity: number; confidence: number; reactivity: number };
  inventory: InventoryItemId[];
  neurotags: NeurotageId[];
  commProfile: string;
}

function buildCharacterContext(character: Character | null, neurotags: NeurotageId[], commProfile: string): CharacterContext | null {
  if (!character) return null;
  return {
    className: character.class.name,
    level: character.level,
    tier: character.tier.name,
    stats: character.stats,
    inventory: character.inventory.map((i) => i.id),
    neurotags,
    commProfile,
  };
}

// ── Class-based framing ─────────────────────────────────────────────

function getClassFramingKey(className: string): string {
  switch (className) {
    case 'guardian': return 'classFrame.guardian';
    case 'explorer': return 'classFrame.explorer';
    case 'strategist': return 'classFrame.strategist';
    default: return 'classFrame.default';
  }
}

// ── Stat-based insights ─────────────────────────────────────────────

function getStatInsightKey(stats: CharacterContext['stats']): string | null {
  if (stats.clarity < 40) return 'statInsight.lowClarity';
  if (stats.confidence > 80) return 'statInsight.highConfidence';
  if (stats.reactivity < 30) return 'statInsight.lowReactivity';
  return null;
}

// ── Inventory-based reinforcement ───────────────────────────────────

function getInventoryInsightKey(inventory: InventoryItemId[]): string | null {
  if (inventory.includes('escudo-serenidade')) return 'inventoryInsight.shield';
  if (inventory.includes('lente-clareza')) return 'inventoryInsight.clarity';
  if (inventory.includes('grimorio-basico')) return 'inventoryInsight.grimoire';
  if (inventory.includes('lamina-coragem')) return 'inventoryInsight.courage';
  return null;
}

// ── Neurotag-based priority ordering ────────────────────────────────

function getNeurotaPriorityKey(neurotags: NeurotageId[]): string | null {
  if (neurotags.includes('reativa')) return 'neuroInsight.impulsive';
  if (neurotags.includes('negligente')) return 'neuroInsight.negligent';
  if (neurotags.includes('indecisa-sob-pressao')) return 'neuroInsight.indecisive';
  if (neurotags.includes('curiosa')) return 'neuroInsight.curious';
  if (neurotags.includes('calma-sob-pressao')) return 'neuroInsight.calm';
  return null;
}

// ── Level complexity ────────────────────────────────────────────────

function getLevelTier(level: number): 'beginner' | 'intermediate' | 'advanced' {
  if (level <= 3) return 'beginner';
  if (level <= 7) return 'intermediate';
  return 'advanced';
}

// ── Main engine ─────────────────────────────────────────────────────

export interface RecommendationInput {
  nudgeScore: NudgeScore | null;
  portfolio: PortfolioBalance | null;
  kaminoPosition: KaminoPosition | null;
  character: Character | null;
  neurotags: NeurotageId[];
  goals: GoalId[];
  commProfile?: string;
}

export interface RecommendationResult {
  key: string;
  params: Record<string, string | number>;
  followUpKeys: string[];
  contextKeys: string[]; // additional smart context keys
}

export function getRecommendation(input: RecommendationInput): RecommendationResult {
  const { nudgeScore, portfolio, kaminoPosition, character, neurotags, goals, commProfile = 'gentle' } = input;
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

  // Build character context for smart framing
  const ctx = buildCharacterContext(character, neurotags, commProfile);
  const contextKeys: string[] = [];

  // Collect smart context layers
  if (ctx) {
    const classFrame = getClassFramingKey(ctx.className);
    contextKeys.push(classFrame);

    const statInsight = getStatInsightKey(ctx.stats);
    if (statInsight) contextKeys.push(statInsight);

    const inventoryInsight = getInventoryInsightKey(ctx.inventory);
    if (inventoryInsight) contextKeys.push(inventoryInsight);

    const neuroInsight = getNeurotaPriorityKey(ctx.neurotags);
    if (neuroInsight) contextKeys.push(neuroInsight);
  }

  // Params augmented with character data
  const charParams: Record<string, string | number> = {};
  if (ctx) {
    charParams.className = ctx.className;
    charParams.level = ctx.level;
    charParams.tier = ctx.tier;
    charParams.levelTier = getLevelTier(ctx.level);
  }

  // 1. Danger + low HF → immediate liquidation risk
  if (zone === 'danger' && hf !== undefined && hf < 1.3) {
    return {
      key: 'lyra.recommend.dangerHF',
      params: { ...charParams, hf: hf.toFixed(2) },
      followUpKeys: ['howCollateral', 'howReduceDebt'],
      contextKeys,
    };
  }

  // 2. Danger + tight margin
  if (zone === 'danger' && margin !== null && margin < 40) {
    return {
      key: 'lyra.recommend.dangerMargin',
      params: { ...charParams, margin: Math.round(margin) },
      followUpKeys: ['howCollateral', 'howReduceDebt'],
      contextKeys,
    };
  }

  // 3. Attention + Kamino
  if (zone === 'attention' && kaminoPosition) {
    return {
      key: wantsSafety ? 'lyra.recommend.attentionSafe' : 'lyra.recommend.attentionKamino',
      params: { ...charParams, hf: (hf ?? 0).toFixed(2), margin: Math.round(margin ?? 0) },
      followUpKeys: ['howCollateral', 'howMonitor'],
      contextKeys,
    };
  }

  // 4. Portfolio concentrated (top token > 80%)
  const topToken = portfolio?.tokens[0];
  if (topToken && topToken.percentOfTotal > 80) {
    return {
      key: isExplorer ? 'lyra.recommend.concentrateExplorer' : 'lyra.recommend.concentrate',
      params: { ...charParams, symbol: topToken.symbol, pct: Math.round(topToken.percentOfTotal) },
      followUpKeys: ['howDiversify', 'howStables'],
      contextKeys,
    };
  }

  // 5. No stablecoins (< 5%)
  const stablePct = portfolio
    ? portfolio.tokens.filter((t) => t.isStablecoin).reduce((s, t) => s + t.percentOfTotal, 0)
    : 0;
  if (portfolio && stablePct < 5) {
    return {
      key: wantsReserve ? 'lyra.recommend.noStablesReserve' : 'lyra.recommend.noStables',
      params: charParams,
      followUpKeys: ['howStables', 'howDiversify'],
      contextKeys,
    };
  }

  // 6. Beginner
  if (character && character.level <= 1) {
    const key = wantsLearn
      ? 'lyra.recommend.beginnerLearn'
      : wantsYield
        ? 'lyra.recommend.beginnerYield'
        : 'lyra.recommend.beginnerExplore';
    return { key, params: charParams, followUpKeys: ['howStables', 'howYield'], contextKeys };
  }

  // 7. Safe zone — neurotag-aware actionable tips
  if (zone === 'safe') {
    const score = nudgeScore?.overall ?? 0;
    if (isExplorer || wantsYield) {
      return { key: 'lyra.recommend.safeExplorer', params: { ...charParams, score }, followUpKeys: ['howYield', 'howDiversify'], contextKeys };
    }
    if (wantsSafety || wantsReserve) {
      return { key: 'lyra.recommend.safeSecurity', params: { ...charParams, score }, followUpKeys: ['howStables', 'howMonitor'], contextKeys };
    }
    if (isAttentive) {
      return { key: 'lyra.recommend.safeMonitor', params: { ...charParams, score }, followUpKeys: ['howMonitor', 'howDiversify'], contextKeys };
    }
    if (wantsLearn || wantsIndependence) {
      return { key: 'lyra.recommend.safeLearner', params: { ...charParams, score }, followUpKeys: ['howYield', 'howStables'], contextKeys };
    }
    return { key: 'lyra.recommend.allGood', params: { ...charParams, score }, followUpKeys: ['howDiversify', 'howYield'], contextKeys };
  }

  // 8. Fallback
  return { key: 'lyra.recommend.generic', params: charParams, followUpKeys: ['health', 'kamino'], contextKeys };
}
