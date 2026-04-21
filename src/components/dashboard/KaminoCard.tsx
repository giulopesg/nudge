'use client';

import { useTranslation } from 'react-i18next';
import type { KaminoPosition } from '@/lib/kamino';
import type { CommProfile } from '@/lib/communication';

interface Props {
  position: KaminoPosition;
  commProfile: CommProfile;
}

function marginQualifier(percent: number): string {
  if (percent >= 80) return 'marginGood';
  if (percent >= 40) return 'marginOk';
  return 'marginTight';
}

const STATUS_BADGE: Record<string, string> = {
  safe: 'status-badge status-safe',
  attention: 'status-badge status-attention',
  danger: 'status-badge status-danger',
};

const STATUS_BG: Record<string, string> = {
  safe: 'bg-safe/5 border border-safe/15',
  attention: 'bg-attention/5 border border-attention/15',
  danger: 'bg-danger/5 border border-danger/15',
};

const ACCENT_COLOR: Record<string, string> = {
  safe: 'text-safe',
  attention: 'text-attention',
  danger: 'text-danger',
};

export default function KaminoCard({ position, commProfile }: Props) {
  const { t } = useTranslation('dashboard');

  const translatedMessage = t(
    `kamino.translated.${position.status}.${commProfile}`,
    {
      margin: Math.round(position.marginPercent),
      hf: position.healthFactor.toFixed(2),
    },
  );

  const fmt = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });

  return (
    <div className="card rounded-2xl">
      {/* Header — mixed-font inline + badge */}
      <div className="flex items-center justify-between">
        <h3 className="flex items-baseline gap-3">
          <span className="font-display text-[22px] tracking-[0.02em] font-bold">{t('kamino.titlePrefix')}</span>
          <span className="font-display text-[22px] tracking-[0.02em] font-normal italic text-text-muted">{t('kamino.titleAccent')}</span>
        </h3>
        <span className={STATUS_BADGE[position.status]}>
          {t(`status.${position.status}`)}
        </span>
      </div>

      {/* Explanation box */}
      <div className={`mt-4 rounded-xl p-4 ${STATUS_BG[position.status]}`}>
        <p className="font-display text-[16px] leading-[1.7] text-text-secondary">
          {translatedMessage}
        </p>
        <p className={`mt-2 font-accent text-[19px] ${ACCENT_COLOR[position.status]}`}>
          {t(`kamino.explanationAccent.${position.status}`)}
        </p>
      </div>

      {/* Health Factor highlight */}
      <div className="mt-4 flex items-center justify-between rounded-xl border border-surface-border/60 px-4 py-3">
        <p className="font-display text-[13px] font-medium uppercase tracking-[0.04em] text-text-muted">
          {t('kamino.healthFactor')}
        </p>
        <p className={`font-display text-[28px] sm:text-[32px] font-bold ${ACCENT_COLOR[position.status]}`}>
          {position.healthFactor.toFixed(2)}
        </p>
      </div>

      {/* Details grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <p className="font-display text-[13px] font-medium uppercase tracking-[0.04em] text-text-muted">
            {t('kamino.collateral')}
          </p>
          <p className="mt-1 font-display text-[22px] sm:text-[28px] font-bold text-safe">
            {fmt(position.totalCollateral)}
          </p>
          {position.collateralDetails.map((d) => (
            <p key={d.symbol} className="font-mono text-[12px] text-text-muted">
              {d.amount.toFixed(4)} {d.symbol}
            </p>
          ))}
        </div>

        <div>
          <p className="font-display text-[13px] font-medium uppercase tracking-[0.04em] text-text-muted">
            {t('kamino.debt')}
          </p>
          <p className="mt-1 font-display text-[22px] sm:text-[28px] font-bold">
            {fmt(position.totalDebt)}
          </p>
          {position.debtDetails.map((d) => (
            <p key={d.symbol} className="font-mono text-[12px] text-text-muted">
              {d.amount.toFixed(2)} {d.symbol}
            </p>
          ))}
        </div>

        <div>
          <p className="font-display text-[13px] font-medium uppercase tracking-[0.04em] text-text-muted">
            {t('kamino.margin')}
          </p>
          <p className={`mt-1 font-display text-[22px] sm:text-[28px] font-bold ${
            position.marginPercent >= 80 ? 'text-safe' :
            position.marginPercent >= 40 ? 'text-attention' :
            'text-danger'
          }`}>
            {Math.round(position.marginPercent)}%
          </p>
          <p className="mt-1 font-mono text-[12px] text-text-muted">
            {t('kamino.explain.margin')}
            {' — '}
            <span className={
              position.marginPercent >= 80 ? 'text-safe' :
              position.marginPercent >= 40 ? 'text-attention' :
              'text-danger'
            }>
              {t(`kamino.explain.${marginQualifier(position.marginPercent)}`)}
            </span>
          </p>
        </div>

        <div>
          <p className="font-display text-[13px] font-medium uppercase tracking-[0.04em] text-text-muted">
            {t('kamino.netValue')}
          </p>
          <p className="mt-1 font-display text-[22px] sm:text-[28px] font-bold">
            {fmt(position.netValue)}
          </p>
          <p className="mt-1 font-mono text-[12px] text-text-muted">
            {t('kamino.explain.netValue')}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-5">
        <a
          href="https://app.kamino.finance/lending"
          target="_blank"
          rel="noopener noreferrer"
          className="n2-btn-primary inline-block"
        >
          {t('kamino.ctaView')}
        </a>
      </div>
    </div>
  );
}
