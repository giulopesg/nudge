'use client';

import { useTranslation } from 'react-i18next';
import type { Character } from '@/lib/rpg';
import { getVisibleTraits, genderSuffix, type Gender } from '@/lib/neurotags';

interface Props {
  character: Character;
  gender?: Gender;
}

const STAT_LABELS = {
  clarity: 'Clareza',
  confidence: 'Confiança',
  reactivity: 'Serenidade',
};

export default function CharacterCard({ character, gender = 'f' }: Props) {
  const { t } = useTranslation('onboarding');
  const tDash = useTranslation('dashboard').t;
  const classTitle = tDash(`classes.${character.class.name}_${gender}`);
  const classDesc = tDash(`classes.${character.class.name}_desc`);
  const suffix = genderSuffix(gender);
  const xpPercent = Math.min((character.xp / character.xpToNext) * 100, 100);

  return (
    <div className="card rounded-xl">
      {/* Horizontal layout */}
      <div className="flex gap-4 sm:gap-7 flex-wrap">
        {/* Avatar block */}
        <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-xl bg-gradient-to-br from-primary-muted to-plum-muted flex items-center justify-center flex-shrink-0">
          <span className="text-[32px] sm:text-[44px]">{character.class.icon}</span>
        </div>

        {/* Info block */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-[22px] sm:text-[28px] font-bold">
            {classTitle}
          </h3>
          <p className="font-display text-[17px] font-normal italic text-plum">
            {tDash(`tiers.${character.tier.name}`, { suffix })} &middot; LV {character.level}
          </p>
          <p className="mt-1 text-[13px] text-text-secondary">
            {classDesc}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 space-y-3">
        {(Object.keys(STAT_LABELS) as Array<keyof typeof STAT_LABELS>).map((stat) => (
          <div key={stat}>
            <div className="flex justify-between text-[13px]">
              <span className="font-display text-[15px] font-medium text-text-secondary">
                {STAT_LABELS[stat]}
              </span>
              <span className="font-mono text-[13px] text-text-secondary">
                {character.stats[stat]}
              </span>
            </div>
            <div className="stat-bar mt-1 rounded-lg">
              <div
                className="stat-bar-fill stat-bar-fill-primary"
                style={{ width: `${character.stats[stat]}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* XP */}
      <div className="mt-5">
        <div className="flex justify-between items-baseline">
          <span className="font-accent text-[16px] text-xp">XP</span>
          <span className="font-display text-[14px] text-xp">
            {character.xp}/{character.xpToNext}
          </span>
        </div>
        <div className="stat-bar mt-1 rounded-lg">
          <div
            className="stat-bar-fill stat-bar-fill-xp animate-xp-fill"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      {/* Traits */}
      <div className="mt-5">
        <div className="flex flex-wrap gap-1.5">
          {getVisibleTraits(character.traits).map((tag) => (
            <span key={tag} className="trait-tag">
              {t(`neurotags.${tag}.label`)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
