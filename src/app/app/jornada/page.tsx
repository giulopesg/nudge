'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { useDashboard } from '@/contexts/DashboardContext';
import JourneyCard from '@/components/dashboard/JourneyCard';
import ActionCards from '@/components/dashboard/ActionCards';
import FirstStepsCard from '@/components/dashboard/FirstStepsCard';
import EducationModal, { type EducationTopicId } from '@/components/dashboard/EducationModal';

export default function JornadaPage() {
  const { t } = useTranslation('dashboard');
  const {
    goals, goalProgressList, commProfile,
    nudgeScore, hasKamino, handleTopicRead,
    hasProfile, portfolio, topicsRead, activities,
    isDemo, requestLyraRecommendation,
  } = useDashboard();

  const hasBalance = (portfolio?.totalValueUsd ?? 0) >= 1;
  const hasExploredLyra = topicsRead.length > 0;
  const hasOnChainRegistration = activities.includes('onchain-register' as never);
  const allFirstStepsDone = hasProfile && hasBalance && hasExploredLyra && hasOnChainRegistration;

  const allGoalsDone = goalProgressList.length > 0
    && goalProgressList.every((p) => p.completed >= p.total);

  const [educationTopic, setEducationTopic] = useState<EducationTopicId | null>(null);

  return (
    <>
      <h1 className="flex items-baseline gap-3">
        <span className="font-display text-[22px] tracking-[0.02em] font-bold">{t('jornada.titlePrefix')}</span>
        <span className="font-display text-[22px] tracking-[0.02em] font-normal italic text-text-muted">{t('jornada.titleAccent')}</span>
      </h1>
      <div className="mt-6 space-y-6">
        {/* 0. First Steps checklist */}
        {!isDemo && !allFirstStepsDone && (
          <FirstStepsCard
            hasProfile={hasProfile}
            hasBalance={hasBalance}
            hasExploredLyra={hasExploredLyra}
            hasOnChainRegistration={hasOnChainRegistration}
            onOpenLyra={requestLyraRecommendation}
          />
        )}

        {/* 1. Journey Card — goal progress */}
        {goals.length > 0 ? (
          <JourneyCard
            goals={goals}
            progressList={goalProgressList}
            onOpenEducation={(topicId) => setEducationTopic(topicId as EducationTopicId)}
          />
        ) : (
          <div className="card rounded-2xl border-primary/20 bg-primary/5 text-center">
            <p className="text-[13px] text-text-muted">
              {!allFirstStepsDone && !isDemo
                ? t('firstSteps.noGoalsYet')
                : t('firstSteps.defineGoals')}
            </p>
            {(allFirstStepsDone || isDemo) && (
              <Link
                href="/onboarding"
                className="mt-2 inline-block font-mono text-[11px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
              >
                {t('firstSteps.defineGoalsCta')} →
              </Link>
            )}
          </div>
        )}

        {/* All goals done — celebration */}
        {allGoalsDone && (
          <div className="card rounded-2xl border-safe/20 bg-safe/5 text-center">
            <p className="font-display text-[17px] font-bold text-safe">
              {t('firstSteps.allGoalsDone')}
            </p>
            <Link
              href="/onboarding?step=goals"
              className="mt-3 inline-block font-mono text-[12px] font-bold uppercase tracking-wider text-safe hover:text-safe/80 transition-colors"
            >
              {t('firstSteps.newGoalsCta')} &rarr;
            </Link>
          </div>
        )}

        {/* 2. Action Cards — LINKS UTEIS */}
        {nudgeScore && (
          <ActionCards
            zone={nudgeScore.zone}
            hasKaminoPosition={hasKamino}
            commProfile={commProfile}
            onOpenEducation={(topicId) => setEducationTopic(topicId)}
          />
        )}
      </div>

      {educationTopic && (
        <EducationModal
          topicId={educationTopic}
          onClose={() => setEducationTopic(null)}
          onTopicRead={handleTopicRead}
        />
      )}
    </>
  );
}
