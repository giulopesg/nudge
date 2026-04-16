'use client';

import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { PositionStatus } from '@/lib/kamino';
import { useECGAnimation } from '@/hooks/useECGAnimation';

interface Props {
  healthFactor: number;
  status: PositionStatus;
}

const STATUS_COLORS: Record<PositionStatus, string> = {
  safe: 'var(--safe)',
  attention: 'var(--attention)',
  danger: 'var(--danger)',
};

const STATUS_GLOW: Record<PositionStatus, string> = {
  safe: 'var(--safe-glow)',
  attention: 'var(--attention-glow)',
  danger: 'var(--danger-glow)',
};

const ECG_WIDTH = 320;
const ECG_HEIGHT = 80;

export default function ECGMonitor({ healthFactor, status }: Props) {
  const { t } = useTranslation('dashboard');
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasRef } = useECGAnimation(status, ECG_WIDTH, ECG_HEIGHT);

  // Handle canvas DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = ECG_WIDTH * dpr;
    canvas.height = ECG_HEIGHT * dpr;
    canvas.style.width = `${ECG_WIDTH}px`;
    canvas.style.height = `${ECG_HEIGHT}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, [canvasRef]);

  const color = STATUS_COLORS[status];
  const glowColor = STATUS_GLOW[status];

  return (
    <div ref={containerRef} className="ecg-container w-full">
      <div className="flex items-center gap-4">
        {/* ECG trace area */}
        <div className="ecg-monitor relative flex-1 overflow-hidden chamfer-sm">
          {/* Background grid */}
          <div className="ecg-grid absolute inset-0" />

          {/* Scanlines overlay */}
          <div className="ecg-scanlines absolute inset-0 pointer-events-none" />

          {/* Canvas trace */}
          <canvas
            ref={canvasRef}
            className="relative z-10 block w-full"
            style={{
              filter: `drop-shadow(0 0 6px ${glowColor})`,
            }}
          />
        </div>

        {/* HF value display */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
            {t('ecg.label')}
          </span>
          <span
            className="font-display text-2xl font-bold tabular-nums"
            style={{ color, textShadow: `0 0 16px ${glowColor}` }}
          >
            {healthFactor.toFixed(2)}
          </span>
          <span
            className="font-mono text-[10px] font-semibold uppercase tracking-wider"
            style={{ color }}
          >
            {t(`ecg.status.${status}`)}
          </span>
        </div>
      </div>

      {/* Scale markers */}
      <div className="mt-1.5 flex justify-between font-mono text-[9px] text-text-muted px-1">
        <span>1.0</span>
        <span>{t('ecg.bpmLabel')}</span>
        <span>2.0+</span>
      </div>
    </div>
  );
}
