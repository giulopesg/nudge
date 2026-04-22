import CodeBlock from './CodeBlock';
import {
  BRAND_COLORS, SECONDARY_COLORS, STATUS_COLORS, SURFACE_COLORS, TEXT_COLORS,
  FONTS, SPACING, RADII, GLOWS, ANIMATIONS,
} from './foundationsData';

interface FoundationsProps {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

function ColorSwatch({ name, varName, hex, tw, usage }: { name: string; varName: string; hex: string; tw: string; usage: string }) {
  const isRgba = hex.startsWith('rgba');
  return (
    <div className="flex items-start gap-3 py-2">
      <div
        className="w-10 h-10 rounded-lg border border-surface-border flex-shrink-0"
        style={{ background: isRgba ? hex : undefined, backgroundColor: !isRgba ? hex : undefined }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-sans text-[13px] text-foreground font-medium">{name}</span>
          <code className="font-mono text-[10px] text-primary bg-primary-muted px-1.5 py-0.5 rounded">{varName}</code>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <code className="font-mono text-[10px] text-text-muted">{hex}</code>
          <code className="font-mono text-[10px] text-text-muted">{tw}</code>
        </div>
        <p className="font-sans text-[11px] text-text-muted mt-0.5">{usage}</p>
      </div>
    </div>
  );
}

function ColorGroup({ label, colors }: { label: string; colors: typeof BRAND_COLORS }) {
  return (
    <div className="mb-6">
      <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-3 font-semibold">{label}</p>
      <div className="rounded-xl border border-surface-border p-4 space-y-1" style={{ background: 'var(--surface)' }}>
        {colors.map(c => <ColorSwatch key={c.var} name={c.name} varName={c.var} hex={c.hex} tw={c.tw} usage={c.usage} />)}
      </div>
    </div>
  );
}

export default function Foundations({ copyCode, copied }: FoundationsProps) {
  return (
    <section id="foundations" className="scroll-mt-20 mb-24">
      <div className="mb-8">
        <p className="font-mono text-[11px] text-primary uppercase tracking-[0.12em] mb-2 font-semibold">02</p>
        <h2 className="font-display text-[28px] sm:text-[34px] font-bold text-foreground tracking-wide">Foundations</h2>
        <p className="font-sans text-[14px] text-text-secondary mt-2 max-w-[500px] leading-relaxed">
          Design tokens are the atomic building blocks. Every visual decision maps to a token.
        </p>
      </div>

      {/* ── Colors ──────────────────────── */}
      <div id="colors" className="scroll-mt-24 mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-6 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" /> Colors
        </h3>
        <ColorGroup label="Brand — Orchid" colors={BRAND_COLORS} />
        <ColorGroup label="Secondary — Rose & Mint" colors={SECONDARY_COLORS} />
        <ColorGroup label="Status" colors={STATUS_COLORS} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorGroup label="Surface" colors={SURFACE_COLORS} />
          <ColorGroup label="Text" colors={TEXT_COLORS} />
        </div>
        <div className="mt-4">
          <CodeBlock code={`/* CSS */\ncolor: var(--primary);\nbackground: var(--surface);\nborder: 1px solid var(--surface-border);\n\n/* Tailwind */\n<div className="text-primary bg-surface border-surface-border" />`} id="colors-code" copyCode={copyCode} copied={copied} lang="css" />
        </div>
      </div>

      {/* ── Typography ──────────────────── */}
      <div id="typography" className="scroll-mt-24 mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-6 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" /> Typography
        </h3>
        <div className="space-y-6">
          {FONTS.map(font => (
            <div key={font.name} className="rounded-xl border border-surface-border p-5 sm:p-6" style={{ background: 'var(--surface)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h4 className="font-sans text-[15px] text-foreground font-semibold">{font.name}</h4>
                  <p className="font-mono text-[11px] text-text-muted">{font.role}</p>
                </div>
                <div className="flex gap-2">
                  <code className="font-mono text-[10px] text-primary bg-primary-muted px-1.5 py-0.5 rounded">{font.variable}</code>
                  <code className="font-mono text-[10px] text-plum bg-plum-muted px-1.5 py-0.5 rounded">{font.twClass}</code>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {font.sizes.map(size => (
                  <div key={size} className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-text-muted w-8 text-right flex-shrink-0">{size}</span>
                    <span className={font.twClass} style={{ fontSize: size, lineHeight: 1.4 }}>{font.sample}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {font.weights.map(w => (
                  <span key={w} className={`${font.twClass} text-[14px] text-text-secondary px-2 py-0.5 rounded border border-surface-border`} style={{ fontWeight: Number(w) }}>{w}</span>
                ))}
              </div>
              <p className="font-sans text-[12px] text-text-muted leading-relaxed">{font.usage}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <CodeBlock code={`/* Tailwind classes */\n<h1 className="font-display text-[28px] font-bold">Title</h1>\n<p className="font-accent text-[17px] text-plum">Byline</p>\n<p className="font-sans text-[14px]">Body text</p>\n<code className="font-mono text-[12px]">0xABCD</code>`} id="typography-code" copyCode={copyCode} copied={copied} lang="css" />
        </div>
      </div>

      {/* ── Spacing ─────────────────────── */}
      <div id="spacing" className="scroll-mt-24 mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-6 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" /> Spacing
        </h3>
        <div className="rounded-xl border border-surface-border p-5" style={{ background: 'var(--surface)' }}>
          <div className="space-y-3">
            {SPACING.map(px => (
              <div key={px} className="flex items-center gap-4">
                <span className="font-mono text-[11px] text-text-muted w-8 text-right flex-shrink-0">{px}</span>
                <div className="rounded" style={{ width: px, height: 16, background: 'linear-gradient(90deg, var(--primary), var(--plum))', opacity: 0.7 }} />
                <span className="font-mono text-[10px] text-text-muted">{px / 4}rem &middot; {px}px</span>
              </div>
            ))}
          </div>
        </div>
        <p className="font-sans text-[12px] text-text-muted mt-3 leading-relaxed">
          Use Tailwind spacing: <code className="font-mono text-primary text-[11px]">p-4</code> (16px),
          <code className="font-mono text-primary text-[11px]"> gap-6</code> (24px),
          <code className="font-mono text-primary text-[11px]"> mb-8</code> (32px). Base unit: 4px.
        </p>
      </div>

      {/* ── Radius ──────────────────────── */}
      <div id="radius" className="scroll-mt-24 mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-6 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" /> Border Radius
        </h3>
        <div className="rounded-xl border border-surface-border p-5" style={{ background: 'var(--surface)' }}>
          <div className="flex flex-wrap gap-6 items-end">
            {RADII.map(r => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 border-2 border-primary" style={{ borderRadius: r.value, background: 'var(--primary-muted)' }} />
                <span className="font-mono text-[11px] text-foreground font-medium">{r.name}</span>
                <span className="font-mono text-[10px] text-text-muted">{r.value}</span>
                <code className="font-mono text-[9px] text-primary bg-primary-muted px-1 py-0.5 rounded">{r.var}</code>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <CodeBlock code={`border-radius: var(--radius-sm);   /* 8px — tags, inputs */\nborder-radius: var(--radius-md);   /* 12px — cards, buttons */\nborder-radius: var(--radius-lg);   /* 16px — large cards, modals */\nborder-radius: var(--radius-full); /* 9999px — pills, badges */`} id="radius-code" copyCode={copyCode} copied={copied} lang="css" />
        </div>
      </div>

      {/* ── Shadows & Glows ─────────────── */}
      <div id="shadows" className="scroll-mt-24 mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-6 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" /> Shadows &amp; Glows
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {GLOWS.map(g => (
            <div key={g.name} className="flex flex-col items-center gap-3 py-4">
              <div className={`w-16 h-16 rounded-xl border border-surface-border ${g.cls}`} style={{ background: 'var(--surface)' }} />
              <span className="font-sans text-[12px] text-foreground font-medium text-center">{g.name}</span>
              <code className="font-mono text-[10px] text-text-muted">.{g.cls}</code>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-surface-border p-5" style={{ background: 'var(--surface)' }}>
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-3 font-semibold">Text Glows</p>
          <div className="flex flex-wrap gap-6">
            <span className="text-glow-primary text-primary font-display text-[18px] font-bold">Primary Text Glow</span>
            <span className="text-glow-plum text-plum font-display text-[18px] font-bold">Rose Text Glow</span>
          </div>
          <div className="mt-3 flex gap-2">
            <code className="font-mono text-[10px] text-text-muted">.text-glow-primary</code>
            <code className="font-mono text-[10px] text-text-muted">.text-glow-plum</code>
          </div>
        </div>
      </div>

      {/* ── Animations ──────────────────── */}
      <div id="animations" className="scroll-mt-24">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-6 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" /> Animations
        </h3>
        <div className="space-y-4">
          {ANIMATIONS.map(a => (
            <div key={a.name} className="rounded-xl border border-surface-border p-5 flex items-center gap-5" style={{ background: 'var(--surface)' }}>
              <div className="flex-shrink-0">
                {a.sample === 'gradient' ? (
                  <span className={`${a.cls} font-display text-[20px] font-bold`}>Nudge</span>
                ) : (
                  <div className={`w-12 h-12 rounded-lg border border-surface-border ${a.cls}`} style={{ background: 'var(--primary-muted)' }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-sans text-[14px] text-foreground font-medium">{a.name}</span>
                <p className="font-sans text-[12px] text-text-muted mt-0.5">{a.desc}</p>
                <code className="font-mono text-[10px] text-primary bg-primary-muted px-1.5 py-0.5 rounded mt-1 inline-block">.{a.cls}</code>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-surface-border p-5" style={{ background: 'var(--surface)' }}>
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-3 font-semibold">Divider</p>
          <div className="n2-divider w-full mb-3" />
          <code className="font-mono text-[10px] text-text-muted">.n2-divider</code>
        </div>
      </div>
    </section>
  );
}
