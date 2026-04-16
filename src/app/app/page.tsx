'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useDashboard } from '@/contexts/DashboardContext';
import StatusHero from '@/components/dashboard/StatusHero';
import PortfolioCard from '@/components/dashboard/PortfolioCard';
import KaminoCard from '@/components/dashboard/KaminoCard';
import BeginnerKaminoCard from '@/components/dashboard/BeginnerKaminoCard';
import EducationModal, { type EducationTopicId } from '@/components/dashboard/EducationModal';

export default function PainelPage() {
  const { t } = useTranslation();
  const tDash = useTranslation('dashboard').t;
  const searchParams = useSearchParams();
  const demoParam = searchParams.get('demo');
  const qs = demoParam ? `?demo=${demoParam}` : '';

  const {
    data, isDemo, persona, commProfile,
    nudgeScore, portfolio, kaminoPosition, healthFactor, hasKamino,
    unreadCount,
    neurotags, handleTopicRead,
  } = useDashboard();

  const [educationTopic, setEducationTopic] = useState<EducationTopicId | null>(null);

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-lg font-bold uppercase tracking-wider">
          {tDash('title')}
        </h1>
        {isDemo && persona && (
          <span className="demo-badge chamfer-sm">
            {tDash(`demo.personas.${persona.id}.name`)}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-text-secondary">{tDash('subtitle')}</p>

      <div className="mt-6 space-y-4">
        {/* 1. Status Hero */}
        {nudgeScore && (
          <StatusHero
            nudgeScore={nudgeScore}
            commProfile={commProfile}
            healthFactor={healthFactor}
            onLearnScore={() => setEducationTopic('whatIsNudgeScore')}
          />
        )}

        {/* 2. Mini-link to alertas */}
        {unreadCount > 0 && (
          <Link
            href={`/app/alertas${qs}`}
            className="block rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-center font-mono text-xs text-primary hover:bg-primary/10 transition-colors"
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
            <p className="font-display text-xs font-bold uppercase tracking-wider text-plum-light">
              {t('onboarding.title')}
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              {t('onboarding.subtitle')}
            </p>
          </Link>
        )}

        {/* 4. Portfolio Card */}
        {portfolio && <PortfolioCard portfolio={portfolio} />}

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

        {/* Timestamp */}
        {data?.position.timestamp && (
          <p className="text-center font-mono text-[10px] text-text-muted tracking-wider">
            {tDash('lastUpdate', {
              time: new Date(data.position.timestamp).toLocaleTimeString('pt-BR'),
            })}
          </p>
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
