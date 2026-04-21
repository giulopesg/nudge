'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { useDashboard } from '@/contexts/DashboardContext';
import { ACTIVITIES, ITEM_ICONS } from '@/lib/rpg';
import { getVisibleTraits } from '@/lib/neurotags';
import ItemDetailModal, { type SlotData } from '@/components/dashboard/ItemDetailModal';
import type { InventoryItemId } from '@/lib/rpg';

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

export default function PerfilPage() {
  const { t } = useTranslation('dashboard');
  const { character, persona } = useDashboard();
  const [selectedItemId, setSelectedItemId] = useState<InventoryItemId | null>(null);

  if (!character) {
    return (
      <div className="mt-16 flex flex-col items-center text-center">
        <p className="text-text-secondary font-mono text-[13px]">
          {t('characterSheet.title')}
        </p>
      </div>
    );
  }

  const xpPercent = Math.min(100, (character.xp / character.xpToNext) * 100);
  const visibleTraits = getVisibleTraits(character.traits);
  const avatarSrc = persona?.avatar ?? '/giuliana-avatar.png';

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
    <>
      {/* Page title — inline mixed-font */}
      <h1>
        <span className="font-display text-[22px] font-bold">{t('perfil.titlePrefix')}</span>
        {' '}
        <span className="font-accent text-[24px] italic text-text-muted">{t('perfil.titleAccent')}</span>
      </h1>

      {/* Avatar portrait — first visual element */}
      <div className="mt-6 flex justify-center">
        <div className="tactical-frame">
          <div className="re-scan overflow-hidden w-[220px] sm:w-[280px]">
            <Image
              src={avatarSrc}
              alt={character.class.title}
              width={280}
              height={420}
              className="block w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Character Dossier card */}
      <div className="mt-6 card rounded-2xl">
        {/* Horizontal layout: icon + info */}
        <div className="flex gap-5 sm:gap-7 flex-wrap">
          <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-2xl bg-gradient-to-br from-primary-muted to-plum-muted flex items-center justify-center flex-shrink-0 border border-surface-border">
            <span className="text-[36px] sm:text-[44px]">{character.class.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-[24px] sm:text-[28px] font-bold">
              {character.class.title}
            </h2>
            <p className="font-accent text-[18px] sm:text-[20px] italic text-plum mt-0.5">
              {t('perfil.classLevel', {
                className: t(`tiers.${character.tier.name}`),
                level: character.level,
              })}
            </p>
            <p className="mt-2 text-[13px] sm:text-[15px] leading-[1.7] text-text-secondary">
              {character.class.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 space-y-3">
          {STAT_KEYS.map((key) => (
            <StatBar key={key} label={t(`characterSheet.stats.${key}`)} value={character.stats[key]} />
          ))}
        </div>

        {/* XP to next level — right after stats */}
        <div className="mt-4">
          <div className="flex justify-between mb-1.5">
            <span className="font-accent text-[18px] sm:text-[19px] italic text-xp">
              {t('perfil.xpToNext')}
            </span>
            <span className="font-display text-[14px] font-semibold text-text-muted">
              {t('characterSheet.xpProgress', { current: character.xp, needed: character.xpToNext })}
            </span>
          </div>
          <div className="stat-bar rounded-lg">
            <div className="stat-bar-fill stat-bar-fill-xp animate-xp-fill" style={{ width: `${xpPercent}%` }} />
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
        </div>
      </div>

      {/* Item detail modal */}
      {selectedSlot && (
        <ItemDetailModal
          slot={selectedSlot}
          onClose={() => setSelectedItemId(null)}
        />
      )}
    </>
  );
}
