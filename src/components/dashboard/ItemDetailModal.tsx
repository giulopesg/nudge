'use client';

import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { InventoryItemId, InventoryItem } from '@/lib/rpg';
import { ITEM_ICONS } from '@/lib/rpg';

export interface SlotData {
  itemId: InventoryItemId;
  xp: number;
  obtained: InventoryItem | null;
}

interface Props {
  slot: SlotData;
  onClose: () => void;
}

export default function ItemDetailModal({ slot, onClose }: Props) {
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

  const icon = slot.obtained?.icon ?? ITEM_ICONS[slot.itemId];
  const isObtained = slot.obtained !== null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,5,14,0.97)] p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="animate-sheet-enter w-full max-w-sm border border-surface-border bg-surface rounded-2xl p-6">
        <p className="font-mono text-[15px] font-semibold text-plum-light">
          {icon} {t(`items.${slot.itemId}.name`)}
        </p>

        <p className="mt-2 text-[13px] leading-relaxed text-text-secondary font-accent italic">
          {t(`items.${slot.itemId}.description`)}
        </p>

        <div className="my-3 border-t border-surface-border" />

        {isObtained ? (
          <>
            <p className="font-mono text-[11px] uppercase tracking-wider text-safe">
              {t('characterSheet.itemObtained')}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
              {t(`items.${slot.itemId}.howToGet`)}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-mono text-[13px] font-semibold text-xp">
                {t('characterSheet.itemXp', { xp: slot.xp })}
              </span>
              {slot.obtained?.obtainedAt && (
                <span className="font-mono text-[12px] text-text-muted">
                  {t('characterSheet.itemDate', {
                    date: new Date(slot.obtained.obtainedAt).toLocaleDateString('pt-BR'),
                  })}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="font-mono text-[11px] uppercase tracking-wider text-attention">
              {t('characterSheet.itemLocked')}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
              {t(`items.${slot.itemId}.howToGet`)}
            </p>
            <span className="mt-2 inline-block font-mono text-[13px] font-semibold text-xp">
              {t('characterSheet.itemXp', { xp: slot.xp })}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
