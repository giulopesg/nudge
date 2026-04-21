'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export default function WalletButton() {
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  }, [connected, disconnect, setVisible]);

  const truncatedAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : null;

  if (connected) {
    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 sm:gap-2 border border-surface-border bg-surface px-2 sm:px-3 py-1.5 sm:py-2 font-mono text-xs sm:text-sm text-text-secondary transition-all rounded-full hover:border-primary hover:text-foreground"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-safe animate-pulse-glow" />
        <span>{truncatedAddress}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="px-3 py-1.5 text-[11px] sm:px-5 sm:py-2.5 sm:text-[13px] rounded-full font-medium uppercase tracking-wider bg-primary text-background hover:bg-primary/90 transition-colors"
    >
      {t('wallet.connect')}
    </button>
  );
}
