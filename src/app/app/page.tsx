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
import AlertModal from '@/components/dashboard/AlertModal';
import EducationModal, { type EducationTopicId } from '@/components/dashboard/EducationModal';

export default function PainelPage() {
  const { t } = useTranslation();
  const tDash = useTranslation('dashboard').t;
  const searchParams = useSearchParams();
  const demoParam = searchParams.get('demo');
  const qs = demoParam ? `?demo=${demoParam}` : '';

  const { i18n } = useTranslation();
  const {
    data, isDemo, persona, commProfile, character,
    nudgeScore, portfolio, kaminoPosition, healthFactor, hasKamino,
    nudges, unreadCount,
    neurotags, handleTopicRead,
    requestLyraRecommendation,
    showData,
  } = useDashboard();

  const greetingName = persona
    ? tDash(`demo.personas.${persona.id}.name`)
    : character?.class.title ?? null;
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
        <h1>
          <span className="font-display text-[22px] font-bold">{tDash('titlePrefix')}</span>
          {' '}
          <span className="font-display text-[22px] font-normal italic text-text-muted">{tDash('titleAccent')}</span>
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
        {/* 0. Empty state — wallet connected but no balance */}
        {!nudgeScore && showData && portfolio && portfolio.totalValueUsd < 1 && (
          <div className="card rounded-2xl border-primary/20 bg-primary/5 text-center">
            <p className="font-display text-[17px] font-bold text-text-secondary">
              {tDash('emptyState.titlePrefix')}{' '}
              <span className="text-primary">{tDash('emptyState.titleAccent')}</span>
            </p>
            <p className="mt-2 text-[13px] text-text-muted">
              {tDash('emptyState.subtitle')}
            </p>
            <div className="mt-4 text-left">
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                {tDash('emptyState.nextSteps')}
              </p>
              <ul className="mt-2 space-y-1.5 font-mono text-[12px] text-text-muted">
                <li>{tDash('emptyState.step1')}</li>
                <li>{tDash('emptyState.step2')}</li>
                <li>{tDash('emptyState.step3')}</li>
              </ul>
            </div>
          </div>
        )}

        {/* 1. Status Hero */}
        {nudgeScore && (
          <StatusHero
            nudgeScore={nudgeScore}
            commProfile={commProfile}
            healthFactor={healthFactor}
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

        {/* 3. Onboarding CTA */}
        {!isDemo && neurotags.length === 0 && (
          <Link
            href="/onboarding"
            className="block card rounded-2xl border-plum/30 bg-plum-muted text-center transition-colors hover:bg-plum-muted/80"
          >
            <p className="font-display text-[13px] font-bold uppercase tracking-wider text-plum-light">
              {t('onboarding.title')}
            </p>
            <p className="mt-1 text-[13px] text-text-secondary">
              {t('onboarding.subtitle')}
            </p>
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
