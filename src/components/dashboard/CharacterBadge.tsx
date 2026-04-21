'use client';

import type { Character } from '@/lib/rpg';

interface Props {
  character: Character;
  onClick: () => void;
}

export default function CharacterBadge({ character, onClick }: Props) {
  const xpPercent = Math.min(100, (character.xp / character.xpToNext) * 100);

  return (
    <button
      onClick={onClick}
      className="rounded-full flex items-center gap-2 border border-primary/20 bg-primary-muted px-3 py-1.5 transition-all hover:border-primary hover:shadow-[0_0_12px_var(--primary-glow)]"
    >
      <span className="text-[15px]">{character.class.icon}</span>
      <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-primary">
        LV {character.level}
      </span>
      <div className="h-[2px] w-8 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full stat-bar-fill-xp"
          style={{ width: `${xpPercent}%` }}
        />
      </div>
    </button>
  );
}
