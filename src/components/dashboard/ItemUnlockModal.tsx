'use client';

import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { InventoryItemId } from '@/lib/rpg';
import { ITEM_ICONS, ACTIVITIES } from '@/lib/rpg';

interface Props {
  itemId: InventoryItemId;
  onClose: () => void;
}

export default function ItemUnlockModal({ itemId, onClose }: Props) {
  const { t } = useTranslation('dashboard');

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

  const icon = ITEM_ICONS[itemId];
  const activity = Object.values(ACTIVITIES).find((a) => a.item === itemId);
  const xp = activity?.xp ?? 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,5,14,0.97)] p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="animate-sheet-enter animate-level-up-glow w-full max-w-sm border border-primary/30 bg-surface rounded-2xl p-8 text-center">
        {/* Item Icon */}
        <div className="text-[64px] leading-none">{icon}</div>

        {/* Title */}
        <h2 className="mt-4 font-display text-[15px] font-bold uppercase tracking-[0.2em] text-foreground">
          {t('itemUnlock.title')}
        </h2>

        {/* Item Name */}
        <p className="mt-3 font-display text-[20px] font-bold text-primary leading-snug">
          {t(`items.${itemId}.name`)}
        </p>

        {/* Description */}
        <p className="mt-2 font-accent text-[15px] italic text-plum leading-relaxed">
          {t(`items.${itemId}.description`)}
        </p>

        {/* XP */}
        {xp > 0 && (
          <p className="mt-3 font-mono text-[16px] font-bold text-xp">
            +{xp} XP
          </p>
        )}

        {/* CTA */}
        <button onClick={onClose} className="n2-btn-primary mt-6 w-full">
          {t('itemUnlock.dismiss')}
        </button>
      </div>
    </div>
  );
}
