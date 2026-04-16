'use client';

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSearchParams } from 'next/navigation';

import { getProfile, getCompletedActivities, getEducationProgress, markTopicRead } from '@/lib/store';
import { usePosition, type EnrichedPosition } from '@/hooks/usePosition';
import { useNudges } from '@/hooks/useNudges';
import { buildCharacter } from '@/lib/rpg';
import { resolveCommProfile, type CommProfile } from '@/lib/communication';
import { generateInsights, type Insight } from '@/lib/insights';
import { getDemoPersona, type DemoPersona } from '@/lib/demo';
import { calcGoalProgress, buildProgressContext, type GoalProgress } from '@/lib/goals';
import type { GoalId, NeurotageId } from '@/lib/neurotags';
import type { ActivityId } from '@/lib/rpg';
import type { Character } from '@/lib/rpg';
import type { DemoPersonaId } from '@/lib/demo';
import type { NudgeScore, PortfolioBalance } from '@/lib/portfolio';
import type { KaminoPosition } from '@/lib/kamino';
import type { Nudge } from '@/lib/nudges';

// ── Context value ─────────���──────────────────────────────────────────

export interface DashboardContextValue {
  // Data
  data: EnrichedPosition | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;

  // Profile
  neurotags: NeurotageId[];
  activities: ActivityId[];
  activityDates: Record<string, string>;
  goals: GoalId[];
  topicsRead: string[];
  hasProfile: boolean;

  // Demo
  isDemo: boolean;
  persona: DemoPersona | null;

  // Derived
  commProfile: CommProfile;
  nudgeScore: NudgeScore | null;
  portfolio: PortfolioBalance | null;
  kaminoPosition: KaminoPosition | null;
  healthFactor: number | undefined;
  hasKamino: boolean;
  insights: Insight[];
  goalProgressList: GoalProgress[];
  character: Character | null;

  // Nudges
  nudges: Nudge[];
  unreadCount: number;
  markAsRead: (nudgeId: string) => void;
  markAllAsRead: () => void;

  // Actions
  handleTopicRead: (topicId: string) => void;

  // Wallet
  connected: boolean;
  showData: boolean;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}

// ── Provider ─────────────���───────────────────────────────────────────

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { connected, publicKey } = useWallet();
  const searchParams = useSearchParams();
  const demoParam = searchParams.get('demo');
  const persona = getDemoPersona(demoParam);
  const isDemo = persona !== null;

  const [neurotags, setNeurotags] = useState<NeurotageId[]>([]);
  const [activities, setActivities] = useState<ActivityId[]>([]);
  const [activityDates, setActivityDates] = useState<Record<string, string>>({});
  const [goals, setGoals] = useState<GoalId[]>([]);
  const [topicsRead, setTopicsRead] = useState<string[]>([]);

  const walletAddress = publicKey?.toBase58() ?? null;
  const { data, loading, error, refetch } = usePosition(walletAddress, demoParam);

  // Load profile data
  useEffect(() => {
    if (persona) {
      setNeurotags(persona.neurotags);
      setActivities(persona.activities);
      setActivityDates(persona.activityDates);
      setGoals(persona.goals);
      setTopicsRead(persona.educationTopicsRead);
      return;
    }
    if (publicKey) {
      const wallet = publicKey.toBase58();
      const profile = getProfile(wallet);
      if (profile) {
        setNeurotags(profile.neurotags);
        setGoals(profile.goals ?? []);
      }
      const actData = getCompletedActivities(wallet);
      setActivities(actData.completed);
      setActivityDates(actData.dates);
      const eduData = getEducationProgress(wallet);
      setTopicsRead(eduData.topicsRead);
    }
  }, [publicKey, persona]);

  const handleTopicRead = useCallback(
    (topicId: string) => {
      setTopicsRead((prev) => prev.includes(topicId) ? prev : [...prev, topicId]);
      const wallet = persona?.wallet ?? walletAddress;
      if (wallet && !isDemo) {
        markTopicRead(wallet, topicId);
      }
    },
    [persona, walletAddress, isDemo],
  );

  const character = neurotags.length > 0
    ? buildCharacter(neurotags, activities, activityDates)
    : null;

  const showData = connected || isDemo;
  const hasProfile = neurotags.length > 0;

  // Derived state
  const commProfile = resolveCommProfile(neurotags);
  const nudgeScore = data?.nudgeScore ?? null;
  const portfolio = data?.portfolio ?? null;
  const kaminoPosition = data?.position.position ?? null;
  const healthFactor = kaminoPosition?.healthFactor;
  const hasKamino = kaminoPosition !== null;

  const insights = (portfolio && nudgeScore)
    ? generateInsights(portfolio, nudgeScore, kaminoPosition, commProfile)
    : [];

  // Goal progress
  const stablecoinPercent = portfolio
    ? portfolio.tokens.filter((t) => t.isStablecoin).reduce((s, t) => s + t.percentOfTotal, 0)
    : 0;
  const hasStablecoins = portfolio
    ? portfolio.tokens.some((t) => t.isStablecoin && t.valueUsd > 0)
    : false;
  const hasUSDC = portfolio
    ? portfolio.tokens.some((t) => t.symbol === 'USDC' && t.valueUsd > 0)
    : false;

  const progressCtx = buildProgressContext({
    quizDone: activities.includes('quiz-complete'),
    topicsRead,
    hasStablecoins,
    stablecoinPercent,
    walletConnected: connected || isDemo,
    hasKaminoPosition: hasKamino,
    healthFactor: healthFactor ?? null,
    hasUSDC,
  });

  const goalProgressList = goals.map((g) => calcGoalProgress(g, progressCtx));

  // Nudge system
  const nudgeWallet = persona?.wallet ?? walletAddress;
  const { nudges, unreadCount, markAsRead, markAllAsRead } = useNudges(
    nudgeWallet,
    data,
    goalProgressList,
    isDemo,
    (persona?.id as DemoPersonaId) ?? null,
  );

  // Polling: refetch every 5 minutes when dashboard is open and not demo
  useEffect(() => {
    if (isDemo || !walletAddress) return;
    const interval = setInterval(() => { refetch(); }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isDemo, walletAddress, refetch]);

  const value = useMemo<DashboardContextValue>(() => ({
    data, loading, error, refetch,
    neurotags, activities, activityDates, goals, topicsRead, hasProfile,
    isDemo, persona,
    commProfile, nudgeScore, portfolio, kaminoPosition, healthFactor, hasKamino,
    insights, goalProgressList, character,
    nudges, unreadCount, markAsRead, markAllAsRead,
    handleTopicRead,
    connected, showData,
  }), [
    data, loading, error, refetch,
    neurotags, activities, activityDates, goals, topicsRead, hasProfile,
    isDemo, persona,
    commProfile, nudgeScore, portfolio, kaminoPosition, healthFactor, hasKamino,
    insights, goalProgressList, character,
    nudges, unreadCount, markAsRead, markAllAsRead,
    handleTopicRead,
    connected, showData,
  ]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
