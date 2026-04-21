'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useTranslation } from 'react-i18next';
import { useCallback, useState, useRef, useEffect } from 'react';

export default function WalletButton() {
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { t } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const handleConnect = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const handleCopy = useCallback(() => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setMenuOpen(false);
    }
  }, [publicKey]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setMenuOpen(false);
  }, [disconnect]);

  const truncatedAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : null;

  if (connected) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-1.5 sm:gap-2 border border-surface-border bg-surface px-2 sm:px-3 py-1.5 sm:py-2 font-mono text-xs sm:text-sm text-text-secondary transition-all rounded-full hover:border-primary hover:text-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-safe animate-pulse-glow" />
          <span>{truncatedAddress}</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border border-surface-border bg-[#13101e] shadow-2xl overflow-hidden animate-sheet-enter">
            <button
              onClick={handleCopy}
              className="w-full px-4 py-2.5 text-left text-[13px] font-mono text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              {t('wallet.copyAddress', { defaultValue: 'Copiar endere\u00e7o' })}
            </button>
            <div className="border-t border-surface-border" />
            <button
              onClick={handleDisconnect}
              className="w-full px-4 py-2.5 text-left text-[13px] font-mono text-danger/80 hover:bg-danger/10 hover:text-danger transition-colors"
            >
              {t('wallet.disconnect')}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="px-3 py-1.5 text-[11px] sm:px-5 sm:py-2.5 sm:text-[13px] rounded-full font-medium uppercase tracking-wider bg-primary text-background hover:bg-primary/90 transition-colors"
    >
      {t('wallet.connect')}
    </button>
  );
}
