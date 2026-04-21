'use client';

import { useTranslation } from 'react-i18next';
import ECGMonitor from '@/components/dashboard/ECGMonitor';
import ScoreExplainer from '@/components/dashboard/ScoreExplainer';
import ScoreRing from '@/components/dashboard/ScoreRing';
import type { HealthZone, NudgeScore } from '@/lib/portfolio';
import type { CommProfile } from '@/lib/communication';

interface Props {
  nudgeScore: NudgeScore;
  commProfile: CommProfile;
  healthFactor: number | undefined;
  onLearnScore: () => void;
}

const ZONE_STYLES: Record<HealthZone, string> = {
  safe: 'status-hero-safe',
  attention: 'status-hero-attention',
  danger: 'status-hero-danger',
};

export default function StatusHero({ nudgeScore, commProfile, healthFactor, onLearnScore }: Props) {
  const { t } = useTranslation('dashboard');

  const { zone, overall, metrics } = nudgeScore;

  return (
    <div className={`p-6 sm:p-10 ${ZONE_STYLES[zone]}`}>
      <div className="text-center">
        {/* Score Ring */}
        <ScoreRing score={overall} status={zone} />

        {/* Mixed-font title */}
        <h2 className="mt-3 sm:mt-4">
          <span className="font-display text-[22px] sm:text-[28px] font-bold">
            {t(`hero.score.${zone}.titlePrefix.${commProfile}`)}
          </span>
          {' '}
          <span className="font-accent text-[26px] sm:text-[34px] italic font-bold text-foreground">
            {t(`hero.score.${zone}.titleAccent.${commProfile}`)}
          </span>
        </h2>
        <p className="mt-2 text-[14px] sm:text-[15px] text-text-secondary leading-relaxed">
          {t(`hero.score.${zone}.subtitle.${commProfile}`, { score: overall })}
        </p>
      </div>

      {/* ECG monitor — only when Kamino HF exists */}
      {healthFactor !== undefined && (
        <div className="mt-4">
          <ECGMonitor healthFactor={healthFactor} status={zone} />
        </div>
      )}

      {/* Score Explainer — inline toggle */}
      <ScoreExplainer
        overall={overall}
        zone={zone}
        metrics={metrics}
        commProfile={commProfile}
        hasKamino={healthFactor !== undefined}
        onLearnMore={onLearnScore}
      />
    </div>
  );
}
