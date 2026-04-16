'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { useDashboard } from '@/contexts/DashboardContext';
import { ACTIVITIES, ITEM_ICONS } from '@/lib/rpg';
import { getVisibleTraits } from '@/lib/neurotags';
import type { InventoryItemId, InventoryItem } from '@/lib/rpg';

const STAT_KEYS = ['clarity', 'confidence', 'reactivity'] as const;

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 font-mono text-[11px] uppercase tracking-wider text-plum-light">
        {label}
      </span>
      <div className="stat-bar chamfer-sm flex-1">
        <div className="stat-bar-fill bg-plum" style={{ width: `${value}%` }} />
      </div>
      <span className="w-8 text-right font-mono text-[11px] text-text-secondary">
        {value}
      </span>
    </div>
  );
}

interface SlotData {
  itemId: InventoryItemId;
  xp: number;
  obtained: InventoryItem | null;
}

function ItemSlot({ slot, isSelected, onSelect }: {
  slot: SlotData;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { t } = useTranslation('dashboard');
  const icon = slot.obtained?.icon ?? ITEM_ICONS[slot.itemId];
  const isObtained = slot.obtained !== null;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`inventory-slot chamfer-sm flex-col gap-1 cursor-pointer transition-all ${
        isObtained ? '' : 'inventory-slot-empty opacity-50'
      } ${isSelected ? 'ring-1 ring-plum shadow-[0_0_12px_var(--plum-glow)]' : ''}`}
    >
      <span className={`text-lg ${isObtained ? '' : 'grayscale'}`}>{icon}</span>
      <span className="text-[9px] leading-tight text-center">
        {t(`items.${slot.itemId}.name`)}
      </span>
    </button>
  );
}

function ItemDetail({ slot }: { slot: SlotData }) {
  const { t } = useTranslation('dashboard');
  const icon = slot.obtained?.icon ?? ITEM_ICONS[slot.itemId];
  const isObtained = slot.obtained !== null;

  return (
    <div className="mt-2 border border-plum/30 bg-plum-muted/30 p-4 chamfer-sm animate-sheet-enter">
      <p className="font-mono text-[11px] font-semibold text-plum-light">
        {icon} {t(`items.${slot.itemId}.name`)}
      </p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-text-secondary italic">
        {t(`items.${slot.itemId}.description`)}
      </p>
      <div className="my-3 border-t border-surface-border" />
      {isObtained ? (
        <>
          <p className="font-mono text-[9px] uppercase tracking-wider text-safe">
            {t('characterSheet.itemObtained')}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">
            {t(`items.${slot.itemId}.howToGet`)}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold text-xp">
              {t('characterSheet.itemXp', { xp: slot.xp })}
            </span>
            {slot.obtained?.obtainedAt && (
              <span className="font-mono text-[10px] text-text-muted">
                {t('characterSheet.itemDate', {
                  date: new Date(slot.obtained.obtainedAt).toLocaleDateString('pt-BR'),
                })}
              </span>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="font-mono text-[9px] uppercase tracking-wider text-attention">
            {t('characterSheet.itemLocked')}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">
            {t(`items.${slot.itemId}.howToGet`)}
          </p>
          <span className="mt-2 inline-block font-mono text-[11px] font-semibold text-xp">
            {t('characterSheet.itemXp', { xp: slot.xp })}
          </span>
        </>
      )}
    </div>
  );
}

export default function PerfilPage() {
  const { t } = useTranslation('dashboard');
  const { character, persona } = useDashboard();
  const [selectedItemId, setSelectedItemId] = useState<InventoryItemId | null>(null);

  if (!character) {
    return (
      <div className="mt-16 flex flex-col items-center text-center">
        <p className="text-text-secondary font-mono text-xs">
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

  return (
    <div className="mt-6 max-w-md mx-auto">
      {/* Header: class + tier + level */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            {t('characterSheet.title')}
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl">{character.class.icon}</span>
            <span className="font-display text-xs font-bold uppercase tracking-wider text-plum-light">
              {character.class.title}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-text-muted">
              &mdash;
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary text-glow-primary">
              {t(`tiers.${character.tier.name}`)}
            </span>
          </div>
          <p className="mt-1 text-xs text-text-secondary italic">
            {character.class.description}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">LV</p>
          <p className="font-display text-lg font-bold text-plum-light">{character.level}</p>
          <div className="mt-1 h-[3px] w-12 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-xp animate-xp-fill" style={{ width: `${xpPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className="mt-6 flex justify-center">
        <div className="tactical-frame">
          <div className="re-scan overflow-hidden" style={{ width: 280 }}>
            <Image
              src={avatarSrc}
              alt={character.class.title}
              width={280}
              height={420}
              className="block"
              priority
            />
          </div>
        </div>
      </div>

      {/* PERFIL — Traits */}
      <div className="section-divider mt-6" />
      <h3 className="mt-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
        {t('characterSheet.profileTitle')}
      </h3>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {visibleTraits.map((tag) => (
          <span key={tag} className="trait-tag chamfer-sm">#{tag}</span>
        ))}
      </div>

      {/* ATRIBUTOS — Stats */}
      <div className="section-divider mt-6" />
      <h3 className="mt-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
        {t('characterSheet.statsTitle')}
      </h3>
      <div className="mt-3 space-y-2">
        {STAT_KEYS.map((key) => (
          <StatBar key={key} label={t(`characterSheet.stats.${key}`)} value={character.stats[key]} />
        ))}
      </div>

      {/* INVENTARIO */}
      <div className="section-divider mt-6" />
      <h3 className="mt-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
        {t('characterSheet.inventoryTitle')}
      </h3>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {allSlots.map((slot) => (
          <ItemSlot
            key={slot.itemId}
            slot={slot}
            isSelected={selectedItemId === slot.itemId}
            onSelect={() => setSelectedItemId((prev) => prev === slot.itemId ? null : slot.itemId)}
          />
        ))}
      </div>

      {/* Item detail panel */}
      {selectedItemId && (() => {
        const selected = allSlots.find((s) => s.itemId === selectedItemId);
        return selected ? <ItemDetail slot={selected} /> : null;
      })()}

      {/* XP bar */}
      <div className="section-divider mt-6" />
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {t('characterSheet.xpLabel')}
          </p>
          <p className="font-mono text-[10px] text-xp">
            {t('characterSheet.xpProgress', { current: character.xp, needed: character.xpToNext })}
          </p>
        </div>
        <div className="stat-bar chamfer-sm mt-2">
          <div className="stat-bar-fill animate-xp-fill bg-xp" style={{ width: `${xpPercent}%` }} />
        </div>
      </div>
    </div>
  );
}
