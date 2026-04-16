import type { NeurotageId } from './neurotags';

/**
 * RPG Character System
 * 3 layers: Identity (neurotags), Progression (tier+XP), Inventory (items).
 */

// ── Activities (game loop) ──────────────────────────────────────────

export type ActivityId =
  | 'quiz-complete'
  | 'first-dashboard'
  | 'first-position'
  | 'read-status'
  | 'survive-attention'
  | 'survive-danger'
  | 'weekly-check'
  | 'learn-hf'
  | 'first-action'
  | 'refer-friend'
  | 'onchain-register';

export interface Activity {
  id: ActivityId;
  xp: number;
  item: InventoryItemId;
}

export const ACTIVITIES: Record<ActivityId, Activity> = {
  'quiz-complete':      { id: 'quiz-complete',      xp: 100, item: 'chave-wallet' },
  'first-dashboard':    { id: 'first-dashboard',    xp: 50,  item: 'mapa-kamino' },
  'first-position':     { id: 'first-position',     xp: 75,  item: 'escritura-kamino' },
  'read-status':        { id: 'read-status',        xp: 50,  item: 'lente-clareza' },
  'survive-attention':  { id: 'survive-attention',   xp: 100, item: 'escudo-serenidade' },
  'survive-danger':     { id: 'survive-danger',      xp: 200, item: 'lamina-coragem' },
  'weekly-check':       { id: 'weekly-check',        xp: 150, item: 'orbe-vigilancia' },
  'learn-hf':           { id: 'learn-hf',            xp: 75,  item: 'grimorio-basico' },
  'first-action':       { id: 'first-action',        xp: 200, item: 'runa-acao' },
  'refer-friend':       { id: 'refer-friend',        xp: 100, item: 'emblema-mentora' },
  'onchain-register':   { id: 'onchain-register',    xp: 150, item: 'selo-solana' },
};

// ── Inventory ───────────────────────────────────────────────────────

export type InventoryItemId =
  | 'chave-wallet'
  | 'mapa-kamino'
  | 'escritura-kamino'
  | 'lente-clareza'
  | 'escudo-serenidade'
  | 'lamina-coragem'
  | 'orbe-vigilancia'
  | 'grimorio-basico'
  | 'runa-acao'
  | 'emblema-mentora'
  | 'selo-solana';

export interface InventoryItem {
  id: InventoryItemId;
  icon: string;
  obtainedAt: string; // ISO date
}

export const ITEM_ICONS: Record<InventoryItemId, string> = {
  'chave-wallet':       '\uD83D\uDD11',
  'mapa-kamino':        '\uD83D\uDCCA',
  'escritura-kamino':   '\uD83C\uDFE6',
  'lente-clareza':      '\uD83D\uDD0D',
  'escudo-serenidade':  '\uD83D\uDEE1\uFE0F',
  'lamina-coragem':     '\u2694\uFE0F',
  'orbe-vigilancia':    '\uD83D\uDD2E',
  'grimorio-basico':    '\uD83D\uDCD6',
  'runa-acao':          '\u26A1',
  'emblema-mentora':    '\uD83C\uDF1F',
  'selo-solana':        '\u26D3\uFE0F',
};

export const INVENTORY_SLOTS = 11;

// ── Tiers ───────────────────────────────────────────────────────────

export interface Tier {
  number: number;
  name: string; // i18n key suffix
}

export const TIERS: Tier[] = [
  { number: 1, name: 'iniciante' },
  { number: 2, name: 'aprendiz' },
  { number: 3, name: 'praticante' },
  { number: 4, name: 'estrategista' },
  { number: 5, name: 'soberana' },
];

export function getTier(level: number): Tier {
  const index = Math.min(Math.ceil(level / 2), TIERS.length) - 1;
  return TIERS[Math.max(0, index)];
}

// ── Character class ─────────────────────────────────────────────────

export interface CharacterClass {
  name: string;
  title: string;
  description: string;
  icon: string;
}

export interface CharacterStats {
  clarity: number;    // 0-100
  confidence: number; // 0-100
  reactivity: number; // 0-100 (higher = calmer)
}

export interface Character {
  class: CharacterClass;
  level: number;
  xp: number;
  xpToNext: number;
  stats: CharacterStats;
  traits: NeurotageId[];
  tier: Tier;
  inventory: InventoryItem[];
}

const CLASSES: Record<string, CharacterClass> = {
  guardian: {
    name: 'guardian',
    title: 'Guardi\u00e3',
    description: 'Protege seus recursos com cautela.',
    icon: '\uD83D\uDEE1\uFE0F',
  },
  explorer: {
    name: 'explorer',
    title: 'Exploradora',
    description: 'Busca novos horizontes, mas com p\u00e9s no ch\u00e3o.',
    icon: '\uD83E\uDDED',
  },
  strategist: {
    name: 'strategist',
    title: 'Estrategista',
    description: 'Analisa antes de agir. Dados s\u00e3o sua arma.',
    icon: '\u265F\uFE0F',
  },
  scholar: {
    name: 'scholar',
    title: 'Aprendiz',
    description: 'Cada conceito novo \u00e9 uma conquista.',
    icon: '\uD83D\uDCD6',
  },
  sentinel: {
    name: 'sentinel',
    title: 'Sentinela',
    description: 'Vigia o mercado com disciplina e paci\u00eancia.',
    icon: '\uD83D\uDC41\uFE0F',
  },
  sovereign: {
    name: 'sovereign',
    title: 'Soberana',
    description: 'Toma decis\u00f5es com confian\u00e7a. Liberdade conquistada.',
    icon: '\uD83D\uDC51',
  },
};

export function getCharacterClass(tags: NeurotageId[]): CharacterClass {
  const has = (t: NeurotageId) => tags.includes(t);

  if (has('autonoma-inicial') && has('calma-sob-pressao')) return CLASSES.sovereign;
  if (has('exploradora')) return CLASSES.explorer;
  if (has('atenta') && !has('iniciante')) return CLASSES.sentinel;
  if (has('intermediaria')) return CLASSES.strategist;
  if (has('curiosa')) return CLASSES.scholar;
  return CLASSES.guardian;
}

// ── Stats ───────────────────────────────────────────────────────────

const STAT_MODIFIERS: Partial<Record<NeurotageId, Partial<CharacterStats>>> = {
  'avessa-a-jargao':      { clarity: -15 },
  'delegadora':           { confidence: -20 },
  'semi-autonoma':        { confidence: -5 },
  'autonoma-inicial':     { confidence: 10 },
  'indecisa-sob-pressao': { reactivity: -25, confidence: -10 },
  'reativa':              { reactivity: -20 },
  'calma-sob-pressao':    { reactivity: 25 },
  'negligente':           { clarity: -10 },
  'atenta':               { clarity: 10, reactivity: 5 },
  'quer-seguranca':       { confidence: 5 },
  'curiosa':              { clarity: 10, confidence: 5 },
  'exploradora':          { confidence: 10, clarity: 5 },
};

export function calculateStats(tags: NeurotageId[]): CharacterStats {
  const base: CharacterStats = { clarity: 50, confidence: 50, reactivity: 50 };

  for (const tag of tags) {
    const mod = STAT_MODIFIERS[tag];
    if (mod) {
      base.clarity += mod.clarity ?? 0;
      base.confidence += mod.confidence ?? 0;
      base.reactivity += mod.reactivity ?? 0;
    }
  }

  return {
    clarity: Math.max(5, Math.min(95, base.clarity)),
    confidence: Math.max(5, Math.min(95, base.confidence)),
    reactivity: Math.max(5, Math.min(95, base.reactivity)),
  };
}

// ── XP & Level from activities ──────────────────────────────────────

export function calculateLevel(completedActivities: ActivityId[]): {
  level: number;
  xp: number;
  xpToNext: number;
} {
  const xp = completedActivities.reduce(
    (sum, actId) => sum + (ACTIVITIES[actId]?.xp ?? 0),
    0,
  );
  const level = Math.min(10, Math.floor(xp / 150) + 1);
  const xpToNext = level * 150;

  return { level, xp, xpToNext };
}

// ── Inventory from activities ───────────────────────────────────────

export function buildInventory(
  completedActivities: ActivityId[],
  activityDates: Record<string, string>,
): InventoryItem[] {
  return completedActivities
    .filter((actId) => ACTIVITIES[actId])
    .map((actId) => {
      const activity = ACTIVITIES[actId];
      return {
        id: activity.item,
        icon: ITEM_ICONS[activity.item],
        obtainedAt: activityDates[actId] ?? new Date().toISOString(),
      };
    });
}

// ── Build full character ────────────────────────────────────────────

export function buildCharacter(
  tags: NeurotageId[],
  completedActivities: ActivityId[] = [],
  activityDates: Record<string, string> = {},
): Character {
  const { level, xp, xpToNext } = calculateLevel(completedActivities);
  const tier = getTier(level);
  const inventory = buildInventory(completedActivities, activityDates);

  return {
    class: getCharacterClass(tags),
    level,
    xp,
    xpToNext,
    stats: calculateStats(tags),
    traits: tags,
    tier,
    inventory,
  };
}
