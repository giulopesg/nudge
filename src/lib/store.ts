import type { UserProfile } from './neurotags';
import type { ActivityId } from './rpg';
import type { EducationProgress } from './goals';
import type { Nudge, PositionSnapshot } from './nudges';

const PROFILE_KEY = 'nudge:profile:';
const ACTIVITIES_KEY = 'nudge:activities:';
const EDUCATION_KEY = 'nudge:education:';
const SNAPSHOT_KEY = 'nudge:snapshot:';
const NUDGE_HISTORY_KEY = 'nudge:nudges:';
const REGISTRATION_KEY = 'nudge:registration:';

/**
 * Simple localStorage wrapper.
 * Will be swapped to Vercel KV in production.
 */
export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY + profile.wallet, JSON.stringify(profile));
}

export function getProfile(wallet: string): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(PROFILE_KEY + wallet);
  if (!raw) return null;
  return JSON.parse(raw) as UserProfile;
}

export function hasProfile(wallet: string): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(PROFILE_KEY + wallet) !== null;
}

// ── Activity tracking ───────────────────────────────────────────────

interface ActivityData {
  completed: ActivityId[];
  dates: Record<string, string>; // activityId → ISO date
}

function getActivityData(wallet: string): ActivityData {
  if (typeof window === 'undefined') return { completed: [], dates: {} };
  const raw = localStorage.getItem(ACTIVITIES_KEY + wallet);
  if (!raw) return { completed: [], dates: {} };
  return JSON.parse(raw) as ActivityData;
}

function saveActivityData(wallet: string, data: ActivityData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVITIES_KEY + wallet, JSON.stringify(data));
}

export function getCompletedActivities(wallet: string): ActivityData {
  return getActivityData(wallet);
}

export function completeActivity(wallet: string, activityId: ActivityId): void {
  const data = getActivityData(wallet);
  if (data.completed.includes(activityId)) return;
  data.completed.push(activityId);
  data.dates[activityId] = new Date().toISOString();
  saveActivityData(wallet, data);
}

// ── Education progress tracking ────────────────────────────────────

export function getEducationProgress(wallet: string): EducationProgress {
  if (typeof window === 'undefined') return { topicsRead: [], readDates: {} };
  const raw = localStorage.getItem(EDUCATION_KEY + wallet);
  if (!raw) return { topicsRead: [], readDates: {} };
  return JSON.parse(raw) as EducationProgress;
}

export function markTopicRead(wallet: string, topicId: string): void {
  if (typeof window === 'undefined') return;
  const data = getEducationProgress(wallet);
  if (data.topicsRead.includes(topicId)) return;
  data.topicsRead.push(topicId);
  data.readDates[topicId] = new Date().toISOString();
  localStorage.setItem(EDUCATION_KEY + wallet, JSON.stringify(data));
}

// ── Position snapshot tracking ────────────────────────────────────────

export function saveSnapshot(wallet: string, snapshot: PositionSnapshot): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SNAPSHOT_KEY + wallet, JSON.stringify(snapshot));
}

export function getSnapshot(wallet: string): PositionSnapshot | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(SNAPSHOT_KEY + wallet);
  if (!raw) return null;
  return JSON.parse(raw) as PositionSnapshot;
}

// ── Nudge history ─────────────────────────────────────────────────────

const MAX_NUDGE_HISTORY = 50;

export function getNudgeHistory(wallet: string): Nudge[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(NUDGE_HISTORY_KEY + wallet);
  if (!raw) return [];
  return JSON.parse(raw) as Nudge[];
}

export function saveNudges(wallet: string, nudges: Nudge[]): void {
  if (typeof window === 'undefined') return;
  const trimmed = nudges.slice(0, MAX_NUDGE_HISTORY);
  localStorage.setItem(NUDGE_HISTORY_KEY + wallet, JSON.stringify(trimmed));
}

export function markNudgeRead(wallet: string, nudgeId: string): void {
  if (typeof window === 'undefined') return;
  const history = getNudgeHistory(wallet);
  const nudge = history.find((n) => n.id === nudgeId);
  if (!nudge || nudge.read) return;
  nudge.read = true;
  saveNudges(wallet, history);
}

// ── Registration persistence ─────────────────────────────────────────

export interface Registration {
  txSignature: string;
  hash: string;
  timestamp: string;
}

export function saveRegistration(wallet: string, reg: Registration): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REGISTRATION_KEY + wallet, JSON.stringify(reg));
}

export function getRegistration(wallet: string): Registration | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(REGISTRATION_KEY + wallet);
  if (!raw) return null;
  return JSON.parse(raw) as Registration;
}

export function hasRegistration(wallet: string): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(REGISTRATION_KEY + wallet) !== null;
}
