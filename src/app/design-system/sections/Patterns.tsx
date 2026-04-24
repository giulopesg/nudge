import CodeBlock from './CodeBlock';

interface PatternsProps {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function Patterns({ copyCode, copied }: PatternsProps) {
  return (
    <section id="patterns" className="scroll-mt-20 mb-24">
      <div className="mb-10">
        <p className="font-mono text-[11px] text-primary uppercase tracking-[0.12em] mb-2 font-semibold">04</p>
        <h2 className="font-display text-[28px] sm:text-[34px] font-bold text-foreground tracking-wide">
          Patterns
        </h2>
        <p className="font-sans text-[14px] text-text-secondary mt-2 max-w-[500px] leading-relaxed">
          Composition rules and layout patterns for building consistent screens.
        </p>
      </div>

      {/* ── Status States ──────────────── */}
      <div className="mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-4 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" />
          Status States
        </h3>
        <p className="font-sans text-[13px] text-text-secondary mb-6 leading-relaxed max-w-[500px]">
          The three DeFi health states drive visual language across the entire app. Every status element
          (badge, hero, progress, glow) uses the same color triplet: <strong className="text-foreground">color + bg + glow</strong>.
        </p>

        <div className="rounded-xl border border-surface-border p-5 sm:p-6" style={{ background: 'var(--surface)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="font-mono text-[10px] text-text-muted uppercase tracking-wider pb-3 pr-4">State</th>
                  <th className="font-mono text-[10px] text-text-muted uppercase tracking-wider pb-3 pr-4">Color</th>
                  <th className="font-mono text-[10px] text-text-muted uppercase tracking-wider pb-3 pr-4">Background</th>
                  <th className="font-mono text-[10px] text-text-muted uppercase tracking-wider pb-3 pr-4">Glow</th>
                  <th className="font-mono text-[10px] text-text-muted uppercase tracking-wider pb-3">When</th>
                </tr>
              </thead>
              <tbody className="font-sans text-[13px]">
                <tr className="border-b border-surface-border">
                  <td className="py-3 pr-4"><span className="text-safe font-semibold">Safe</span></td>
                  <td className="py-3 pr-4"><code className="font-mono text-[11px] text-text-muted">--safe</code></td>
                  <td className="py-3 pr-4"><code className="font-mono text-[11px] text-text-muted">--safe-bg</code></td>
                  <td className="py-3 pr-4"><code className="font-mono text-[11px] text-text-muted">--safe-glow</code></td>
                  <td className="py-3 text-text-secondary">HF &gt; 1.5</td>
                </tr>
                <tr className="border-b border-surface-border">
                  <td className="py-3 pr-4"><span className="text-attention font-semibold">Attention</span></td>
                  <td className="py-3 pr-4"><code className="font-mono text-[11px] text-text-muted">--attention</code></td>
                  <td className="py-3 pr-4"><code className="font-mono text-[11px] text-text-muted">--attention-bg</code></td>
                  <td className="py-3 pr-4"><code className="font-mono text-[11px] text-text-muted">--attention-glow</code></td>
                  <td className="py-3 text-text-secondary">HF 1.1 - 1.5</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4"><span className="text-danger font-semibold">Danger</span></td>
                  <td className="py-3 pr-4"><code className="font-mono text-[11px] text-text-muted">--danger</code></td>
                  <td className="py-3 pr-4"><code className="font-mono text-[11px] text-text-muted">--danger-bg</code></td>
                  <td className="py-3 pr-4"><code className="font-mono text-[11px] text-text-muted">--danger-glow</code></td>
                  <td className="py-3 text-text-secondary">HF &lt; 1.1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4">
          <CodeBlock
            code={`/* Status pattern: always use the triplet */
.element-safe {
  color: var(--safe);
  background: var(--safe-bg);
  box-shadow: 0 0 12px var(--safe-glow);
  border: 1px solid rgba(46, 216, 138, 0.3);
}

/* Apply to any element: badge, hero, card border, progress bar */`}
            id="pattern-status"
            copyCode={copyCode}
            copied={copied}
            lang="css"
          />
        </div>
      </div>

      {/* ── Layout Grid ────────────────── */}
      <div className="mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-4 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" />
          Layout Grid
        </h3>
        <p className="font-sans text-[13px] text-text-secondary mb-6 leading-relaxed max-w-[500px]">
          Dashboard uses a single-column layout on mobile, expanding to sidebar + content on desktop.
          Content max-width is constrained for readability.
        </p>

        <div className="rounded-xl border border-surface-border p-5 sm:p-6" style={{ background: 'var(--surface)' }}>
          {/* Desktop wireframe */}
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-3">Desktop Layout</p>
          <div className="flex gap-2 h-40 mb-6">
            <div className="w-[80px] rounded-lg border border-primary flex flex-col items-center justify-center gap-1" style={{ background: 'var(--primary-muted)' }}>
              <span className="font-mono text-[8px] text-primary">SIDEBAR</span>
              <span className="font-mono text-[7px] text-text-muted">240px fixed</span>
            </div>
            <div className="flex-1 rounded-lg border border-surface-border flex flex-col">
              <div className="h-8 border-b border-surface-border flex items-center px-3">
                <span className="font-mono text-[8px] text-text-muted">HEADER — 64px fixed</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span className="font-mono text-[8px] text-text-muted">CONTENT — max-w flexible</span>
              </div>
            </div>
          </div>

          {/* Mobile wireframe */}
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-3">Mobile Layout</p>
          <div className="w-[140px] h-48 rounded-lg border border-surface-border flex flex-col">
            <div className="h-8 border-b border-surface-border flex items-center px-2">
              <span className="font-mono text-[7px] text-text-muted">HEADER</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span className="font-mono text-[7px] text-text-muted">CONTENT</span>
            </div>
            <div className="h-10 border-t border-primary flex items-center justify-center" style={{ background: 'var(--primary-muted)' }}>
              <span className="font-mono text-[7px] text-primary">BOTTOM NAV — floating</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <CodeBlock
            code={`/* Dashboard layout structure */
<div className="dashboard-layout">
  {/* Desktop sidebar — hidden on mobile */}
  <nav className="nav-sidebar hidden md:flex">...</nav>

  {/* Fixed header */}
  <header className="dashboard-header">...</header>

  {/* Main content — padded for sidebar on md+ */}
  <main className="dashboard-main">
    <div className="max-w-[720px] mx-auto px-4 sm:px-6">
      {children}
    </div>
  </main>

  {/* Mobile bottom nav — hidden on md+ */}
  <nav className="nav-bottom flex md:hidden">...</nav>
</div>

/* Breakpoints: mobile-first
   sm: 640px  | md: 768px (sidebar appears)
   lg: 1024px | xl: 1280px (content centers) */`}
            id="pattern-layout"
            copyCode={copyCode}
            copied={copied}
          />
        </div>
      </div>

      {/* ── Glassmorphism ──────────────── */}
      <div className="mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-4 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" />
          Glassmorphism
        </h3>
        <p className="font-sans text-[13px] text-text-secondary mb-6 leading-relaxed max-w-[500px]">
          The core visual effect of Nudge. Semi-transparent surfaces with backdrop blur create depth
          against the MeshGradient + Starfield background layers.
        </p>

        <div className="rounded-xl border border-surface-border p-6" style={{ background: 'var(--surface)' }}>
          <div className="space-y-4">
            {/* Recipe */}
            <div className="space-y-2">
              {[
                { label: 'Background', value: 'rgba(255, 248, 245, 0.03)' },
                { label: 'Border', value: '1px solid rgba(163, 102, 255, 0.10)' },
                { label: 'Blur', value: 'backdrop-filter: blur(24px)' },
                { label: 'Radius', value: 'var(--radius-lg) — 16px' },
                { label: 'Hover bg', value: 'rgba(255, 248, 245, 0.06)' },
                { label: 'Hover border', value: 'rgba(163, 102, 255, 0.25)' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-text-muted w-24 flex-shrink-0">{item.label}</span>
                  <code className="font-mono text-[11px] text-primary">{item.value}</code>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <CodeBlock
            code={`/* Glassmorphism recipe */
.glass-element {
  background: var(--surface);            /* rgba(255,248,245, 0.03) */
  border: 1px solid var(--surface-border); /* rgba(163,102,255, 0.10) */
  border-radius: var(--radius-lg);       /* 16px */
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);   /* Safari */
}

/* Or use the .card class which includes all of this */`}
            id="pattern-glass"
            copyCode={copyCode}
            copied={copied}
            lang="css"
          />
        </div>
      </div>

      {/* ── Background Layers ──────────── */}
      <div className="mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-4 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" />
          Background Layers
        </h3>
        <p className="font-sans text-[13px] text-text-secondary mb-6 leading-relaxed max-w-[500px]">
          Three z-index layers create visual depth. All content floats above the animated backgrounds.
        </p>

        <div className="rounded-xl border border-surface-border p-5" style={{ background: 'var(--surface)' }}>
          <div className="space-y-3">
            {[
              { z: 'z-0', name: 'MeshGradient', desc: 'WebGL animated gradient mesh. Slow, organic movement.', color: 'var(--primary)' },
              { z: 'z-1', name: 'StarfieldOverlay', desc: 'Canvas particle system. Subtle twinkling stars.', color: 'var(--plum)' },
              { z: 'z-10', name: 'Content', desc: 'All UI components, cards, text, and interactive elements.', color: 'var(--foreground)' },
            ].map(layer => (
              <div key={layer.z} className="flex items-center gap-4 py-2">
                <code className="font-mono text-[11px] font-bold w-8 flex-shrink-0" style={{ color: layer.color }}>{layer.z}</code>
                <div>
                  <span className="font-sans text-[13px] text-foreground font-medium">{layer.name}</span>
                  <p className="font-sans text-[11px] text-text-muted">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Responsive Pattern ─────────── */}
      <div className="mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-4 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" />
          Responsive
        </h3>
        <p className="font-sans text-[13px] text-text-secondary mb-6 leading-relaxed max-w-[500px]">
          Mobile-first. Key breakpoints and what changes at each.
        </p>

        <div className="rounded-xl border border-surface-border p-5" style={{ background: 'var(--surface)' }}>
          <div className="space-y-3">
            {[
              { bp: 'Base', px: '0px', changes: 'Single column, bottom nav, compact padding (16px), smaller text' },
              { bp: 'sm', px: '640px', changes: 'Card padding grows to 24px, button padding increases, 2-col grids appear' },
              { bp: 'md', px: '768px', changes: 'Sidebar appears (240px), bottom nav hides, header spans full width' },
              { bp: 'lg', px: '1024px', changes: 'Content area widens, more horizontal space for cards' },
              { bp: 'xl', px: '1280px', changes: 'Content centers on viewport, sidebar gap collapses' },
            ].map(item => (
              <div key={item.bp} className="flex items-start gap-3 py-1">
                <code className="font-mono text-[12px] text-primary font-semibold w-10 flex-shrink-0">{item.bp}</code>
                <code className="font-mono text-[10px] text-text-muted w-12 flex-shrink-0 pt-0.5">{item.px}</code>
                <span className="font-sans text-[12px] text-text-secondary leading-relaxed">{item.changes}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Brand Header ───────────────── */}
      <div className="mb-14">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-4 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" />
          Brand Header
        </h3>
        <p className="font-sans text-[13px] text-text-secondary mb-6 leading-relaxed max-w-[500px]">
          Every page must show <strong className="text-foreground">name + byline</strong>, never just the name.
          This is a mandatory pattern.
        </p>

        <div className="rounded-xl border border-surface-border p-6" style={{ background: 'rgba(255, 248, 245, 0.015)' }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="n2-gradient-text font-display text-[20px] sm:text-[28px] font-bold uppercase tracking-[0.06em]">
              Nudge
            </span>
            <span className="font-accent text-[11px] sm:text-[17px] text-plum">
              by Giuliana
            </span>
          </div>
        </div>

        <div className="mt-4">
          <CodeBlock
            code={`{/* Brand header — MANDATORY on every page */}
<div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
  <span className="n2-gradient-text font-display text-[20px] sm:text-[28px]
    font-bold uppercase tracking-[0.06em]">
    {t('brand.name')}
  </span>
  <span className="font-accent text-[11px] sm:text-[17px] text-plum">
    {t('brand.byline')}
  </span>
</div>`}
            id="pattern-brand"
            copyCode={copyCode}
            copied={copied}
          />
        </div>
      </div>

    </section>
  );
}
