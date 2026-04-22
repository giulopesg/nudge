export default function GettingStarted() {
  return (
    <section id="getting-started" className="scroll-mt-20 mb-24">
      {/* Hero */}
      <div className="mb-12">
        <div className="n2-divider w-16 mb-6" />
        <h1 className="font-display text-[32px] sm:text-[42px] font-bold text-foreground leading-tight tracking-wide">
          Nudge Design System
        </h1>
        <p className="font-accent text-[18px] sm:text-[22px] text-plum mt-2">
          N2DS &mdash; version three
        </p>
        <p className="font-sans text-[15px] text-text-secondary mt-4 max-w-[560px] leading-relaxed">
          The visual vocabulary of Nudge &mdash; a behavioral DeFi companion on Solana.
          Tokens, components, and patterns for designers and developers.
        </p>
      </div>

      {/* Philosophy */}
      <div
        className="rounded-xl border border-surface-border p-6 sm:p-8 mb-10"
        style={{ background: 'rgba(255, 248, 245, 0.015)' }}
      >
        <p className="font-mono text-[10px] text-primary uppercase tracking-[0.12em] mb-3 font-semibold">
          Visual Philosophy
        </p>
        <p className="font-display text-[17px] sm:text-[20px] text-foreground leading-relaxed font-normal italic">
          &ldquo;Bioluminescence, not neon. Bloom, not glow. Breath, not glitch.
          Feminine power encoded in every pixel.&rdquo;
        </p>
      </div>

      {/* Stack */}
      <div className="mb-10">
        <h2 className="font-display text-[18px] font-bold text-foreground mb-4 tracking-wide">
          Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Framework', value: 'Next.js 16' },
            { label: 'UI', value: 'React 19' },
            { label: 'Styling', value: 'Tailwind v4' },
            { label: 'Language', value: 'TypeScript' },
          ].map(item => (
            <div key={item.label} className="rounded-lg border border-surface-border p-3" style={{ background: 'var(--surface)' }}>
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-1">{item.label}</p>
              <p className="font-sans text-[14px] text-foreground font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two audiences */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {/* Designer path */}
        <div className="rounded-xl border border-surface-border p-6" style={{ background: 'rgba(163, 102, 255, 0.03)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[20px]">&#x1f3a8;</span>
            <h3 className="font-display text-[17px] font-bold text-primary tracking-wide">For Designers</h3>
          </div>
          <ul className="space-y-2">
            {[
              'Browse visual tokens (colors, type, spacing)',
              'Copy token names for Figma layers',
              'See component anatomy and variants',
              'Follow composition patterns for new screens',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 text-[12px]">&#x25B8;</span>
                <span className="font-sans text-[13px] text-text-secondary leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dev path */}
        <div className="rounded-xl border border-surface-border p-6" style={{ background: 'rgba(255, 107, 157, 0.03)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[20px]">&#x1f4bb;</span>
            <h3 className="font-display text-[17px] font-bold text-plum tracking-wide">For Developers</h3>
          </div>
          <ul className="space-y-2">
            {[
              'Copy CSS classes and Tailwind utilities',
              'See live previews of every component state',
              'Understand hover, focus, and animation behaviors',
              'Follow patterns for consistent implementation',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-plum mt-0.5 text-[12px]">&#x25B8;</span>
                <span className="font-sans text-[13px] text-text-secondary leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Naming convention */}
      <div className="rounded-xl border border-surface-border p-6" style={{ background: 'var(--surface)' }}>
        <h3 className="font-display text-[16px] font-bold text-foreground mb-3 tracking-wide">
          Naming Convention
        </h3>
        <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">
          All design system classes use the <code className="font-mono text-primary bg-primary-muted px-1.5 py-0.5 rounded text-[12px]">n2-</code> prefix.
          CSS custom properties use <code className="font-mono text-primary bg-primary-muted px-1.5 py-0.5 rounded text-[12px]">--token-name</code> format.
          Tailwind utilities map 1:1 with tokens via <code className="font-mono text-primary bg-primary-muted px-1.5 py-0.5 rounded text-[12px]">@theme inline</code>.
        </p>
        <div className="flex flex-wrap gap-2">
          {['.n2-btn-primary', '.n2-card', '.n2-badge', '.n2-tag', '.n2-bar', '--primary', '--safe', 'text-primary', 'bg-surface'].map(cls => (
            <span key={cls} className="font-mono text-[11px] text-text-muted bg-primary-muted px-2 py-1 rounded-full border border-surface-border">
              {cls}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
