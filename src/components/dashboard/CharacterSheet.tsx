'use client';

import { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import type { Character, InventoryItemId } from '@/lib/rpg';
import { ACTIVITIES, ITEM_ICONS } from '@/lib/rpg';
import { getVisibleTraits, genderSuffix } from '@/lib/neurotags';
import { useDashboard } from '@/contexts/DashboardContext';
import ItemDetailModal, { type SlotData } from '@/components/dashboard/ItemDetailModal';

interface Props {
  character: Character;
  avatarSrc?: string | null;
  onClose: () => void;
}

const STAT_KEYS = ['clarity', 'confidence', 'reactivity'] as const;

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="font-display text-[15px] font-medium text-text-secondary">
          {label}
        </span>
        <span className="font-display text-[15px] font-bold text-text-muted">
          {value}
        </span>
      </div>
      <div className="stat-bar rounded-lg">
        <div className="stat-bar-fill stat-bar-fill-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ItemSlot({ slot, onSelect }: {
  slot: SlotData;
  onSelect: () => void;
}) {
  const { t } = useTranslation('dashboard');
  const icon = slot.obtained?.icon ?? ITEM_ICONS[slot.itemId];
  const isObtained = slot.obtained !== null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`inventory-slot rounded-lg flex-col gap-1 cursor-pointer transition-all ${
        isObtained ? '' : 'inventory-slot-empty opacity-50'
      }`}
    >
      <span className={`text-xl ${isObtained ? '' : 'grayscale'}`}>{icon}</span>
      <span className="text-[11px] leading-tight text-center">
        {t(`items.${slot.itemId}.name`)}
      </span>
    </button>
  );
}

export default function CharacterSheet({ character, avatarSrc, onClose }: Props) {
  const { t } = useTranslation('dashboard');
  const { gender } = useDashboard();
  const suffix = genderSuffix(gender);
  const classTitle = t(`classes.${character.class.name}_${gender}`);
  const classDesc = t(`classes.${character.class.name}_desc`);

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

  const [selectedItemId, setSelectedItemId] = useState<InventoryItemId | null>(null);
  const xpPercent = Math.min(100, (character.xp / character.xpToNext) * 100);
  const visibleTraits = getVisibleTraits(character.traits);

  const allSlots: SlotData[] = Object.values(ACTIVITIES).map((activity) => ({
    itemId: activity.item,
    xp: activity.xp,
    obtained: character.inventory.find((i) => i.id === activity.item) ?? null,
  }));
  allSlots.sort((a, b) => {
    if (a.obtained && !b.obtained) return -1;
    if (!a.obtained && b.obtained) return 1;
    return 0;
  });

  const selectedSlot = selectedItemId
    ? allSlots.find((s) => s.itemId === selectedItemId) ?? null
    : null;

  return (
    <div className="character-sheet-overlay animate-sheet-enter">
      <div className="mx-auto max-w-lg px-4 sm:px-6 py-8">
        <button onClick={onClose} className="n2-btn-ghost mb-6 ml-auto block">
          {t('characterSheet.close')} [X]
        </button>

        {/* Avatar portrait — first element */}
        <div className="flex justify-center mb-6">
          {avatarSrc ? (
            <div className="tactical-frame">
              <div className="re-scan overflow-hidden w-[220px] sm:w-[280px]">
                <Image
                  src={avatarSrc}
                  alt={classTitle}
                  width={280}
                  height={420}
                  className="block w-full h-auto"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="tactical-frame">
              <div className="re-scan flex items-center justify-center w-[220px] sm:w-[280px] h-[280px]">
                <span className="text-[120px] leading-none">{character.class.icon}</span>
              </div>
            </div>
          )}
        </div>

        {/* Character Dossier card */}
        <div className="card rounded-2xl">
          <div className="flex gap-5 flex-wrap">
            <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-2xl bg-gradient-to-br from-primary-muted to-plum-muted flex items-center justify-center flex-shrink-0 border border-surface-border">
              <span className="text-[32px] sm:text-[40px]">{character.class.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-[22px] sm:text-[26px] font-bold">
                {classTitle}
              </h2>
              <p className="font-display text-[15px] sm:text-[16px] font-normal italic text-plum mt-0.5">
                {t('perfil.classLevel', {
                  className: t(`tiers.${character.tier.name}`, { suffix }),
                  level: character.level,
                })}
              </p>
              <p className="mt-2 text-[13px] leading-[1.7] text-text-secondary">
                {classDesc}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 space-y-3">
            {STAT_KEYS.map((key) => (
              <StatBar
                key={key}
                label={t(`characterSheet.stats.${key}`)}
                value={character.stats[key]}
              />
            ))}
          </div>

          {/* XP to next level */}
          <div className="mt-4">
            <div className="flex justify-between mb-1.5">
              <span className="font-accent text-[15px] text-xp">
                {t('perfil.xpToNext')}
              </span>
              <span className="font-display text-[13px] font-semibold text-text-muted">
                {t('characterSheet.xpProgress', {
                  current: character.xp,
                  needed: character.xpToNext,
                })}
              </span>
            </div>
            <div className="stat-bar rounded-lg">
              <div
                className="stat-bar-fill stat-bar-fill-xp animate-xp-fill"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Traits */}
        <div className="mt-6">
          <h3 className="font-display text-[14px] font-bold uppercase tracking-[0.08em] text-text-muted mb-3">
            {t('characterSheet.profileTitle')}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {visibleTraits.map((tag) => (
              <span key={tag} className="trait-tag">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Inventory */}
        <div className="mt-6">
          <h3 className="font-display text-[14px] font-bold uppercase tracking-[0.08em] text-text-muted mb-3">
            {t('characterSheet.inventoryTitle')}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {allSlots.map((slot) => (
              <ItemSlot
                key={slot.itemId}
                slot={slot}
                onSelect={() => setSelectedItemId(slot.itemId)}
              />
            ))}
            {/* Pad to fill last row on both 3-col and 4-col grids */}
            {(() => {
              const len = allSlots.length;
              const target = Math.ceil(len / 12) * 12;
              return Array.from({ length: target - len }).map((_, i) => (
                <div key={`pad-${i}`} className="inventory-slot inventory-slot-empty opacity-20 rounded-lg" />
              ));
            })()}
          </div>
        </div>
      </div>

      {/* Item detail modal */}
      {selectedSlot && (
        <ItemDetailModal
          slot={selectedSlot}
          onClose={() => setSelectedItemId(null)}
        />
      )}
    </div>
  );
}
