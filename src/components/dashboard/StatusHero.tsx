'use client';

import { useTranslation } from 'react-i18next';
import ECGMonitor from '@/components/dashboard/ECGMonitor';
import ScoreExplainer from '@/components/dashboard/ScoreExplainer';
import ScoreRing from '@/components/dashboard/ScoreRing';
import LyraAvatar from '@/components/dashboard/LyraAvatar';
import type { HealthZone, NudgeScore } from '@/lib/portfolio';
import type { CommProfile } from '@/lib/communication';
import { useDashboard } from '@/contexts/DashboardContext';
import { genderSuffix } from '@/lib/neurotags';

interface Props {
  nudgeScore: NudgeScore;
  commProfile: CommProfile;
  hasKamino: boolean;
  onLearnScore: () => void;
  onRequestRecommendation?: () => void;
}

const ZONE_STYLES: Record<HealthZone, string> = {
  safe: 'status-hero-safe',
  attention: 'status-hero-attention',
  danger: 'status-hero-danger',
};

export default function StatusHero({ nudgeScore, commProfile, hasKamino, onLearnScore, onRequestRecommendation }: Props) {
  const { t } = useTranslation('dashboard');
  const { gender } = useDashboard();
  const suffix = genderSuffix(gender);

  const { zone, overall, metrics } = nudgeScore;

  return (
    <div className={`relative p-6 sm:p-10 ${ZONE_STYLES[zone]}`}>
      {/* Lyra "ask for a tip" button — top right */}
      {onRequestRecommendation && (
        <button
          onClick={onRequestRecommendation}
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-muted/60 px-2.5 py-1 hover:bg-primary/20 transition-colors group"
          aria-label={t('lyra.recommend.buttonLabel')}
        >
          <LyraAvatar size={20} />
          <span className="font-mono text-[10px] text-primary group-hover:text-foreground transition-colors">
            {t('lyra.recommend.buttonLabel')}
          </span>
        </button>
      )}

      <div className="text-center">
        {/* Score Ring */}
        <ScoreRing score={overall} status={zone} />

        {/* Mixed-font title */}
        <h2 className="mt-3 sm:mt-4 flex items-baseline justify-center gap-3">
          <span className="font-display text-[22px] sm:text-[28px] tracking-[0.02em] font-bold">
            {t(`hero.score.${zone}.titlePrefix.${commProfile}`)}
          </span>
          <span className="font-display text-[22px] sm:text-[28px] tracking-[0.02em] font-normal italic text-foreground">
            {t(`hero.score.${zone}.titleAccent.${commProfile}`)}
          </span>
        </h2>
        <p className="mt-2 text-[14px] sm:text-[15px] text-text-secondary leading-relaxed">
          {t(`hero.score.${zone}.subtitle.${commProfile}`, { score: overall, suffix })}
        </p>
      </div>

      {/* ECG heartbeat — Nudge Score pulse */}
      <div className="mt-4 sm:mt-5">
        <ECGMonitor score={overall} zone={zone} />
      </div>

      {/* Score Explainer — inline toggle */}
      <ScoreExplainer
        overall={overall}
        zone={zone}
        metrics={metrics}
        commProfile={commProfile}
        hasKamino={hasKamino}
        onLearnMore={onLearnScore}
      />
    </div>
  );
}
