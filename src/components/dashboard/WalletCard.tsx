'use client';

import { useTranslation } from 'react-i18next';
import type { WalletBalance } from '@/lib/kamino';

interface Props {
  balance: WalletBalance;
}

export default function WalletCard({ balance }: Props) {
  const { t } = useTranslation('dashboard');

  return (
    <div className="card chamfer-md">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
        {t('wallet.title')}
      </h3>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-xl font-bold font-mono">
          {balance.solBalance.toFixed(4)}
        </span>
        <span className="font-mono text-sm text-primary">SOL</span>
      </div>

      {balance.solValueUsd > 0 && (
        <p className="mt-1 font-mono text-xs text-text-muted">
          {t('wallet.solValue', { value: balance.solValueUsd.toFixed(2) })}
        </p>
      )}
    </div>
  );
}
