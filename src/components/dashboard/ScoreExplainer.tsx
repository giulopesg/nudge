'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { NudgeScoreMetrics, HealthZone } from '@/lib/portfolio';
import type { CommProfile } from '@/lib/communication';

interface Props {
  overall: number;
  zone: HealthZone;
  metrics: NudgeScoreMetrics;
  commProfile: CommProfile;
  hasKamino: boolean;
  onLearnMore: () => void;
}

interface MetricRow {
  key: string;
  metricKey: keyof typeof METRIC_LABELS;
  value: number;
}

const METRIC_LABELS = {
  diversification: 'diversification',
  stablecoinRatio: 'stablecoinRatio',
  concentrationRisk: 'concentrationRisk',
  kaminoHealth: 'kaminoHealth',
} as const;

function getLevel(score: number): 'good' | 'ok' | 'bad' {
  if (score >= 70) return 'good';
  if (score >= 40) return 'ok';
  return 'bad';
}

const LEVEL_COLORS = {
  good: 'bg-safe',
  ok: 'bg-attention',
  bad: 'bg-danger',
};

const LEVEL_TEXT_COLORS = {
  good: 'text-safe',
  ok: 'text-attention',
  bad: 'text-danger',
};

export default function ScoreExplainer({
  overall,
  zone,
  metrics,
  commProfile,
  hasKamino,
  onLearnMore,
}: Props) {
  const { t } = useTranslation('score');
  const [expanded, setExpanded] = useState(false);

  const introKey = zone === 'safe' ? 'high' : zone === 'attention' ? 'medium' : 'low';

  const rows: MetricRow[] = [
    { key: 'diversification', metricKey: 'diversification', value: metrics.diversificationScore },
    { key: 'stablecoinRatio', metricKey: 'stablecoinRatio', value: metrics.stablecoinRatio },
    { key: 'concentrationRisk', metricKey: 'concentrationRisk', value: metrics.concentrationRisk },
  ];

  if (hasKamino) {
    rows.push({ key: 'kaminoHealth', metricKey: 'kaminoHealth', value: metrics.kaminoHealthScore });
  }

  return (
    <div className="mt-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="mx-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted hover:text-text-secondary transition-colors"
      >
        <span className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
          &#9660;
        </span>
        {t('explainerToggle')}
      </button>

      {expanded && (
        <div className="mt-4 rounded-xl border border-surface-border bg-surface/50 p-4 animate-sheet-enter">
          <p className="text-sm text-text-secondary leading-relaxed">
            {t(`explainerIntro.${introKey}`, { score: overall })}
          </p>

          <div className="mt-4 space-y-3">
            {rows.map((row) => {
              const level = getLevel(row.value);
              return (
                <div key={row.key}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                      {t(`metrics.${row.metricKey}.label`)}
                    </span>
                    <span className={`font-mono text-xs font-bold ${LEVEL_TEXT_COLORS[level]}`}>
                      {row.value}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-1 h-1.5 w-full rounded-full bg-surface-border overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${LEVEL_COLORS[level]}`}
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                  <p className="mt-0.5 text-[10px] text-text-muted">
                    {t(`metrics.${row.metricKey}.${level}`)}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={onLearnMore}
            className="mt-4 font-mono text-[10px] uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
          >
            {t('improveLink')} &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
