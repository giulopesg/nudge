'use client';

import { useTranslation } from 'react-i18next';
import type { HealthZone } from '@/lib/portfolio';
import { useECGAnimation } from '@/hooks/useECGAnimation';

interface Props {
  score: number;
  zone: HealthZone;
}

const ZONE_COLORS: Record<HealthZone, string> = {
  safe: 'var(--safe)',
  attention: 'var(--attention)',
  danger: 'var(--danger)',
};

const ZONE_GLOW: Record<HealthZone, string> = {
  safe: 'var(--safe-glow)',
  attention: 'var(--attention-glow)',
  danger: 'var(--danger-glow)',
};

export default function ECGMonitor({ score, zone }: Props) {
  const { t } = useTranslation('dashboard');
  const { canvasRef, containerRef, canvasWidth } = useECGAnimation(zone);

  const color = ZONE_COLORS[zone];
  const glowColor = ZONE_GLOW[zone];

  return (
    <div className="ecg-container w-full">
      <div className="flex items-center gap-4">
        {/* ECG trace area — fills available width */}
        <div
          ref={containerRef}
          className="ecg-monitor relative flex-1 overflow-hidden rounded-lg"
        >
          {/* Background grid */}
          <div className="ecg-grid absolute inset-0" />

          {/* Scanlines overlay */}
          <div className="ecg-scanlines absolute inset-0 pointer-events-none" />

          {/* Canvas trace — responsive width */}
          <canvas
            ref={canvasRef}
            className="relative z-10 block"
            style={{
              width: `${canvasWidth}px`,
              height: '80px',
              filter: `drop-shadow(0 0 6px ${glowColor})`,
            }}
          />
        </div>

        {/* Score value display */}
        <div className="flex flex-shrink-0 flex-col items-center gap-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
            {t('ecg.label')}
          </span>
          <span
            className="font-display text-[28px] font-bold tabular-nums"
            style={{ color, textShadow: `0 0 16px ${glowColor}` }}
          >
            {score}
          </span>
          <span
            className="font-mono text-[12px] font-semibold uppercase tracking-wider"
            style={{ color }}
          >
            {t(`ecg.status.${zone}`)}
          </span>
        </div>
      </div>

      {/* Scale markers */}
      <div className="mt-1.5 flex justify-between font-mono text-[11px] text-text-muted px-1">
        <span>0</span>
        <span>{t('ecg.bpmLabel')}</span>
        <span>100</span>
      </div>
    </div>
  );
}
