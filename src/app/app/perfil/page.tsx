'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useWallet } from '@solana/wallet-adapter-react';

import Link from 'next/link';
import { useDashboard } from '@/contexts/DashboardContext';
import { ACTIVITIES, ITEM_ICONS } from '@/lib/rpg';
import { getVisibleTraits, genderSuffix } from '@/lib/neurotags';
import { getUserAvatar, saveCustomAvatar } from '@/lib/store';
const useOnboardingT = () => useTranslation('onboarding').t;
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
  const { publicKey } = useWallet();
  const { character, persona, gender, isDemo } = useDashboard();
  const tOnb = useOnboardingT();
  const [selectedItemId, setSelectedItemId] = useState<InventoryItemId | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const walletAddr = persona?.wallet ?? publicKey?.toBase58() ?? '';
  const [avatarSrc, setAvatarSrc] = useState(() =>
    persona ? persona.avatar : getUserAvatar(walletAddr, gender),
  );

  const handleAvatarUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !walletAddr) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    img.onload = () => {
      const size = 400;
      canvas.width = size;
      canvas.height = size;
      const scale = Math.max(size / img.width, size / img.height);
      const x = (size - img.width * scale) / 2;
      const y = (size - img.height * scale) / 2;
      ctx?.drawImage(img, x, y, img.width * scale, img.height * scale);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      saveCustomAvatar(walletAddr, dataUrl);
      setAvatarSrc(dataUrl);
    };
    img.src = URL.createObjectURL(file);
  }, [walletAddr]);

  if (!character) {
    return (
      <div className="card rounded-2xl border-primary/20 bg-primary/5 text-center">
        <p className="font-display text-[17px] font-bold">{t('perfil.emptyTitle')}</p>
        <p className="mt-2 text-[14px] text-text-muted">{t('perfil.emptyDesc')}</p>
        <Link href="/onboarding" className="n2-btn-primary mt-4 inline-block">{t('perfil.emptyCta')}</Link>
      </div>
    );
  }

  const suffix = genderSuffix(gender);
  const classTitle = t(`classes.${character.class.name}_${gender}`);
  const classDesc = t(`classes.${character.class.name}_desc`);
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
    <>
      {/* Page title — inline mixed-font */}
      <h1 className="flex items-baseline gap-3">
        <span className="font-display text-[22px] tracking-[0.02em] font-bold">{t('perfil.titlePrefix')}</span>
        <span className="font-display text-[22px] tracking-[0.02em] font-normal italic text-text-muted">{t('perfil.titleAccent')}</span>
      </h1>

      {/* Avatar portrait — first visual element */}
      <div className="mt-6 flex justify-center">
        <div className="tactical-frame relative group">
          <div className="re-scan overflow-hidden w-[220px] sm:w-[280px]">
            {avatarSrc.startsWith('data:') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarSrc}
                alt={classTitle}
                className="block w-full h-auto aspect-[2/3] object-cover"
              />
            ) : (
              <Image
                src={avatarSrc}
                alt={classTitle}
                width={280}
                height={420}
                className="block w-full h-auto"
                priority
              />
            )}
          </div>
          {/* Upload overlay */}
          {!isDemo && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent rounded-b-xl cursor-pointer"
              >
                <span className="font-mono text-[11px] text-white/90 uppercase tracking-wider">
                  {t('perfil.changePhoto', { defaultValue: 'Trocar foto' })}
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </>
          )}
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
              {classTitle}
            </h2>
            <p className="font-display text-[15px] sm:text-[17px] font-normal italic text-plum mt-0.5">
              {t('perfil.classLevel', {
                className: t(`tiers.${character.tier.name}`, { suffix }),
                level: character.level,
              })}
            </p>
            <p className="mt-2 text-[13px] sm:text-[15px] leading-[1.7] text-text-secondary">
              {classDesc}
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
            <span className="font-accent text-[15px] sm:text-[16px] text-xp">
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
            <span key={tag} className="trait-tag">{tOnb(`neurotags.${tag}.label_${gender}`)}</span>
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
