'use client';

import { useTranslation } from 'react-i18next';
import type { NeurotageId, GoalId } from '@/lib/neurotags';
import { getProfileActions, getVisibleTraits } from '@/lib/neurotags';
import { buildCharacter } from '@/lib/rpg';
import CharacterCard from '@/components/dashboard/CharacterCard';
import Link from 'next/link';

interface Props {
  neurotags: NeurotageId[];
  goals?: GoalId[];
  onNext?: () => void;
}

export default function ProfileStep({ neurotags, goals = [], onNext }: Props) {
  const { t } = useTranslation('onboarding');
  const tGoals = useTranslation('goals').t;
  const actions = getProfileActions(neurotags);
  const visibleTraits = getVisibleTraits(neurotags);
  const character = buildCharacter(neurotags, ['quiz-complete']);

  return (
    <div className="flex flex-col items-center px-4">
      <h1 className="font-display text-2xl font-bold uppercase tracking-wider">
        {t('profile.title')}
      </h1>
      <p className="mt-2 text-[15px] leading-[1.7] text-text-secondary text-center max-w-md">
        {t('profile.subtitle')}
      </p>

      {/* Character Card (RPG) */}
      <div className="mt-6 w-full max-w-md">
        <CharacterCard character={character} />
      </div>

      {/* Goals chosen */}
      {goals.length > 0 && (
        <div className="mt-4 w-full max-w-md card rounded-xl border-primary/20 bg-primary-muted/30">
          <h3 className="font-mono text-[12px] font-semibold uppercase tracking-[0.15em] text-primary">
            {tGoals('profileGoalsTitle')}
          </h3>
          <p className="mt-1 text-[13px] text-text-muted">{tGoals('profileGoalSelected')}</p>
          <ul className="mt-2 space-y-1">
            {goals.map((goalId) => (
              <li key={goalId} className="flex items-start gap-2 text-[15px] text-foreground">
                <span className="mt-0.5 text-primary text-[13px]">&#9656;</span>
                <span>{tGoals(`options.${goalId}.label`)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What each trait means */}
      <div className="mt-4 w-full max-w-md space-y-2">
        <h3 className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-muted">
          {t('profile.whatItMeans')}
        </h3>
        {visibleTraits.map((tag) => (
          <div key={tag} className="card rounded-lg p-4">
            <span className="font-mono text-[12px] font-semibold text-plum-light tracking-wider">
              {t(`neurotags.${tag}.label`)}
            </span>
            <p className="mt-1 text-[13px] text-text-secondary leading-relaxed">
              {t(`neurotags.${tag}.description`)}
            </p>
          </div>
        ))}
      </div>

      {/* Nudge actions */}
      <div className="mt-4 w-full max-w-md card rounded-xl border-primary/20 bg-primary-muted/50">
        <h3 className="font-mono text-[12px] font-semibold uppercase tracking-[0.15em] text-primary">
          {t('profile.nudgeWill')}
        </h3>
        <ul className="mt-3 space-y-2">
          {actions.map((action) => (
            <li key={action} className="flex items-start gap-2 text-[15px] text-foreground">
              <span className="mt-0.5 text-primary text-[13px]">&#9656;</span>
              <span>{t(`profile.actions.${action}`)}</span>
            </li>
          ))}
        </ul>
      </div>

      {onNext ? (
        <button
          onClick={onNext}
          className="n2-btn-primary mt-8"
        >
          {t('profile.goToDashboard')}
        </button>
      ) : (
        <Link
          href="/app"
          className="n2-btn-primary mt-8 inline-block"
        >
          {t('profile.goToDashboard')}
        </Link>
      )}
    </div>
  );
}
