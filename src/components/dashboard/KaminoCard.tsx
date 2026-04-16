'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
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
    <div className="card rounded-2xl relative overflow-hidden">
      {/* Watermark */}
      <Image
        src="/kamino-watermark.png"
        alt=""
        width={140}
        height={160}
        className="pointer-events-none absolute -bottom-4 -right-2 opacity-[0.08]"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
          {t('kamino.title')}
        </h3>
        <p className="mt-1 text-xs text-text-secondary">
          {t('kamino.subtitleDetail')}
        </p>
      </div>

      {/* Translated message — profile adapted */}
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {translatedMessage}
      </p>

      {/* Details grid with human explanations */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {t('kamino.collateral')}
          </p>
          <p className="mt-1 text-lg font-semibold">
            {fmt(position.totalCollateral)}
          </p>
          {position.collateralDetails.map((d) => (
            <p key={d.symbol} className="font-mono text-xs text-text-secondary">
              {d.amount.toFixed(4)} {d.symbol}
            </p>
          ))}
          <p className="mt-1 text-[11px] italic text-text-muted">
            {t('kamino.explain.collateral')}
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {t('kamino.debt')}
          </p>
          <p className="mt-1 text-lg font-semibold">
            {fmt(position.totalDebt)}
          </p>
          {position.debtDetails.map((d) => (
            <p key={d.symbol} className="font-mono text-xs text-text-secondary">
              {d.amount.toFixed(2)} {d.symbol}
            </p>
          ))}
          <p className="mt-1 text-[11px] italic text-text-muted">
            {t('kamino.explain.debt')}
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {t('kamino.margin')}
          </p>
          <p className="mt-1 text-lg font-semibold">
            {Math.round(position.marginPercent)}%
          </p>
          <p className="mt-1 text-[11px] italic text-text-muted">
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
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {t('kamino.netValue')}
          </p>
          <p className="mt-1 text-lg font-semibold">
            {fmt(position.netValue)}
          </p>
          <p className="mt-1 text-[11px] italic text-text-muted">
            {t('kamino.explain.netValue')}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4 flex gap-2">
        <a
          href="https://app.kamino.finance/lending"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-[11px] font-semibold text-primary hover:bg-primary/20 transition-colors"
        >
          {t('kamino.ctaView')}
        </a>
      </div>
    </div>
  );
}
