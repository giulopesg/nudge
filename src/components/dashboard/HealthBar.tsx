'use client';

import type { PositionStatus } from '@/lib/kamino';

interface Props {
  healthFactor: number;
  status: PositionStatus;
}

const GLOW_CLASS: Record<PositionStatus, string> = {
  safe: 'glow-safe',
  attention: 'glow-attention',
  danger: 'glow-danger',
};

const BAR_COLOR: Record<PositionStatus, string> = {
  safe: 'bg-safe',
  attention: 'bg-attention',
  danger: 'bg-danger',
};

export default function HealthBar({ healthFactor, status }: Props) {
  const percent = Math.min(Math.max(((healthFactor - 1) / 1) * 100, 0), 100);

  return (
    <div className="w-full">
      <div className="stat-bar chamfer-sm">
        <div
          className={`stat-bar-fill ${BAR_COLOR[status]} ${GLOW_CLASS[status]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[10px] text-text-muted">
        <span>1.0</span>
        <span className={`text-${status === 'safe' ? 'safe' : status === 'attention' ? 'attention' : 'danger'}`}>
          HF {healthFactor.toFixed(2)}
        </span>
        <span>2.0+</span>
      </div>
    </div>
  );
}
