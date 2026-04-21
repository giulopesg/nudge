'use client';

import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Character } from '@/lib/rpg';
import { useDashboard } from '@/contexts/DashboardContext';
import { genderSuffix } from '@/lib/neurotags';

interface Props {
  character: Character;
  onClose: () => void;
}

export default function LevelUpModal({ character, onClose }: Props) {
  const { t } = useTranslation('dashboard');
  const { gender } = useDashboard();
  const suffix = genderSuffix(gender);
  const classTitle = t(`classes.${character.class.name}_${gender}`);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,5,14,0.97)] p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="animate-sheet-enter animate-level-up-glow w-full max-w-sm border border-xp/30 bg-surface rounded-2xl p-8 text-center">
        {/* Icon */}
        <div className="text-[64px] leading-none">{character.class.icon}</div>

        {/* Title */}
        <h2 className="mt-4 font-display text-[15px] font-bold uppercase tracking-[0.2em] text-foreground">
          {t('levelUp.title')}
        </h2>

        {/* Level number */}
        <p className="mt-2 font-display text-[48px] font-bold text-xp leading-none">
          {character.level}
        </p>

        {/* Tier + class */}
        <p className="mt-2 font-accent text-[15px] text-plum">
          {t(`tiers.${character.tier.name}`, { suffix })}
        </p>
        <p className="mt-1 text-[14px] text-text-secondary">
          {classTitle}
        </p>

        {/* Subtitle */}
        <p className="mt-3 text-[13px] text-text-muted">
          {t('levelUp.subtitle')}
        </p>

        {/* CTA */}
        <button onClick={onClose} className="n2-btn-primary mt-6 w-full">
          {t('levelUp.dismiss')}
        </button>
      </div>
    </div>
  );
}
