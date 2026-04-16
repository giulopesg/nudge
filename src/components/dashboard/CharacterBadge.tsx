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
      className="chamfer-sm flex items-center gap-2 border border-plum/20 bg-plum-muted px-3 py-1.5 transition-all hover:border-plum hover:shadow-[0_0_12px_var(--plum-glow)]"
    >
      <span className="text-sm">{character.class.icon}</span>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-plum-light">
        LV {character.level}
      </span>
      <div className="h-[2px] w-8 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-xp"
          style={{ width: `${xpPercent}%` }}
        />
      </div>
    </button>
  );
}
