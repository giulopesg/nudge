'use client';

import { useTranslation } from 'react-i18next';
import type { GoalId } from '@/lib/neurotags';
import { calcGoalTotalXp, type GoalProgress, type GoalStep } from '@/lib/goals';

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
  if (step.type === 'education') return null;
  return STEP_HREFS[step.type] ?? null;
}

type Zone = 'starting' | 'progress' | 'almost';

function getZone(percent: number): Zone {
  if (percent >= 80) return 'almost';
  if (percent >= 40) return 'progress';
  return 'starting';
}

const ZONE_STYLES: Record<Zone, { badge: string; box: string; text: string }> = {
  starting: {
    badge: 'text-primary bg-primary-muted border border-primary/30 shadow-[0_0_12px_var(--primary-glow)]',
    box: 'border-primary/20 bg-primary-muted/50',
    text: 'text-primary',
  },
  progress: {
    badge: 'text-plum bg-plum-muted border border-plum/30 shadow-[0_0_12px_var(--plum-glow)]',
    box: 'border-plum/20 bg-plum-muted/50',
    text: 'text-plum',
  },
  almost: {
    badge: 'text-safe bg-safe-bg border border-safe/30 shadow-[0_0_12px_var(--safe-glow)]',
    box: 'border-safe/20 bg-safe-bg',
    text: 'text-safe',
  },
};

function getMotivationKey(percent: number): string {
  if (percent >= 100) return 'done';
  if (percent >= 80) return 'high';
  if (percent >= 40) return 'mid';
  return 'low';
}

function getStatusKey(percent: number): string {
  if (percent >= 100) return 'complete';
  if (percent >= 80) return 'almostDone';
  if (percent >= 40) return 'inProgress';
  return 'starting';
}

function GoalCard({ progress, onOpenEducation, t }: {
  progress: GoalProgress;
  onOpenEducation?: (topicId: string) => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}) {
  const pct = progress.total > 0
    ? Math.round((progress.completed / progress.total) * 100) : 0;
  const isDone = progress.completed >= progress.total;

  return (
    <div className={`goal-card ${isDone ? 'goal-card-done' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <p className={`text-[14px] font-semibold leading-snug ${isDone ? 'text-text-muted line-through' : 'text-foreground'}`}>
          {isDone && <span className="mr-1.5 text-safe">&#10003;</span>}
          {t(`options.${progress.goalId}.label`)}
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono text-[11px] text-xp">
            {t('goalTotalXp', { xp: calcGoalTotalXp(progress.goalId) })}
          </span>
          <span className="font-mono text-[12px] text-text-muted">
            {t('stepsCount', { completed: progress.completed, total: progress.total })}
          </span>
        </div>
      </div>

      {/* Mini progress bar */}
      <div className="h-1.5 rounded-full bg-plum-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>

      {/* Next action link */}
      {!isDone && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {progress.steps.filter((s) => !s.done).slice(0, 2).map((step) => {
            const href = getStepHref(step);
            const isEdu = step.type === 'education' && step.topicId;

            if (isEdu && onOpenEducation) {
              return (
                <button
                  key={step.id}
                  onClick={() => onOpenEducation(step.topicId!)}
                  className="rounded-md bg-plum-muted px-2 py-0.5 font-mono text-[11px] text-plum-light hover:bg-plum/20 transition-colors"
                >
                  {t(`steps.${step.id}`)} <span className="text-xp">{t('stepXp', { xp: step.xp })}</span> &rarr;
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
                  className="rounded-md bg-plum-muted px-2 py-0.5 font-mono text-[11px] text-plum-light hover:bg-plum/20 transition-colors"
                >
                  {t(`steps.${step.id}`)} <span className="text-xp">{t('stepXp', { xp: step.xp })}</span> &rarr;
                </a>
              );
            }

            return (
              <span
                key={step.id}
                className="rounded-md bg-surface-hover px-2 py-0.5 font-mono text-[11px] text-text-muted"
              >
                {t(`steps.${step.id}`)} <span className="text-xp">{t('stepXp', { xp: step.xp })}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function JourneyCard({ goals, progressList, onOpenEducation }: Props) {
  const { t } = useTranslation('goals');

  if (goals.length === 0) return null;

  const totalCompleted = progressList.reduce((s, p) => s + p.completed, 0);
  const totalSteps = progressList.reduce((s, p) => s + p.total, 0);
  const percent = totalSteps > 0 ? Math.round((totalCompleted / totalSteps) * 100) : 0;

  const zone = getZone(percent);
  const styles = ZONE_STYLES[zone];
  const statusKey = getStatusKey(percent);
  const motivationKey = getMotivationKey(percent);

  return (
    <div className="card rounded-2xl">
      {/* Header — mixed-font title + status badge */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3>
          <span className="font-display text-[22px] font-bold">{t('journeyTitlePrefix')}</span>
          {' '}
          <span className="font-display text-[22px] font-normal italic text-text-muted">{t('journeyTitleAccent')}</span>
        </h3>
        <span className={`status-badge ${styles.badge}`}>
          {percent}% &middot; {t(`journeyStatus.${statusKey}`)}
        </span>
      </div>

      <p className="mt-1 text-[13px] text-text-muted">{t('journeyXpSubtitle')}</p>

      {/* Explanation box */}
      <div className={`mt-3 rounded-lg px-4 py-3 border ${styles.box}`}>
        <p className={`text-[14px] leading-relaxed ${styles.text}`}>
          {t(`journeyMotivation.${motivationKey}`)}
        </p>
      </div>

      {/* Goal grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {progressList.map((progress) => (
          <GoalCard
            key={progress.goalId}
            progress={progress}
            onOpenEducation={onOpenEducation}
            t={t}
          />
        ))}
      </div>

      {/* CTA */}
      {percent < 100 && (
        <a
          href="/app/jornada"
          className="n2-btn-primary mt-4 block w-full text-center"
        >
          {t('goalCta')}
        </a>
      )}
    </div>
  );
}
