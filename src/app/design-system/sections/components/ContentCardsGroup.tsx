'use client';

import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function ContentCardsGroup({ copyCode, copied }: Props) {
  return (
    <>
      {/* ── JourneyCard ────────────── */}
      <ComponentDoc
        id="comp-journey-card"
        name="JourneyCard"
        description="Goal progress tracker with zone-driven styling (starting, progressing, almost there)."
        forDesigner="Card border and bg shift by zone: starting (primary), progressing (plum), almost (safe). Step indicators show completed vs remaining. Progress percentage in bold."
        forDev="Zone determines styling: starting → border-primary/20 bg-primary/5, progressing → border-plum/20 bg-plum-muted/50, almost → border-safe/20 bg-safe-bg. Steps rendered as dots/checks."
        preview={
          <div className="w-full max-w-[360px] space-y-3">
            <div className="card rounded-2xl" style={{ borderColor: 'rgba(163,102,255,0.2)', background: 'rgba(163,102,255,0.05)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-[14px] font-semibold text-foreground">Learn DeFi</span>
                <span className="font-mono text-[12px] text-primary font-bold">25%</span>
              </div>
              <div className="stat-bar"><div className="stat-bar-fill stat-bar-fill-primary" style={{ width: '25%' }} /></div>
              <p className="font-mono text-[10px] text-text-muted mt-2">2 of 8 steps complete</p>
            </div>
            <div className="card rounded-2xl" style={{ borderColor: 'rgba(46,216,138,0.2)', background: 'rgba(46,216,138,0.05)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-[14px] font-semibold text-foreground">Emergency Fund</span>
                <span className="font-mono text-[12px] text-safe font-bold">88%</span>
              </div>
              <div className="stat-bar"><div className="stat-bar-fill stat-bar-fill-safe" style={{ width: '88%' }} /></div>
              <p className="font-mono text-[10px] text-text-muted mt-2">7 of 8 steps complete</p>
            </div>
          </div>
        }
        code={`<div className="card rounded-2xl border-primary/20 bg-primary/5">
  <div className="flex items-center justify-between mb-2">
    <span className="font-display font-semibold">{goal.name}</span>
    <span className="font-mono text-primary font-bold">{pct}%</span>
  </div>
  <div className="stat-bar">
    <div className="stat-bar-fill stat-bar-fill-primary"
      style={{ width: pct + '%' }} />
  </div>
</div>

/* Zone styling: starting → primary, progressing → plum, almost → safe
   Uses stat-bar for progress visualization */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── FirstStepsCard ─────────── */}
      <ComponentDoc
        id="comp-first-steps-card"
        name="FirstStepsCard"
        description="Onboarding checklist card guiding new users through their first actions."
        forDesigner="Card with primary accent (border-primary/20, bg-primary/5). Checklist items with check/circle indicators. Completed items: text-safe check. Pending: muted circle."
        forDev="Card: card rounded-2xl border-primary/20 bg-primary/5. Steps from firstSteps data. Completed tracked via localStorage activities. Progress: completed/total."
        preview={
          <div className="card rounded-2xl max-w-[360px] w-full" style={{ borderColor: 'rgba(163,102,255,0.2)', background: 'rgba(163,102,255,0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-display text-[15px] font-semibold text-foreground">First Steps</span>
              <span className="font-mono text-[11px] text-primary">2 / 5</span>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Connect wallet', done: true },
                { label: 'Complete quiz', done: true },
                { label: 'Check your HF', done: false },
                { label: 'Read an education module', done: false },
                { label: 'Set up Telegram alerts', done: false },
              ].map(step => (
                <div key={step.label} className="flex items-center gap-2">
                  {step.done ? (
                    <span className="text-safe text-[14px]">&#x2713;</span>
                  ) : (
                    <span className="text-text-muted text-[14px]">&#x25cb;</span>
                  )}
                  <span className={`text-[13px] ${step.done ? 'text-text-muted line-through' : 'text-text-secondary'}`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        }
        code={`<div className="card rounded-2xl border-primary/20 bg-primary/5">
  <div className="flex items-center justify-between mb-3">
    <span className="font-display font-semibold">First Steps</span>
    <span className="font-mono text-primary">{done} / {total}</span>
  </div>
  {steps.map(step => (
    <div className="flex items-center gap-2">
      {step.done ? <span className="text-safe">✓</span>
        : <span className="text-text-muted">○</span>}
      <span className={step.done ? 'line-through text-text-muted' : ''}>
        {step.label}
      </span>
    </div>
  ))}
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── NudgeHistoryCard ─────── */}
      <ComponentDoc
        id="comp-nudge-history-card"
        name="NudgeHistoryCard"
        description="Timeline of past nudges with severity-colored borders and time-ago formatting."
        forDesigner="List of card items, each with severity-driven left border: info (primary), warning (attention), critical (danger). Time-ago in text-muted. Most recent first."
        forDev="Card: card rounded-lg with dynamic borderColor. Nudge type/severity determines color. Time formatted as relative (e.g., '2h ago'). Data from useNudges hook."
        preview={
          <div className="w-full max-w-[360px] space-y-2">
            {[
              { type: 'info', msg: 'Portfolio looks healthy. Keep monitoring.', time: '2h ago', color: 'var(--primary)' },
              { type: 'warning', msg: 'SOL concentration above 70%. Consider diversifying.', time: '1d ago', color: 'var(--attention)' },
              { type: 'critical', msg: 'HF dropped below 1.2. Add collateral recommended.', time: '3d ago', color: 'var(--danger)' },
            ].map((n, i) => (
              <div key={i} className="card rounded-lg" style={{ borderLeftWidth: 3, borderLeftColor: n.color }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: n.color }}>{n.type}</span>
                  <span className="font-mono text-[10px] text-text-muted">{n.time}</span>
                </div>
                <p className="font-sans text-[13px] text-text-secondary leading-relaxed">{n.msg}</p>
              </div>
            ))}
          </div>
        }
        code={`{nudges.map(n => (
  <div className="card rounded-lg"
    style={{ borderLeftWidth: 3, borderLeftColor: severityColor(n) }}>
    <div className="flex justify-between">
      <span className="font-mono text-[10px] uppercase"
        style={{ color: severityColor(n) }}>{n.type}</span>
      <span className="text-text-muted">{timeAgo(n.date)}</span>
    </div>
    <p className="text-[13px] text-text-secondary">{n.message}</p>
  </div>
))}

/* Severity colors: info→primary, warning→attention, critical→danger
   Left border accent: 3px solid severityColor */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── AddIntegrationCard ───── */}
      <ComponentDoc
        id="comp-add-integration-card"
        name="AddIntegrationCard"
        description="Minimalist CTA card for adding new integrations (Telegram, etc). Centered plus icon with title."
        forDesigner="Card with centered layout. Plus icon: 44px circle, primary-muted bg, primary/30 border. Title in font-display. Subtitle in text-secondary. Hover lifts card."
        forDev="Standard card base. CTA triggers integration flow (e.g., Telegram linking). Icon container: rounded-full border-primary/30 bg-primary-muted/30."
        preview={
          <div className="card rounded-2xl max-w-[300px] w-full text-center cursor-pointer">
            <div className="mx-auto w-11 h-11 rounded-full border flex items-center justify-center mb-3"
              style={{ borderColor: 'rgba(163,102,255,0.3)', background: 'rgba(163,102,255,0.06)' }}>
              <span className="text-primary text-[20px]">+</span>
            </div>
            <p className="font-display text-[15px] font-semibold text-foreground">Add Integration</p>
            <p className="font-sans text-[13px] text-text-secondary mt-1">Connect Telegram for alerts</p>
          </div>
        }
        code={`<div className="card rounded-2xl text-center cursor-pointer">
  <div className="mx-auto w-11 h-11 rounded-full border
    border-primary/30 bg-primary-muted/30
    flex items-center justify-center mb-3">
    <span className="text-primary text-[20px]">+</span>
  </div>
  <p className="font-display font-semibold">{title}</p>
  <p className="text-[13px] text-text-secondary">{subtitle}</p>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── BeginnerKaminoCard ──── */}
      <ComponentDoc
        id="comp-beginner-kamino-card"
        name="BeginnerKaminoCard"
        description="Educational card for users without a Kamino position. Explains lending with dual CTA buttons."
        forDesigner="Card with rounded-2xl. Informative title + body text. Two CTAs at bottom: secondary (learn more) + primary (go to Kamino). Friendly, non-technical tone."
        forDev="Shown when position is null. Card base. Two buttons: n2-btn-secondary (opens education modal) + n2-btn-primary (external link to Kamino). Responsive button layout."
        preview={
          <div className="card rounded-2xl max-w-[360px] w-full">
            <p className="font-display text-[16px] font-semibold text-foreground mb-2">New to Kamino?</p>
            <p className="font-sans text-[13px] text-text-secondary leading-relaxed mb-4">
              Kamino lets you lend and borrow on Solana. Connect your position to get personalized nudges and track your Health Factor.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="n2-btn-secondary">Learn More</button>
              <button className="n2-btn-primary">Open Kamino</button>
            </div>
          </div>
        }
        code={`<div className="card rounded-2xl">
  <p className="font-display font-semibold">New to Kamino?</p>
  <p className="text-[13px] text-text-secondary">
    Explanatory text about Kamino lending...
  </p>
  <div className="flex gap-3">
    <button className="n2-btn-secondary">Learn More</button>
    <button className="n2-btn-primary">Open Kamino</button>
  </div>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
