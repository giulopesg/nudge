import type { PositionResponse } from './kamino';
import type { UserProfile, NeurotageId, GoalId } from './neurotags';
import type { ActivityId } from './rpg';
import type { PortfolioBalance } from './portfolio';
import { buildPortfolio } from './portfolio';

// ── Demo Persona type ────────────────────────────────────────────────

export type DemoPersonaId = 'marina' | 'rafael' | 'luna' | 'semposicao';

export interface DemoPersona {
  id: DemoPersonaId;
  wallet: string;
  avatar: string; // path in /public
  neurotags: NeurotageId[];
  goals: GoalId[];
  activities: ActivityId[];
  activityDates: Record<string, string>;
  profile: UserProfile;
  position: PositionResponse;
  portfolio: PortfolioBalance;
  educationTopicsRead: string[];
}

// ── SOL price constant for demo ─────────────────────────────────────

const SOL_PRICE = 146.0;
const JUP_PRICE = 1.25;
const BONK_PRICE = 0.000024;

// ── Giuliana — gentle, Kamino safe, 3 tokens ────────────────────────

const MARINA: DemoPersona = {
  id: 'marina',
  wallet: 'MaRiNa...dEm0',
  avatar: '/giuliana-avatar.png',
  neurotags: [
    'iniciante', 'delegadora', 'indecisa-sob-pressao',
    'negligente', 'avessa-a-jargao', 'quer-seguranca', 'curiosa',
  ],
  goals: ['reserva', 'aprender'],
  educationTopicsRead: [],
  activities: ['quiz-complete', 'first-dashboard', 'first-position'],
  activityDates: {
    'quiz-complete':   '2026-04-14T10:05:00.000Z',
    'first-dashboard': '2026-04-14T10:06:00.000Z',
    'first-position':  '2026-04-14T10:10:00.000Z',
  },
  profile: {
    wallet: 'MaRiNa...dEm0',
    neurotags: [
      'iniciante', 'delegadora', 'indecisa-sob-pressao',
      'negligente', 'avessa-a-jargao', 'quer-seguranca', 'curiosa',
    ],
    answers: { q1: 'other', q2: 'unsure', q3: 'rarely', q4: 'noIdea', q5: ['safety', 'learn'] },
    goals: ['reserva', 'aprender'],
    createdAt: '2026-04-14T10:00:00.000Z',
  },
  position: {
    wallet: 'MaRiNa...dEm0',
    balance: { solBalance: 2.45, solValueUsd: 2.45 * SOL_PRICE },
    position: {
      totalCollateral: 320.0,
      collateralDetails: [{ symbol: 'SOL', amount: 2.19, valueUsd: 320.0 }],
      totalDebt: 100.0,
      debtDetails: [{ symbol: 'USDC', amount: 100.0, valueUsd: 100.0 }],
      healthFactor: 1.85,
      loanToValue: 0.31,
      status: 'safe',
      netValue: 220.0,
      marginPercent: 220.0,
    },
    timestamp: new Date().toISOString(),
  },
  portfolio: buildPortfolio([
    { symbol: 'SOL', mint: 'native', amount: 2.45, valueUsd: 2.45 * SOL_PRICE },
    { symbol: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', amount: 150, valueUsd: 150 },
    { symbol: 'JUP', mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', amount: 50, valueUsd: 50 * JUP_PRICE },
  ]),
};

// ── Rafael — direct, Kamino attention, 4 tokens ─────────────────────

const RAFAEL: DemoPersona = {
  id: 'rafael',
  wallet: 'RaFaEL...dEm0',
  avatar: '/rafael-avatar.png',
  neurotags: ['intermediaria', 'semi-autonoma', 'atenta', 'quer-seguranca', 'curiosa'],
  goals: ['rendimento', 'aprender'],
  educationTopicsRead: ['whatIsHF'],
  activities: [
    'quiz-complete', 'first-dashboard', 'first-position',
    'survive-attention', 'learn-hf', 'onchain-register',
  ],
  activityDates: {
    'quiz-complete':     '2026-04-10T08:00:00.000Z',
    'first-dashboard':   '2026-04-10T08:05:00.000Z',
    'first-position':    '2026-04-10T08:10:00.000Z',
    'survive-attention': '2026-04-12T09:30:00.000Z',
    'learn-hf':          '2026-04-13T11:00:00.000Z',
    'onchain-register':  '2026-04-10T08:02:00.000Z',
  },
  profile: {
    wallet: 'RaFaEL...dEm0',
    neurotags: ['intermediaria', 'semi-autonoma', 'atenta', 'quer-seguranca', 'curiosa'],
    answers: { q1: 'together', q2: 'hold', q3: 'weekly', q4: 'knows', q5: ['safety', 'monitor'] },
    goals: ['rendimento', 'aprender'],
    createdAt: '2026-04-10T08:00:00.000Z',
  },
  position: {
    wallet: 'RaFaEL...dEm0',
    balance: { solBalance: 8.12, solValueUsd: 8.12 * SOL_PRICE },
    position: {
      totalCollateral: 835.0,
      collateralDetails: [{ symbol: 'SOL', amount: 5.8, valueUsd: 835.0 }],
      totalDebt: 451.2,
      debtDetails: [{ symbol: 'USDC', amount: 451.2, valueUsd: 451.2 }],
      healthFactor: 1.35,
      loanToValue: 0.54,
      status: 'attention',
      netValue: 383.8,
      marginPercent: 85.2,
    },
    timestamp: new Date().toISOString(),
  },
  portfolio: buildPortfolio([
    { symbol: 'SOL', mint: 'native', amount: 8.12, valueUsd: 8.12 * SOL_PRICE },
    { symbol: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', amount: 500, valueUsd: 500 },
    { symbol: 'JUP', mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', amount: 200, valueUsd: 200 * JUP_PRICE },
    { symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', amount: 50000, valueUsd: 50000 * BONK_PRICE },
  ]),
};

// ── Luna — technical, Kamino danger, 4 tokens ───────────────────────

const LUNA: DemoPersona = {
  id: 'luna',
  wallet: 'LuNaAA...dEm0',
  avatar: '/luna-avatar.png',
  neurotags: [
    'autonoma-inicial', 'calma-sob-pressao', 'exploradora',
    'atenta', 'quer-seguranca', 'curiosa',
  ],
  goals: ['rendimento', 'independencia'],
  educationTopicsRead: ['whatIsHF', 'whatIsKamino', 'whatIsDiversification'],
  activities: [
    'quiz-complete', 'first-dashboard', 'first-position',
    'survive-attention', 'survive-danger',
    'learn-hf', 'first-action', 'onchain-register',
  ],
  activityDates: {
    'quiz-complete':     '2026-04-05T08:00:00.000Z',
    'first-dashboard':   '2026-04-05T08:05:00.000Z',
    'first-position':    '2026-04-05T08:10:00.000Z',
    'survive-attention': '2026-04-08T09:30:00.000Z',
    'survive-danger':    '2026-04-10T16:00:00.000Z',
    'learn-hf':          '2026-04-11T11:00:00.000Z',
    'first-action':      '2026-04-12T10:00:00.000Z',
    'onchain-register':  '2026-04-05T08:03:00.000Z',
  },
  profile: {
    wallet: 'LuNaAA...dEm0',
    neurotags: [
      'autonoma-inicial', 'calma-sob-pressao', 'exploradora',
      'atenta', 'quer-seguranca', 'curiosa',
    ],
    answers: { q1: 'self', q2: 'hold', q3: 'daily', q4: 'knows', q5: ['safety', 'learn', 'opportunities'] },
    goals: ['rendimento', 'independencia'],
    createdAt: '2026-04-05T08:00:00.000Z',
  },
  position: {
    wallet: 'LuNaAA...dEm0',
    balance: { solBalance: 14.3, solValueUsd: 14.3 * SOL_PRICE },
    position: {
      totalCollateral: 471.2,
      collateralDetails: [{ symbol: 'SOL', amount: 3.23, valueUsd: 471.2 }],
      totalDebt: 451.2,
      debtDetails: [{ symbol: 'USDC', amount: 451.2, valueUsd: 451.2 }],
      healthFactor: 1.02,
      loanToValue: 0.95,
      status: 'danger',
      netValue: 20.0,
      marginPercent: 4.4,
    },
    timestamp: new Date().toISOString(),
  },
  portfolio: buildPortfolio([
    { symbol: 'SOL', mint: 'native', amount: 14.3, valueUsd: 14.3 * SOL_PRICE },
    { symbol: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', amount: 100, valueUsd: 100 },
    { symbol: 'JUP', mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', amount: 500, valueUsd: 500 * JUP_PRICE },
    { symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', amount: 100000, valueUsd: 100000 * BONK_PRICE },
  ]),
};

// ── Nyx — encouraging, no Kamino, 2 tokens ──────────────────────────

const SEM_POSICAO: DemoPersona = {
  id: 'semposicao',
  wallet: 'N0PoSi...dEm0',
  avatar: '/nyx-avatar.png',
  neurotags: ['iniciante', 'curiosa'],
  goals: ['aprender'],
  educationTopicsRead: [],
  activities: ['quiz-complete', 'first-dashboard'],
  activityDates: {
    'quiz-complete':   '2026-04-14T15:00:00.000Z',
    'first-dashboard': '2026-04-14T15:05:00.000Z',
  },
  profile: {
    wallet: 'N0PoSi...dEm0',
    neurotags: ['iniciante', 'curiosa'],
    answers: { q1: 'other', q2: 'unsure', q3: 'rarely', q4: 'noIdea', q5: ['learn'] },
    goals: ['aprender'],
    createdAt: '2026-04-14T15:00:00.000Z',
  },
  position: {
    wallet: 'N0PoSi...dEm0',
    balance: { solBalance: 0.5, solValueUsd: 0.5 * SOL_PRICE },
    position: null,
    timestamp: new Date().toISOString(),
  },
  portfolio: buildPortfolio([
    { symbol: 'SOL', mint: 'native', amount: 0.5, valueUsd: 0.5 * SOL_PRICE },
    { symbol: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', amount: 25, valueUsd: 25 },
  ]),
};

// ── Exports ──────────────────────────────────────────────────────────

export const DEMO_PERSONAS: Record<DemoPersonaId, DemoPersona> = {
  marina: MARINA,
  rafael: RAFAEL,
  luna: LUNA,
  semposicao: SEM_POSICAO,
};

export const DEMO_PERSONA_IDS: DemoPersonaId[] = ['marina', 'rafael', 'luna', 'semposicao'];

export function getDemoPersona(id: string | null): DemoPersona | null {
  if (!id) return null;
  if (id === 'true') return MARINA; // backward compat: ?demo=true → Marina
  return DEMO_PERSONAS[id as DemoPersonaId] ?? null;
}

// ── Backward-compat exports (point to Marina) ───────────────────────

export const DEMO_WALLET = MARINA.wallet;
export const DEMO_NEUROTAGS = MARINA.neurotags;
export const DEMO_PROFILE = MARINA.profile;
export const DEMO_ACTIVITIES = MARINA.activities;
export const DEMO_ACTIVITY_DATES = MARINA.activityDates;
export const DEMO_POSITION = MARINA.position;
