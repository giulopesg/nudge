'use client';

import { useTranslation } from 'react-i18next';
import ECGMonitor from '@/components/dashboard/ECGMonitor';
import ScoreExplainer from '@/components/dashboard/ScoreExplainer';
import type { HealthZone, NudgeScore } from '@/lib/portfolio';
import type { CommProfile } from '@/lib/communication';

interface Props {
  nudgeScore: NudgeScore;
  commProfile: CommProfile;
  healthFactor: number | undefined;
  onLearnScore: () => void;
}

const ZONE_STYLES: Record<HealthZone, string> = {
  safe: 'status-hero-safe text-safe text-shadow-[0_0_20px_var(--safe-glow)]',
  attention: 'status-hero-attention text-attention text-shadow-[0_0_20px_var(--attention-glow)]',
  danger: 'status-hero-danger text-danger text-shadow-[0_0_20px_var(--danger-glow)]',
};

const SCORE_COLOR: Record<HealthZone, string> = {
  safe: 'text-safe',
  attention: 'text-attention',
  danger: 'text-danger',
};

export default function StatusHero({ nudgeScore, commProfile, healthFactor, onLearnScore }: Props) {
  const { t } = useTranslation('dashboard');

  const { zone, overall, metrics } = nudgeScore;

  return (
    <div className={`rounded-2xl px-6 py-6 ${ZONE_STYLES[zone]}`}>
      <div className="text-center">
        {/* Score number */}
        <div className={`font-display text-5xl font-bold tabular-nums ${SCORE_COLOR[zone]}`}>
          {overall}
        </div>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          {t('hero.scoreLabel')}
        </p>

        {/* Profile-adapted title */}
        <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wider sm:text-3xl">
          {t(`hero.score.${zone}.title.${commProfile}`)}
        </h2>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
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
