'use client';

import { useTranslation } from 'react-i18next';
import type { HealthZone } from '@/lib/portfolio';

interface Props {
  score: number;
  status: HealthZone;
}

const STATUS_COLORS: Record<HealthZone, string> = {
  safe: 'var(--safe)',
  attention: 'var(--attention)',
  danger: 'var(--danger)',
};

const CIRCUMFERENCE = 2 * Math.PI * 62;

export default function ScoreRing({ score, status }: Props) {
  const { t } = useTranslation('dashboard');
  const color = STATUS_COLORS[status];
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <defs>
          <filter id="score-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Background circle */}
        <circle
          cx="80" cy="80" r="62"
          fill="none"
          stroke="rgba(255,248,245,0.04)"
          strokeWidth="8"
        />
        {/* Progress arc */}
        <circle
          cx="80" cy="80" r="62"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 80 80)"
          filter="url(#score-glow)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center -mt-1">
        <span
          className="font-display text-[40px] leading-none font-bold"
          style={{ color, textShadow: `0 0 16px ${color}` }}
        >
          {score}
        </span>
        <span className="mt-1 font-mono text-[10px] tracking-[0.10em] text-text-muted">
          {t('hero.scoreLabel')}
        </span>
      </div>
    </div>
  );
}
