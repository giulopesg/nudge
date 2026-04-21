'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  mode: 'add' | 'remove';
  onClose: () => void;
  wallets?: string[];
}

function truncateAddress(addr: string): string {
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function WalletManageModal({ mode, onClose, wallets = [] }: Props) {
  const { t } = useTranslation('dashboard');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const handleConfirm = () => {
    setStatus('success');
    setTimeout(() => onClose(), 1500);
  };

  const isAdd = mode === 'add';
  const isRemove = !isAdd;
  const hasWallets = wallets.length > 0;
  const allSelected = hasWallets && selected.size === wallets.length;

  function toggleWallet(addr: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(addr)) next.delete(addr);
      else next.add(addr);
      return next;
    });
  }

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(wallets));
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,5,14,0.97)] p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="animate-sheet-enter w-full max-w-sm border border-surface-border bg-surface rounded-2xl p-6">
        <h3 className="font-display text-[20px] font-bold">
          {t(`portfolio.${isAdd ? 'addWalletTitle' : 'removeWalletTitle'}`)}
        </h3>
        <p className="mt-1 text-[14px] text-text-secondary leading-relaxed">
          {t(`portfolio.${isAdd ? 'addWalletSubtitle' : isRemove && hasWallets ? 'removeWalletSelectSubtitle' : 'removeWalletSubtitle'}`)}
        </p>

        {status === 'success' ? (
          <div className="mt-4 flex flex-col items-center gap-2 py-4">
            <span className="text-2xl text-safe">&#10003;</span>
            <p className="text-[14px] font-semibold text-safe">
              {t(`portfolio.${isAdd ? 'walletAdded' : 'walletRemoved'}`)}
            </p>
          </div>
        ) : (
          <>
            {isAdd && (
              <div className="mt-4">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t('portfolio.addWalletPlaceholder')}
                  className="w-full rounded-lg border border-surface-border bg-background px-4 py-3 font-mono text-[13px] text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            )}

            {isRemove && hasWallets && (
              <div className="mt-4 space-y-2">
                {/* Select all */}
                <button
                  onClick={toggleAll}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-surface-hover/50 transition-colors"
                >
                  <div className={`h-4 w-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                    allSelected ? 'bg-danger border-danger' : 'border-surface-border'
                  }`}>
                    {allSelected && <span className="text-[10px] text-background font-bold">&#10003;</span>}
                  </div>
                  <span className="font-mono text-[12px] text-text-muted uppercase tracking-wider">
                    {t('portfolio.selectAll')}
                  </span>
                </button>

                {/* Wallet list */}
                <div className="max-h-[200px] overflow-y-auto space-y-1">
                  {wallets.map((addr) => {
                    const isChecked = selected.has(addr);
                    return (
                      <button
                        key={addr}
                        onClick={() => toggleWallet(addr)}
                        className="flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-lg border border-surface-border/50 hover:border-danger/30 hover:bg-danger-bg/30 transition-colors"
                      >
                        <div className={`h-4 w-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-danger border-danger' : 'border-surface-border'
                        }`}>
                          {isChecked && <span className="text-[10px] text-background font-bold">&#10003;</span>}
                        </div>
                        <span className="font-mono text-[13px] text-foreground">
                          {truncateAddress(addr)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Count */}
                {selected.size > 0 && (
                  <p className="text-[12px] text-danger font-mono text-center">
                    {t('portfolio.removeCount', { count: selected.size })}
                  </p>
                )}
              </div>
            )}

            <div className="mt-5 flex gap-2">
              <button onClick={onClose} className="n2-btn-ghost flex-1">
                {t('portfolio.walletCancel')}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isAdd ? address.length < 32 : isRemove && hasWallets ? selected.size === 0 : false}
                className={`flex-1 ${
                  isAdd
                    ? 'n2-btn-primary'
                    : 'rounded-full border border-danger/40 bg-danger-bg px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-danger hover:bg-danger/20 transition-all cursor-pointer'
                } ${(isAdd && address.length < 32) || (isRemove && hasWallets && selected.size === 0) ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                {t(`portfolio.${isAdd ? 'addWalletConfirm' : 'removeWalletConfirm'}`)}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
