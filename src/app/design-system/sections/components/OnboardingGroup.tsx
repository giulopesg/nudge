'use client';

import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function OnboardingGroup({ copyCode, copied }: Props) {
  return (
    <>
      {/* ── PermissionsStep ────────── */}
      <ComponentDoc
        id="comp-permissions-step"
        name="PermissionsStep"
        description="First onboarding step showing what Nudge can and cannot do. Dual-column trust matrix."
        forDesigner="Two side-by-side cards: 'Can do' (safe/green border + bg) and 'Can&apos;t do' (danger/red border + bg). List items with check/cross icons. Centered layout, max-w-md."
        forDev="Cards: card rounded-xl with border-safe/20 bg-safe-bg/50 (can) and border-danger/20 bg-danger-bg/50 (cannot). Text from i18n onboarding namespace."
        preview={
          <div className="w-full max-w-[400px] grid grid-cols-2 gap-3">
            <div className="card rounded-xl" style={{ borderColor: 'rgba(46,216,138,0.2)', background: 'rgba(46,216,138,0.05)' }}>
              <p className="font-mono text-[10px] text-safe uppercase tracking-wider mb-2 font-semibold">Can Do</p>
              <ul className="space-y-1.5 text-[12px] text-text-secondary">
                <li className="flex items-start gap-1.5"><span className="text-safe">&#x2713;</span> Read your positions</li>
                <li className="flex items-start gap-1.5"><span className="text-safe">&#x2713;</span> Send alerts</li>
                <li className="flex items-start gap-1.5"><span className="text-safe">&#x2713;</span> Track goals</li>
              </ul>
            </div>
            <div className="card rounded-xl" style={{ borderColor: 'rgba(255,77,106,0.2)', background: 'rgba(255,77,106,0.05)' }}>
              <p className="font-mono text-[10px] text-danger uppercase tracking-wider mb-2 font-semibold">Cannot Do</p>
              <ul className="space-y-1.5 text-[12px] text-text-secondary">
                <li className="flex items-start gap-1.5"><span className="text-danger">&#x2717;</span> Move your funds</li>
                <li className="flex items-start gap-1.5"><span className="text-danger">&#x2717;</span> Sign transactions</li>
                <li className="flex items-start gap-1.5"><span className="text-danger">&#x2717;</span> Access private keys</li>
              </ul>
            </div>
            <div className="col-span-2 flex flex-wrap gap-2">
              <CopyInline value="border-safe/20" />
              <CopyInline value="bg-safe-bg/50" />
              <CopyInline value="border-danger/20" />
              <CopyInline value="bg-danger-bg/50" />
            </div>
          </div>
        }
        code={`<div className="grid grid-cols-2 gap-3">
  {/* Can do */}
  <div className="card rounded-xl border-safe/20 bg-safe-bg/50">
    <p className="font-mono text-[10px] text-safe uppercase">Can Do</p>
    <ul>{canItems.map(i => <li>✓ {i}</li>)}</ul>
  </div>

  {/* Cannot do */}
  <div className="card rounded-xl border-danger/20 bg-danger-bg/50">
    <p className="font-mono text-[10px] text-danger uppercase">Cannot</p>
    <ul>{cannotItems.map(i => <li>✗ {i}</li>)}</ul>
  </div>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── QuizStep ───────────────── */}
      <ComponentDoc
        id="comp-quiz-step"
        name="QuizStep"
        description="Behavioral quiz with single-select and multi-select questions. Determines neurotags for RPG class."
        forDesigner="One question at a time. Options as pill buttons: default state (surface bg, surface-border) and selected state (primary-muted bg, primary border + glow). Progress dots at top."
        forDev="Sequential questions from quiz data. Gender (q0) → 4 personality questions (q1-q4) → multi-select traits (q5). Selected state: border-primary bg-primary-muted shadow glow."
        preview={
          <div className="w-full max-w-[360px]">
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-1">Question 2 of 6</p>
            <h3 className="font-display text-[18px] font-bold text-foreground mb-4">
              When making financial decisions, you prefer to...
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Research extensively first', selected: true },
                { label: 'Follow trusted recommendations', selected: false },
                { label: 'Go with gut feeling', selected: false },
                { label: 'Wait and observe others', selected: false },
              ].map(opt => (
                <button key={opt.label} className="w-full text-left rounded-xl border px-4 py-3 transition-all text-[14px]"
                  style={{
                    borderColor: opt.selected ? 'var(--primary)' : 'var(--surface-border)',
                    background: opt.selected ? 'var(--primary-muted)' : 'var(--surface)',
                    color: opt.selected ? 'var(--primary)' : 'var(--text-secondary)',
                    boxShadow: opt.selected ? '0 0 12px var(--primary-glow)' : 'none',
                  }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        }
        code={`{options.map(opt => (
  <button
    className="w-full text-left rounded-xl border px-4 py-3"
    style={{
      borderColor: selected ? 'var(--primary)' : 'var(--surface-border)',
      background: selected ? 'var(--primary-muted)' : 'var(--surface)',
      color: selected ? 'var(--primary)' : 'var(--text-secondary)',
      boxShadow: selected ? '0 0 12px var(--primary-glow)' : 'none',
    }}>
    {opt.label}
  </button>
))}

/* Selected: primary border + primary-muted bg + glow shadow
   Default: surface-border + surface bg */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── GoalsStep ──────────────── */}
      <ComponentDoc
        id="comp-goals-step"
        name="GoalsStep"
        description="Goal selection step — pick up to 3 financial goals from 5 options with icon labels."
        forDesigner="Goal buttons: icon (emoji) + label. Selected: primary border + glow + primary-muted bg. Disabled when max (3) reached and not selected. Counter shows selected/max."
        forDev="Toggle selection with max 3 constraint. Goals: reserva, independencia, aprender, rendimento, remessas. Labels from i18n goals namespace. Icons hardcoded."
        preview={
          <div className="w-full max-w-[360px] space-y-2">
            {[
              { icon: '\u{1F6E1}\u{FE0F}', label: 'Build emergency fund', selected: true },
              { icon: '\u{1F511}', label: 'Financial independence', selected: true },
              { icon: '\u{1F4DA}', label: 'Learn DeFi', selected: false },
              { icon: '\u{1F4C8}', label: 'Generate yield', selected: false },
              { icon: '\u{1F30D}', label: 'Cross-border transfers', selected: false },
            ].map(g => (
              <button key={g.label} className="w-full flex items-center gap-3 rounded-xl border px-4 py-3 transition-all text-left"
                style={{
                  borderColor: g.selected ? 'var(--primary)' : 'var(--surface-border)',
                  background: g.selected ? 'var(--primary-muted)' : 'var(--surface)',
                  boxShadow: g.selected ? '0 0 12px var(--primary-glow)' : 'none',
                }}>
                <span className="text-[20px]">{g.icon}</span>
                <span className="text-[14px]" style={{ color: g.selected ? 'var(--primary)' : 'var(--text-secondary)' }}>{g.label}</span>
              </button>
            ))}
            <p className="font-mono text-[11px] text-text-muted text-center mt-2">2 / 3 selected</p>
          </div>
        }
        code={`{ALL_GOALS.map(goalId => (
  <button
    className="w-full flex items-center gap-3 rounded-xl border px-4 py-3"
    style={{
      borderColor: selected ? 'var(--primary)' : 'var(--surface-border)',
      background: selected ? 'var(--primary-muted)' : 'var(--surface)',
      boxShadow: selected ? '0 0 12px var(--primary-glow)' : 'none',
    }}
    onClick={() => toggle(goalId)}
    disabled={!isSelected && count >= MAX_GOALS}>
    <span>{GOAL_ICONS[goalId]}</span>
    <span>{t(goalId + '.label')}</span>
  </button>
))}

/* Max 3 goals. Disabled when limit reached. Same select pattern as QuizStep */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── ProfileStep ────────────── */}
      <ComponentDoc
        id="comp-profile-step"
        name="ProfileStep"
        description="Profile preview showing generated RPG character, selected goals, and neurotags before registration."
        forDesigner="Centered layout with CharacterCard at top. Below: goal list in a card with primary-muted bg. Neurotag trait-tags at bottom. Continue button to proceed."
        forDev="Renders CharacterCard (from buildCharacter), goals list from i18n, visible traits from getVisibleTraits. Card: border-primary/20 bg-primary-muted/30."
        preview={
          <div className="w-full max-w-[360px] space-y-3">
            <div className="card rounded-xl">
              <div className="flex gap-3">
                <div className="w-[60px] h-[60px] rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--primary-muted), var(--plum-muted))' }}>
                  <span className="text-[24px]">&#x2726;</span>
                </div>
                <div>
                  <p className="font-display text-[16px] font-bold text-foreground">Guardia</p>
                  <p className="font-mono text-[9px] text-primary uppercase">Tier I</p>
                </div>
              </div>
            </div>
            <div className="card rounded-xl" style={{ borderColor: 'rgba(163,102,255,0.2)', background: 'rgba(163,102,255,0.06)' }}>
              <p className="font-mono text-[10px] text-primary uppercase tracking-wider mb-1.5">Goals</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2 text-[13px] text-foreground">
                  <span className="text-primary text-[11px] mt-0.5">&#x25b6;</span> Emergency fund
                </li>
                <li className="flex items-start gap-2 text-[13px] text-foreground">
                  <span className="text-primary text-[11px] mt-0.5">&#x25b6;</span> Learn DeFi
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="trait-tag" style={{ fontSize: 11, padding: '5px 10px' }}>Cautelosa</span>
              <span className="trait-tag" style={{ fontSize: 11, padding: '5px 10px' }}>Meticulosa</span>
            </div>
          </div>
        }
        code={`{/* Character preview */}
<CharacterCard character={character} gender={gender} />

{/* Goals card */}
<div className="card rounded-xl border-primary/20 bg-primary-muted/30">
  <p className="font-mono text-[10px] text-primary uppercase">Goals</p>
  <ul>{goals.map(g => <li>▶ {t(g + '.label')}</li>)}</ul>
</div>

{/* Neurotags */}
<div className="flex flex-wrap gap-2">
  {traits.map(t => <span className="trait-tag">{t}</span>)}
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── RegistrationStep ─────── */}
      <ComponentDoc
        id="comp-registration-step"
        name="RegistrationStep"
        description="Final onboarding step — on-chain registration via Solana Memo Program with status feedback."
        forDesigner="Status-driven UI: idle (CTA button), signing (loading spinner), confirming (progress text), success (green check + tx hash), error (red message). Hash display in mono."
        forDev="Uses useWallet + useConnection. Sends memo transaction via sendRegistration. Status enum: idle, signing, confirming, success, error. TX hash linkable to Solscan."
        preview={
          <div className="w-full max-w-[360px] space-y-4">
            <div className="text-center space-y-3">
              <p className="font-display text-[18px] font-bold text-foreground">Register On-Chain</p>
              <p className="font-sans text-[13px] text-text-secondary leading-relaxed">
                Your profile will be hashed and recorded on the Solana blockchain via Memo Program.
              </p>
              <div className="rounded-lg border border-surface-border p-3" style={{ background: 'rgba(7,5,14,0.4)' }}>
                <p className="font-mono text-[10px] text-text-muted mb-1">Profile Hash</p>
                <p className="font-mono text-[11px] text-primary break-all">a3f7b2...c891d4</p>
              </div>
              <button className="n2-btn-primary">Sign &amp; Register</button>
            </div>
            <div className="rounded-lg border p-3" style={{ borderColor: 'rgba(46,216,138,0.3)', background: 'rgba(46,216,138,0.05)' }}>
              <div className="flex items-center gap-2">
                <span className="text-safe">&#x2713;</span>
                <span className="font-mono text-[12px] text-safe font-semibold">Success!</span>
              </div>
              <p className="font-mono text-[10px] text-text-muted mt-1 break-all">TX: 4xKp...9mZq</p>
            </div>
          </div>
        }
        code={`{/* Idle state */}
<button className="n2-btn-primary" onClick={handleRegister}>
  Sign & Register
</button>

{/* Profile hash display */}
<div className="rounded-lg border border-surface-border p-3">
  <p className="font-mono text-[10px] text-text-muted">Profile Hash</p>
  <p className="font-mono text-[11px] text-primary">{hash}</p>
</div>

{/* Success state */}
<div className="border-safe/30 bg-safe/5 rounded-lg p-3">
  <span className="text-safe font-semibold">✓ Success!</span>
  <p className="font-mono text-[10px]">TX: {txSignature}</p>
</div>

/* Status flow: idle → signing → confirming → success | error
   Uses Solana Memo Program for on-chain profile registration */`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
