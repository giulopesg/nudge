'use client';

import { useState } from 'react';
import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';
import PlaygroundControls from '../PlaygroundControls';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

const ALL_TAGS = ['Cautelosa', 'Meticulosa', 'Aprendiz Visual', 'Conservadora', 'Analítica', 'Paciente'];
const SLOT_ITEMS = ['\u{1F6E1}\uFE0F', '\u2728', '\u{1F4DA}', '\u{1F48E}', '\u{1F525}'];

export default function RpgGroup({ copyCode, copied }: Props) {
  const [tag, setTag] = useState<Record<string, string | boolean | number>>({
    label: 'Cautelosa', count: 4,
  });
  const [inv, setInv] = useState<Record<string, string | boolean | number>>({
    filled: 3, items: 'shields',
  });

  const emojiSets: Record<string, string[]> = {
    shields:  ['\u{1F6E1}\uFE0F', '\u2728', '\u{1F4DA}', '\u{1F48E}', '\u{1F525}'],
    potions:  ['\u{1F9EA}', '\u{1F48A}', '\u2697\uFE0F', '\u{1F52E}', '\u{1F9FF}'],
    weapons:  ['\u2694\uFE0F', '\u{1F3F9}', '\u{1F52B}', '\u{1FA84}', '\u{1F5E1}\uFE0F'],
  };
  const currentEmojis = emojiSets[inv.items as string] ?? emojiSets.shields;

  return (
    <>
      {/* ── Tag (Neurotag) ─────────── */}
      <ComponentDoc
        id="comp-tag"
        name="Tag (Neurotag)"
        description="Behavioral trait tags from the neuroscience quiz. Pill-shaped with primary muted background."
        forDesigner="Tags represent personality traits. Use Fira Code mono, --primary color on --primary-muted bg. Hover adds glow. Group tags in a flex-wrap container with gap-2."
        forDev="Class: trait-tag. Fira Code 13px, primary color, primary-muted bg, radius-full. Hover: border-color primary + glow."
        preview={
          <div className="flex flex-col gap-4 w-full">
            <PlaygroundControls
              controls={[
                { key: 'label', label: 'Label', type: 'text', defaultValue: 'Cautelosa' },
                { key: 'count', label: 'Count', type: 'range', min: 1, max: 6, defaultValue: 4 },
              ]}
              values={tag}
              onChange={setTag}
            />
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.slice(0, tag.count as number).map((t, i) => (
                <span key={t} className="trait-tag">{i === 0 ? tag.label as string : t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="trait-tag" />
            </div>
          </div>
        }
        code={`<span className="trait-tag">Cautelosa</span>
<span className="trait-tag">Meticulosa</span>

/* CSS: font-family: Fira Code; font-size: 13px;
   background: var(--primary-muted); color: var(--primary);
   border-radius: 9999px; :hover → border-primary + glow */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── InventorySlot ──────────── */}
      <ComponentDoc
        id="comp-inventory"
        name="InventorySlot"
        description="RPG inventory grid slots for items and achievements. Square aspect ratio with hover glow."
        forDesigner="1:1 aspect ratio grid. Obtained items: primary-muted bg with emoji/icon. Empty slots: muted opacity 0.3. Hover adds primary glow. Grid: 5-6 columns."
        forDev="Class: inventory-slot. Aspect-ratio 1, primary-muted bg, Fira Code 10px. Hover: border-primary + glow. Empty: inventory-slot-empty (opacity 0.3)."
        preview={
          <div className="flex flex-col gap-4 w-full">
            <PlaygroundControls
              controls={[
                { key: 'filled', label: 'Filled', type: 'range', min: 0, max: 5, defaultValue: 3 },
                { key: 'items', label: 'Items', type: 'select', options: ['shields', 'potions', 'weapons'], defaultValue: 'shields' },
              ]}
              values={inv}
              onChange={setInv}
            />
            <div className="grid grid-cols-5 gap-2 max-w-[280px]">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < (inv.filled as number);
                return (
                  <div key={i} className={`inventory-slot ${filled ? '' : 'inventory-slot-empty'}`}>
                    <span className={filled ? 'text-[18px]' : 'text-[14px]'}>
                      {filled ? currentEmojis[i] : '?'}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="inventory-slot" />
              <CopyInline value="inventory-slot-empty" />
            </div>
          </div>
        }
        code={`<div className="grid grid-cols-5 gap-2">
  <div className="inventory-slot"><span>emoji</span></div>
  <div className="inventory-slot inventory-slot-empty"><span>?</span></div>
</div>

/* inventory-slot: aspect-ratio 1; bg primary-muted;
   border 1px surface-border; radius-md; Fira Code 10px
   :hover → border-primary + glow
   inventory-slot-empty: opacity 0.3; text-muted */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── CharacterCard ──────────── */}
      <ComponentDoc
        id="comp-character-card"
        name="CharacterCard"
        description="RPG character summary with avatar, class name, tier, and description. Used in dashboard and onboarding."
        forDesigner="Flex row: left avatar (80px mobile, 110px desktop, rounded-xl) with gradient bg. Right: class name (font-display bold) + tier badge (font-mono uppercase) + description."
        forDev="Props: character (from buildCharacter) + gender. Avatar size: w-[80px]/sm:w-[110px]. Gradient: bg-gradient-to-br from-primary-muted to-plum-muted. Fallback emoji when no image."
        preview={
          <div className="card rounded-xl max-w-[400px] w-full">
            <div className="flex gap-4">
              <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] flex-shrink-0 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--primary-muted), var(--plum-muted))' }}>
                <span className="text-[36px]">&#x2726;</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-[18px] font-bold text-foreground">Guardia</p>
                <p className="font-mono text-[10px] text-primary uppercase tracking-[0.1em] mt-0.5">Tier II — Awakened</p>
                <p className="font-sans text-[13px] text-text-secondary mt-2 leading-relaxed line-clamp-2">
                  A cautious protector who values safety above all. Masters defensive strategies.
                </p>
              </div>
            </div>
          </div>
        }
        code={`<div className="card rounded-xl">
  <div className="flex gap-4">
    <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px]
      flex-shrink-0 rounded-xl bg-gradient-to-br
      from-primary-muted to-plum-muted flex items-center justify-center">
      <Image src={avatar} alt="" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-display text-[18px] font-bold">{className}</p>
      <p className="font-mono text-[10px] text-primary uppercase">
        {tier}
      </p>
      <p className="text-[13px] text-text-secondary mt-2">
        {description}
      </p>
    </div>
  </div>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── CharacterBadge ─────────── */}
      <ComponentDoc
        id="comp-character-badge"
        name="CharacterBadge"
        description="Compact pill badge showing class icon + level + mini XP progress bar. Used in nav and headers."
        forDesigner="Rounded-full pill with icon + level text. XP progress as thin 2px bar inside. Primary-muted bg, primary border on hover with glow. Clickable to open CharacterSheet."
        forDev="Rounded-full button with flex row: icon + level span + progress div. Hover: border-primary + shadow glow. XP bar: h-[2px] w-8 with colored fill."
        preview={
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all"
              style={{ borderColor: 'rgba(163,102,255,0.2)', background: 'var(--primary-muted)' }}>
              <span className="text-[14px]">&#x2726;</span>
              <span className="font-mono text-[12px] text-primary font-semibold">Lv 3</span>
              <div className="h-[2px] w-8 rounded-full" style={{ background: 'rgba(255,248,240,0.1)' }}>
                <div className="h-full rounded-full" style={{ width: '65%', background: 'var(--xp)' }} />
              </div>
            </button>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="rounded-full" />
              <CopyInline value="border-primary/20" />
              <CopyInline value="bg-primary-muted" />
            </div>
          </div>
        }
        code={`<button className="flex items-center gap-2 rounded-full
  border border-primary/20 bg-primary-muted px-3 py-1.5
  hover:border-primary hover:shadow-[0_0_12px_var(--primary-glow)]">
  <span>{icon}</span>
  <span className="font-mono text-[12px] text-primary font-semibold">
    Lv {level}
  </span>
  <div className="h-[2px] w-8 rounded-full bg-white/10">
    <div className="h-full rounded-full bg-xp"
      style={{ width: xpPercent + '%' }} />
  </div>
</button>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── CharacterSheet ─────────── */}
      <ComponentDoc
        id="comp-character-sheet"
        name="CharacterSheet"
        description="Full-screen character profile overlay with avatar, stats bars, inventory grid, and tactical frame decorations."
        forDesigner="Full-screen overlay (z-50, near-opaque bg). Tactical frame corners (2px orchid lines). RE-scan line sweeps over avatar. Stats use gradient-fill bars. Inventory: 5-6 column grid."
        forDev="Overlay: character-sheet-overlay (fixed inset-0 z-50). Decorations: tactical-frame (CSS ::before/::after corners), re-scan (scan line animation). Entry: animate-sheet-enter."
        preview={
          <div className="w-full rounded-xl border border-surface-border overflow-hidden" style={{ height: 220, background: 'rgba(7,5,14,0.98)' }}>
            <div className="p-4">
              <div className="flex gap-4 mb-4">
                <div className="tactical-frame">
                  <div className="re-scan w-[60px] h-[60px] rounded-lg overflow-hidden flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, var(--primary-muted), var(--plum-muted))' }}>
                    <span className="text-[24px]">&#x2726;</span>
                  </div>
                </div>
                <div>
                  <p className="font-display text-[16px] font-bold text-foreground">Guardia</p>
                  <p className="font-mono text-[9px] text-primary uppercase tracking-wider">Tier II</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-text-muted w-12">DEF</span>
                  <div className="stat-bar flex-1"><div className="stat-bar-fill stat-bar-fill-primary" style={{ width: '75%' }} /></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-text-muted w-12">WIS</span>
                  <div className="stat-bar flex-1"><div className="stat-bar-fill stat-bar-fill-safe" style={{ width: '45%' }} /></div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                <div className="inventory-slot" style={{ padding: 2 }}><span className="text-[12px]">&#x1f6e1;&#xfe0f;</span></div>
                <div className="inventory-slot" style={{ padding: 2 }}><span className="text-[12px]">&#x2728;</span></div>
                <div className="inventory-slot inventory-slot-empty" style={{ padding: 2 }}><span className="text-[10px]">?</span></div>
                <div className="inventory-slot inventory-slot-empty" style={{ padding: 2 }}><span className="text-[10px]">?</span></div>
              </div>
            </div>
            <div className="px-4 flex flex-wrap gap-2">
              <CopyInline value="character-sheet-overlay" />
              <CopyInline value="tactical-frame" />
              <CopyInline value="re-scan" />
              <CopyInline value="animate-sheet-enter" />
            </div>
          </div>
        }
        code={`<div className="character-sheet-overlay">
  <div className="animate-sheet-enter p-6 max-w-lg mx-auto">
    {/* Avatar with tactical frame + scan */}
    <div className="tactical-frame">
      <div className="re-scan rounded-lg overflow-hidden">
        <Image src={avatar} alt="" />
      </div>
    </div>

    {/* Stats */}
    <div className="stat-bar">
      <div className="stat-bar-fill stat-bar-fill-primary"
        style={{ width: statPercent + '%' }} />
    </div>

    {/* Inventory grid */}
    <div className="grid grid-cols-6 gap-2">
      <div className="inventory-slot">item</div>
    </div>
  </div>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
