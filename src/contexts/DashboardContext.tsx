'use client';

import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSearchParams } from 'next/navigation';

import { getProfile, getCompletedActivities, getEducationProgress, markTopicRead, completeActivity } from '@/lib/store';
import { usePosition, type EnrichedPosition } from '@/hooks/usePosition';
import { useNudges } from '@/hooks/useNudges';
import { buildCharacter, ACTIVITIES } from '@/lib/rpg';
import type { InventoryItemId } from '@/lib/rpg';
import { resolveCommProfile, type CommProfile } from '@/lib/communication';
import { generateInsights, type Insight } from '@/lib/insights';
import { getDemoPersona, type DemoPersona } from '@/lib/demo';
import { calcGoalProgress, buildProgressContext, type GoalProgress } from '@/lib/goals';
import type { GoalId, NeurotageId, Gender } from '@/lib/neurotags';
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
  gender: Gender;
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
  trackLyraTopic: (topic: string) => void;

  // XP / Level-up / Item unlock
  pendingXpGain: number | null;
  pendingLevelUp: boolean;
  pendingItemUnlock: InventoryItemId | null;
  dismissXpToast: () => void;
  dismissLevelUp: () => void;
  dismissItemUnlock: () => void;

  // Lyra auto-action
  lyraAutoAction: 'recommendation' | null;
  requestLyraRecommendation: () => void;
  clearLyraAutoAction: () => void;

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

  const [gender, setGender] = useState<Gender>('f');
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
      setGender(persona.gender);
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
        setGender(profile.gender ?? 'f');
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
  const portfolio = data?.portfolio ?? null;
  const rawNudgeScore = data?.nudgeScore ?? null;
  const nudgeScore = (portfolio && portfolio.totalValueUsd < 1) ? null : rawNudgeScore;
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

  // Lyra topic tracking (for read-status activity)
  const lyraTopicsRef = useRef<Set<string>>(new Set());
  const [lyraTopicCount, setLyraTopicCount] = useState(0);

  const trackLyraTopic = useCallback((topic: string) => {
    if (!lyraTopicsRef.current.has(topic)) {
      lyraTopicsRef.current.add(topic);
      setLyraTopicCount(lyraTopicsRef.current.size);
    }
  }, []);

  // XP / Level-up / Item unlock tracking
  const [pendingXpGain, setPendingXpGain] = useState<number | null>(null);
  const [pendingLevelUp, setPendingLevelUp] = useState(false);
  const [pendingItemUnlocks, setPendingItemUnlocks] = useState<InventoryItemId[]>([]);
  const prevLevelRef = useRef<number | null>(null);
  const prevActivityCountRef = useRef<number>(0);

  const dismissXpToast = useCallback(() => setPendingXpGain(null), []);
  const dismissLevelUp = useCallback(() => setPendingLevelUp(false), []);
  const pendingItemUnlock = pendingItemUnlocks[0] ?? null;
  const dismissItemUnlock = useCallback(() => {
    setPendingItemUnlocks((prev) => prev.slice(1));
  }, []);

  // Detect level-up
  useEffect(() => {
    if (!character) return;
    if (prevLevelRef.current !== null && character.level > prevLevelRef.current) {
      setPendingLevelUp(true);
    }
    prevLevelRef.current = character.level;
  }, [character]);

  // Auto-detect and grant activities based on current state
  useEffect(() => {
    if (isDemo || !walletAddress || neurotags.length === 0) return;

    const current = getCompletedActivities(walletAddress).completed;
    const toGrant: ActivityId[] = [];

    if (showData && !current.includes('first-dashboard')) {
      toGrant.push('first-dashboard');
    }
    if (hasKamino && !current.includes('first-position')) {
      toGrant.push('first-position');
    }
    if (topicsRead.includes('whatIsHF') && !current.includes('learn-hf')) {
      toGrant.push('learn-hf');
    }
    if (lyraTopicCount >= 3 && !current.includes('read-status')) {
      toGrant.push('read-status');
    }

    if (toGrant.length === 0) return;

    for (const actId of toGrant) {
      completeActivity(walletAddress, actId);
    }

    const actData = getCompletedActivities(walletAddress);
    setActivities(actData.completed);
    setActivityDates(actData.dates);

    const newItems = toGrant.map((actId) => ACTIVITIES[actId].item);
    setPendingItemUnlocks((prev) => [...prev, ...newItems]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showData, hasKamino, topicsRead, walletAddress, isDemo, neurotags.length, lyraTopicCount]);

  // Demo mode: grant Lyra read-status when 3+ topics explored
  useEffect(() => {
    if (!isDemo || lyraTopicCount < 3) return;
    if (activities.includes('read-status')) return;

    const newActs = [...activities, 'read-status' as ActivityId];
    const now = new Date().toISOString();
    const newDates = { ...activityDates, 'read-status': now };
    setActivities(newActs);
    setActivityDates(newDates);

    setPendingItemUnlocks((prev) => [...prev, ACTIVITIES['read-status'].item]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDemo, lyraTopicCount]);

  // Detect XP gain from new activities
  useEffect(() => {
    if (activities.length > prevActivityCountRef.current && prevActivityCountRef.current > 0) {
      const newActivities = activities.slice(prevActivityCountRef.current);
      const xpGained = newActivities.reduce(
        (sum, actId) => sum + (ACTIVITIES[actId]?.xp ?? 0), 0,
      );
      if (xpGained > 0) setPendingXpGain(xpGained);
    }
    prevActivityCountRef.current = activities.length;
  }, [activities]);

  // Lyra auto-action state
  const [lyraAutoAction, setLyraAutoAction] = useState<'recommendation' | null>(null);
  const requestLyraRecommendation = useCallback(() => setLyraAutoAction('recommendation'), []);
  const clearLyraAutoAction = useCallback(() => setLyraAutoAction(null), []);

  // Polling: refetch every 5 minutes when dashboard is open and not demo
  useEffect(() => {
    if (isDemo || !walletAddress) return;
    const interval = setInterval(() => { refetch(); }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isDemo, walletAddress, refetch]);

  const value = useMemo<DashboardContextValue>(() => ({
    data, loading, error, refetch,
    gender, neurotags, activities, activityDates, goals, topicsRead, hasProfile,
    isDemo, persona,
    commProfile, nudgeScore, portfolio, kaminoPosition, healthFactor, hasKamino,
    insights, goalProgressList, character,
    nudges, unreadCount, markAsRead, markAllAsRead,
    handleTopicRead, trackLyraTopic,
    pendingXpGain, pendingLevelUp, pendingItemUnlock,
    dismissXpToast, dismissLevelUp, dismissItemUnlock,
    lyraAutoAction, requestLyraRecommendation, clearLyraAutoAction,
    connected, showData,
  }), [
    data, loading, error, refetch,
    gender, neurotags, activities, activityDates, goals, topicsRead, hasProfile,
    isDemo, persona,
    commProfile, nudgeScore, portfolio, kaminoPosition, healthFactor, hasKamino,
    insights, goalProgressList, character,
    nudges, unreadCount, markAsRead, markAllAsRead,
    handleTopicRead, trackLyraTopic,
    pendingXpGain, pendingLevelUp, pendingItemUnlock,
    dismissXpToast, dismissLevelUp, dismissItemUnlock,
    lyraAutoAction, requestLyraRecommendation, clearLyraAutoAction,
    connected, showData,
  ]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
