'use client';

import { useTranslation } from 'react-i18next';
import type { GoalId } from '@/lib/neurotags';
import type { GoalProgress } from '@/lib/goals';
import type { GoalStep } from '@/lib/goals';

interface Props {
  goals: GoalId[];
  progressList: GoalProgress[];
  onOpenEducation?: (topicId: string) => void;
}

const STEP_HREFS: Record<string, string> = {
  quiz: '/onboarding',
  portfolio: 'https://jup.ag/swap',
  kamino: 'https://app.kamino.finance/lending',
  action: 'https://jup.ag/swap',
};

function getStepHref(step: GoalStep & { done: boolean }): string | null {
  if (step.done) return null;
  if (step.type === 'education') return null; // handled via onOpenEducation
  return STEP_HREFS[step.type] ?? null;
}

function ProgressRing({ percent }: { percent: number }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="flex-shrink-0">
      <circle cx="36" cy="36" r={r} fill="none" stroke="var(--plum-muted)" strokeWidth="5" />
      <circle
        cx="36" cy="36" r={r} fill="none"
        stroke="var(--primary)" strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={offset}
        transform="rotate(-90 36 36)"
        className="transition-all duration-700"
      />
      <text
        x="36" y="36" textAnchor="middle" dominantBaseline="central"
        className="fill-foreground font-display text-[13px] font-bold"
      >
        {percent}%
      </text>
    </svg>
  );
}

export default function JourneyCard({ goals, progressList, onOpenEducation }: Props) {
  const { t } = useTranslation('goals');

  if (goals.length === 0) return null;

  const totalCompleted = progressList.reduce((s, p) => s + p.completed, 0);
  const totalSteps = progressList.reduce((s, p) => s + p.total, 0);
  const percent = totalSteps > 0 ? Math.round((totalCompleted / totalSteps) * 100) : 0;

  const bgOpacity = Math.min(0.06, 0.02 + (percent / 100) * 0.04);

  return (
    <div
      className="card rounded-2xl"
      style={{ background: `linear-gradient(135deg, rgba(0,212,170,${bgOpacity}), var(--surface))` }}
    >
      {/* Header with progress ring */}
      <div className="flex items-center gap-4">
        <ProgressRing percent={percent} />
        <div>
          <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            {t('journeyTitle')}
          </h3>
          <p className="mt-0.5 text-sm text-foreground font-semibold">
            {t('journeyProgress', { percent })}
          </p>
        </div>
      </div>

      {/* Goal rows */}
      <div className="mt-4 space-y-3">
        {progressList.map((progress) => {
          const pct = progress.total > 0
            ? Math.round((progress.completed / progress.total) * 100) : 0;
          const isDone = progress.completed >= progress.total;

          return (
            <div key={progress.goalId}>
              <div className="flex items-center justify-between">
                <p className={`text-sm leading-snug ${isDone ? 'text-text-muted line-through' : 'text-foreground'}`}>
                  {isDone && <span className="mr-1.5 text-safe">&#10003;</span>}
                  {t(`options.${progress.goalId}.label`)}
                </p>
                <span className="flex-shrink-0 font-mono text-[10px] text-text-muted">
                  {t('stepsCount', { completed: progress.completed, total: progress.total })}
                </span>
              </div>
              {/* Mini progress bar */}
              <div className="mt-1.5 h-1.5 rounded-full bg-plum-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${Math.max(pct, 2)}%` }}
                />
              </div>
              {/* Incomplete steps with action links */}
              {!isDone && (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {progress.steps.filter((s) => !s.done).map((step) => {
                    const href = getStepHref(step);
                    const isEdu = step.type === 'education' && step.topicId;

                    if (isEdu && onOpenEducation) {
                      return (
                        <button
                          key={step.id}
                          onClick={() => onOpenEducation(step.topicId!)}
                          className="rounded-md bg-plum-muted px-2 py-0.5 font-mono text-[9px] text-plum-light hover:bg-plum/20 transition-colors"
                        >
                          {t(`steps.${step.id}`)} &rarr;
                        </button>
                      );
                    }

                    if (href) {
                      const isExternal = href.startsWith('http');
                      return (
                        <a
                          key={step.id}
                          href={href}
                          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="rounded-md bg-plum-muted px-2 py-0.5 font-mono text-[9px] text-plum-light hover:bg-plum/20 transition-colors"
                        >
                          {t(`steps.${step.id}`)} &rarr;
                        </a>
                      );
                    }

                    return (
                      <span
                        key={step.id}
                        className="rounded-md bg-surface-hover px-2 py-0.5 font-mono text-[9px] text-text-muted"
                      >
                        {t(`steps.${step.id}`)}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
