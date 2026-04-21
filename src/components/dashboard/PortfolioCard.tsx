'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from '@solana/wallet-adapter-react';
import type { PortfolioBalance } from '@/lib/portfolio';
import type { DemoPersona } from '@/lib/demo';
import WalletManageModal from '@/components/dashboard/WalletManageModal';

interface Props {
  portfolio: PortfolioBalance;
  persona?: DemoPersona | null;
}

const TOKEN_COLORS: Record<string, string> = {
  SOL: '#9945FF',
  USDC: '#2775CA',
  USDT: '#26A17B',
  JUP: '#FFA726',
  BONK: '#F9A825',
};

function tokenColor(symbol: string): string {
  return TOKEN_COLORS[symbol] ?? '#A366FF';
}

function tokenBgClass(symbol: string): string {
  const map: Record<string, string> = {
    SOL: 'bg-[#9945FF]',
    USDC: 'bg-[#2775CA]',
    USDT: 'bg-[#26A17B]',
    JUP: 'bg-[#FFA726]',
    BONK: 'bg-[#F9A825]',
  };
  return map[symbol] ?? 'bg-plum';
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

export default function PortfolioCard({ portfolio, persona }: Props) {
  const { t } = useTranslation('dashboard');
  const { publicKey } = useWallet();
  const [walletModal, setWalletModal] = useState<'add' | 'remove' | null>(null);
  const connectedWallets = persona?.wallets ?? (publicKey ? [publicKey.toBase58()] : []);

  const stablePercent = portfolio.tokens
    .filter((tok) => tok.isStablecoin)
    .reduce((s, tok) => s + tok.percentOfTotal, 0);

  const topToken = portfolio.tokens[0];
  const isDiversified = !topToken || topToken.percentOfTotal < 60;

  return (
    <>
      <div className="card rounded-2xl">
        {/* Header — mixed-font inline */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3>
            <span className="font-display text-[22px] font-bold">{t('portfolio.titlePrefix')}</span>
            {' '}
            <span className="font-display text-[22px] font-normal italic text-text-muted">{t('portfolio.titleAccent')}</span>
          </h3>
          <span className="font-display text-[22px] sm:text-[28px] font-bold text-foreground">
            {formatUsd(portfolio.totalValueUsd)}
          </span>
        </div>

        {/* Token grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {portfolio.tokens.map((tok) => (
            <div
              key={tok.symbol}
              className="rounded-xl bg-surface-hover/50 p-3 border border-surface-border/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${tokenBgClass(tok.symbol)}`} />
                <span className="font-mono text-[13px] font-semibold text-foreground">
                  {tok.symbol}
                </span>
                <span className="ml-auto font-mono text-[12px] text-text-muted">
                  {tok.percentOfTotal.toFixed(1)}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    {t('portfolio.amountLabel')}
                  </p>
                  <p className="font-mono text-[14px] font-semibold text-text-secondary">
                    {formatAmount(tok.amount, tok.symbol)}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    {t('portfolio.usdLabel')}
                  </p>
                  <p className="font-mono text-[14px] font-semibold text-text-secondary">
                    {formatUsd(tok.valueUsd)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Composition bar */}
        <div className="mt-4">
          <p className="font-display text-[12px] font-medium uppercase tracking-[0.04em] text-text-muted mb-2">
            {t('portfolio.compositionTitle')}
          </p>
          <div className="portfolio-bar">
            {portfolio.tokens.map((tok) => (
              <div
                key={tok.symbol}
                className="portfolio-bar-segment"
                style={{
                  width: `${Math.max(tok.percentOfTotal, 1)}%`,
                  backgroundColor: tokenColor(tok.symbol),
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer metrics */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          <div>
            <p className="font-display text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.04em] text-text-muted">
              {t('portfolio.diversification')}
            </p>
            <p className={`mt-1 font-display text-[18px] sm:text-[22px] font-bold ${isDiversified ? 'text-safe' : 'text-attention'}`}>
              {isDiversified
                ? t('portfolio.diversified')
                : t('portfolio.concentrated')}
            </p>
          </div>
          <div>
            <p className="font-display text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.04em] text-text-muted">
              {t('portfolio.stableReserve')}
            </p>
            <p className={`mt-1 font-display text-[18px] sm:text-[22px] font-bold ${stablePercent >= 10 ? 'text-safe' : 'text-attention'}`}>
              {stablePercent.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Concentrated hint */}
        {!isDiversified && (
          <p className="mt-2 text-[13px] text-text-muted leading-relaxed">
            {t('portfolio.concentratedHint')}
          </p>
        )}

        {/* Wallet buttons — differentiated */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setWalletModal('add')}
            className="n2-btn-primary flex-1 text-[12px]"
          >
            {t('portfolio.addWallet')}
          </button>
          <button
            onClick={() => setWalletModal('remove')}
            className="flex-1 rounded-full border border-surface-border px-4 py-2.5 text-[12px] font-medium uppercase tracking-wider text-text-muted hover:border-danger/40 hover:text-danger hover:bg-danger-bg transition-all cursor-pointer"
          >
            {t('portfolio.removeWallet')}
          </button>
        </div>
      </div>

      {walletModal && (
        <WalletManageModal mode={walletModal} onClose={() => setWalletModal(null)} wallets={connectedWallets} />
      )}
    </>
  );
}
