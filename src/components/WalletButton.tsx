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
        className="flex items-center gap-2 border border-surface-border bg-surface px-3 py-2 font-mono text-xs text-text-secondary transition-all chamfer-sm hover:border-plum hover:text-foreground"
      >
        <span className="h-1.5 w-1.5 bg-safe animate-pulse-glow" />
        <span>{truncatedAddress}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="border border-primary bg-transparent px-4 py-2 font-mono text-xs font-semibold tracking-wider text-primary chamfer-sm transition-all glow-primary hover:bg-primary hover:text-background"
    >
      {t('wallet.connect')}
    </button>
  );
}
