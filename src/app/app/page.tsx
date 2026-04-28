'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useDashboard } from '@/contexts/DashboardContext';
import StatusHero from '@/components/dashboard/StatusHero';
import PortfolioCard from '@/components/dashboard/PortfolioCard';
import KaminoCard from '@/components/dashboard/KaminoCard';
import BeginnerKaminoCard from '@/components/dashboard/BeginnerKaminoCard';
import AddIntegrationCard from '@/components/dashboard/AddIntegrationCard';
import FirstStepsCard from '@/components/dashboard/FirstStepsCard';
import AlertModal from '@/components/dashboard/AlertModal';
import EducationModal, { type EducationTopicId } from '@/components/dashboard/EducationModal';

export default function PainelPage() {
  const tDash = useTranslation('dashboard').t;
  const searchParams = useSearchParams();
  const demoParam = searchParams.get('demo');
  const qs = demoParam ? `?demo=${demoParam}` : '';

  const { i18n } = useTranslation();
  const {
    data, isDemo, persona, commProfile, character,
    nudgeScore, portfolio, kaminoPosition, healthFactor, hasKamino,
    nudges, unreadCount,
    handleTopicRead,
    requestLyraRecommendation,
    topicsRead, activities, hasProfile,
  } = useDashboard();

  const hasBalance = (portfolio?.totalValueUsd ?? 0) >= 1;
  const hasExploredLyra = topicsRead.length > 0;
  const hasOnChainRegistration = activities.includes('onchain-register' as never);
  const allFirstStepsDone = hasProfile && hasBalance && hasExploredLyra && hasOnChainRegistration;

  const { gender } = useDashboard();
  const greetingName = persona
    ? tDash(`demo.personas.${persona.id}.name`)
    : character ? tDash(`classes.${character.class.name}_${gender}`) : null;
  const todayDate = useMemo(() => {
    const locale = i18n.language === 'pt-BR' ? 'pt-BR' : 'en-US';
    return new Date().toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  }, [i18n.language]);

  const [educationTopic, setEducationTopic] = useState<EducationTopicId | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(true);

  const hasUrgentUnread = nudges.some((n) => !n.read && n.severity === 'urgent');
  const shouldShowAlertModal = showAlertModal && unreadCount > 0 && hasUrgentUnread;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="flex items-baseline gap-3">
          <span className="font-display text-[22px] tracking-[0.02em] font-bold">{tDash('titlePrefix')}</span>
          <span className="font-display text-[22px] tracking-[0.02em] font-normal italic text-text-muted">{tDash('titleAccent')}</span>
        </h1>
        {isDemo && persona && (
          <span className="n2-btn-ghost !py-1.5 !px-4 !text-[11px] !tracking-[0.08em] uppercase !text-xp !border-xp/30">
            {tDash(`demo.personas.${persona.id}.name`)}
          </span>
        )}
      </div>

      {/* Greeting + date */}
      <div className="mt-5 flex items-baseline justify-between">
        <p className="font-display text-[17px] text-text-secondary">
          {greetingName
            ? tDash('greeting.withName', { name: greetingName })
            : tDash('greeting.withoutName')}
        </p>
        <p className="font-mono text-[11px] text-text-muted tracking-wider">{todayDate}</p>
      </div>

      <div className="mt-4 space-y-6">
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

        {/* 1. Status Hero */}
        {nudgeScore && (
          <StatusHero
            nudgeScore={nudgeScore}
            commProfile={commProfile}
            hasKamino={healthFactor !== undefined}
            onLearnScore={() => setEducationTopic('whatIsNudgeScore')}
            onRequestRecommendation={requestLyraRecommendation}
          />
        )}

        {/* 2. Mini-link to alertas */}
        {unreadCount > 0 && (
          <Link
            href={`/app/alertas${qs}`}
            className="block rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-center font-mono text-[13px] text-primary hover:bg-primary/10 transition-colors"
          >
            {tDash('alertas.miniLink', { count: unreadCount })}
          </Link>
        )}


        {/* 4. Portfolio Card */}
        {portfolio && <PortfolioCard portfolio={portfolio} persona={persona} />}

        {/* 5. Kamino Card */}
        {kaminoPosition && (
          <KaminoCard position={kaminoPosition} commProfile={commProfile} />
        )}

        {/* 6. Beginner Kamino Card */}
        {!hasKamino && (
          <BeginnerKaminoCard
            commProfile={commProfile}
            onLearnKamino={() => setEducationTopic('whatIsKamino')}
          />
        )}

        {/* 7. Integration placeholder */}
        <AddIntegrationCard />

        {/* Timestamp */}
        {data?.position.timestamp && (
          <p className="text-center font-mono text-[12px] text-text-muted tracking-wider">
            {tDash('lastUpdate', {
              time: new Date(data.position.timestamp).toLocaleTimeString('pt-BR'),
            })}
          </p>
        )}
      </div>

      {shouldShowAlertModal && (
        <AlertModal
          nudges={nudges}
          alertsHref={`/app/alertas${qs}`}
          onClose={() => setShowAlertModal(false)}
        />
      )}

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
