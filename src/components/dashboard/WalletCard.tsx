'use client';

import { useTranslation } from 'react-i18next';
import type { WalletBalance } from '@/lib/kamino';

interface Props {
  balance: WalletBalance;
}

export default function WalletCard({ balance }: Props) {
  const { t } = useTranslation('dashboard');

  return (
    <div className="card rounded-2xl">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-[22px] font-bold leading-tight">
            {t('wallet.titlePrefix')}
          </h3>
          <p className="font-accent text-[24px] italic text-text-muted leading-tight -mt-0.5">
            {t('wallet.titleAccent')}
          </p>
        </div>
        <span className="font-mono text-[15px] text-primary">SOL</span>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-[28px] font-bold">
          {balance.solBalance.toFixed(4)}
        </span>
      </div>

      {balance.solValueUsd > 0 && (
        <p className="mt-1 font-mono text-[12px] text-text-muted">
          {t('wallet.solValue', { value: balance.solValueUsd.toFixed(2) })}
        </p>
      )}
    </div>
  );
}
