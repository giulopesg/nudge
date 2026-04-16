'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import type { PortfolioBalance } from '@/lib/portfolio';

interface Props {
  portfolio: PortfolioBalance;
}

const TOKEN_COLORS: Record<string, string> = {
  SOL: 'bg-[#9945FF]',
  USDC: 'bg-[#2775CA]',
  USDT: 'bg-[#26A17B]',
  JUP: 'bg-[#FFA726]',
  BONK: 'bg-[#F9A825]',
};

function tokenColor(symbol: string): string {
  return TOKEN_COLORS[symbol] ?? 'bg-plum';
}

function formatUsd(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
}

function formatAmount(amount: number, symbol: string): string {
  if (symbol === 'BONK' || amount >= 1000) {
    return amount.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  }
  if (amount >= 1) {
    return amount.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  }
  return amount.toLocaleString('pt-BR', { maximumFractionDigits: 4 });
}

export default function PortfolioCard({ portfolio }: Props) {
  const { t } = useTranslation('dashboard');

  const stablePercent = portfolio.tokens
    .filter((tok) => tok.isStablecoin)
    .reduce((s, tok) => s + tok.percentOfTotal, 0);

  const topToken = portfolio.tokens[0];
  const isDiversified = !topToken || topToken.percentOfTotal < 60;

  return (
    <div className="card rounded-2xl relative overflow-hidden">
      {/* Watermark */}
      <Image
        src="/portfolio-watermark.png"
        alt=""
        width={180}
        height={90}
        className="pointer-events-none absolute -bottom-2 -right-4 opacity-[0.08]"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-baseline justify-between relative">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
          {t('portfolio.title')}
        </h3>
        <span className="font-display text-lg font-bold text-foreground">
          {formatUsd(portfolio.totalValueUsd)}
        </span>
      </div>

      {/* Token list */}
      <div className="mt-4 space-y-3">
        {portfolio.tokens.map((tok) => (
          <div key={tok.symbol} className="flex items-center gap-3">
            {/* Token icon */}
            <div className={`h-2 w-2 rounded-full flex-shrink-0 ${tokenColor(tok.symbol)}`} />

            {/* Symbol + amount */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs font-semibold text-foreground">
                  {tok.symbol}
                </span>
                <span className="font-mono text-[11px] text-text-secondary truncate">
                  {formatAmount(tok.amount, tok.symbol)}
                </span>
              </div>

              {/* Percentage bar */}
              <div className="mt-1 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-surface-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${tokenColor(tok.symbol)} opacity-80`}
                    style={{ width: `${Math.max(tok.percentOfTotal, 2)}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-text-muted w-10 text-right">
                  {tok.percentOfTotal.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* USD value */}
            <span className="font-mono text-xs text-text-secondary flex-shrink-0">
              {formatUsd(tok.valueUsd)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer metrics */}
      <div className="mt-4 flex items-center justify-between border-t border-surface-border pt-3">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-text-muted">
            {t('portfolio.diversification')}:
          </span>
          <span className={`font-mono text-[10px] font-semibold ${isDiversified ? 'text-safe' : 'text-attention'}`}>
            {isDiversified
              ? t('portfolio.diversified')
              : t('portfolio.concentrated')}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-text-muted">
            {t('portfolio.stableReserve')}:
          </span>
          <span className={`font-mono text-[10px] font-semibold ${stablePercent >= 10 ? 'text-safe' : 'text-attention'}`}>
            {stablePercent.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Concentrated hint */}
      {!isDiversified && (
        <p className="mt-2 text-[11px] text-text-muted leading-relaxed">
          {t('portfolio.concentratedHint')}
        </p>
      )}
    </div>
  );
}
