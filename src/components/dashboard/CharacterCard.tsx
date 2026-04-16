'use client';

import { useTranslation } from 'react-i18next';
import type { Character } from '@/lib/rpg';
import { getVisibleTraits } from '@/lib/neurotags';

interface Props {
  character: Character;
}

const STAT_COLORS = {
  clarity: { bar: 'bg-primary', glow: 'glow-primary' },
  confidence: { bar: 'bg-plum-light', glow: 'glow-plum' },
  reactivity: { bar: 'bg-safe', glow: 'glow-safe' },
};

const STAT_LABELS = {
  clarity: 'Clareza',
  confidence: 'Confiança',
  reactivity: 'Serenidade',
};

export default function CharacterCard({ character }: Props) {
  const { t } = useTranslation('onboarding');
  const tDash = useTranslation('dashboard').t;
  const xpPercent = Math.min((character.xp / character.xpToNext) * 100, 100);

  return (
    <div className="card chamfer-md space-y-5">
      {/* Header: Class + Tier + Level */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{character.class.icon}</span>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary text-glow-primary">
              {character.class.title}
            </h3>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-primary/70">
              {tDash(`tiers.${character.tier.name}`)}
            </p>
            <p className="mt-0.5 text-xs text-text-secondary">
              {character.class.description}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-xp">LV {character.level}</span>
        </div>
      </div>

      {/* XP Bar */}
      <div>
        <div className="flex justify-between text-xs">
          <span className="font-mono text-text-muted">XP</span>
          <span className="font-mono text-xp">
            {character.xp}/{character.xpToNext}
          </span>
        </div>
        <div className="stat-bar mt-1 chamfer-sm">
          <div
            className="stat-bar-fill bg-xp animate-xp-fill"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        {(Object.keys(STAT_LABELS) as Array<keyof typeof STAT_LABELS>).map((stat) => (
          <div key={stat}>
            <div className="flex justify-between text-xs">
              <span className="font-mono text-text-muted">
                {STAT_LABELS[stat]}
              </span>
              <span className="font-mono text-text-secondary">
                {character.stats[stat]}
              </span>
            </div>
            <div className="stat-bar mt-1 chamfer-sm">
              <div
                className={`stat-bar-fill ${STAT_COLORS[stat].bar}`}
                style={{ width: `${character.stats[stat]}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Traits */}
      <div>
        <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
          Traits
        </p>
        <div className="flex flex-wrap gap-1.5">
          {getVisibleTraits(character.traits).map((tag) => (
            <span key={tag} className="trait-tag chamfer-sm">
              {t(`neurotags.${tag}.label`)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
