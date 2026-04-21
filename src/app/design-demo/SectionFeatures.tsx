'use client';

import { SectionTitle, Label, strong, accent, mono } from './helpers';

export default function SectionFeatures() {
  return (
    <>
      {/* ===== Lyra — AI Assistant ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Lyra — AI Assistant</SectionTitle>
        <div className="n2-card" style={{ padding: 36 }}>
          {/* Two-column: buttons left, chat panel right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28 }}>

            {/* Left — Floating buttons + description */}
            <div>
              <Label>Floating Button</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 16 }}>
                {/* Inactive state — primary glow */}
                <div className="n2-animate-float" style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid rgba(163,102,255,0.4)', background: 'linear-gradient(135deg, #1a1028, #0d0b15)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px var(--n2-primary-glow)', overflow: 'hidden' }}>
                    <svg viewBox="0 0 56 56" width="56" height="56" style={{ borderRadius: '50%' }}>
                      <defs><radialGradient id="lyra-bg-p"><stop offset="0%" stopColor="#1a1028" /><stop offset="100%" stopColor="#0d0b15" /></radialGradient></defs>
                      <circle cx="28" cy="28" r="28" fill="url(#lyra-bg-p)" />
                      <circle cx="28" cy="20" r="9" fill="#2a1f3e" />
                      <path d="M18 19c2-8 18-8 20 0" fill="#00D4AA" opacity="0.7" />
                      <circle cx="25" cy="21" r="1.5" fill="#e8dff5" /><circle cx="31" cy="21" r="1.5" fill="#e8dff5" />
                      <circle cx="25.8" cy="20.6" r="0.5" fill="white" /><circle cx="31.8" cy="20.6" r="0.5" fill="white" />
                      <path d="M26 24.5 Q28 26 30 24.5" fill="none" stroke="#e8dff5" strokeWidth="0.8" opacity="0.6" />
                      <ellipse cx="28" cy="40" rx="12" ry="14" fill="#2a1f3e" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--n2-text-muted)', textTransform: 'uppercase' as const }}>LYRA</span>
                  <span style={{ fontFamily: mono, fontSize: 9, color: 'var(--n2-text-muted)', opacity: 0.6 }}>INACTIVE</span>
                </div>
                {/* Active state — plum glow */}
                <div className="n2-animate-float" style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid rgba(181,122,255,0.6)', background: 'linear-gradient(135deg, #1a1028, #0d0b15)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(181,122,255,0.3)', overflow: 'hidden' }}>
                    <svg viewBox="0 0 56 56" width="56" height="56" style={{ borderRadius: '50%' }}>
                      <defs><radialGradient id="lyra-bg-a"><stop offset="0%" stopColor="#1a1028" /><stop offset="100%" stopColor="#0d0b15" /></radialGradient></defs>
                      <circle cx="28" cy="28" r="28" fill="url(#lyra-bg-a)" />
                      <circle cx="28" cy="20" r="9" fill="#2a1f3e" />
                      <path d="M18 19c2-8 18-8 20 0" fill="#A366FF" opacity="0.7" />
                      <circle cx="25" cy="21" r="1.5" fill="#e8dff5" /><circle cx="31" cy="21" r="1.5" fill="#e8dff5" />
                      <circle cx="25.8" cy="20.6" r="0.5" fill="white" /><circle cx="31.8" cy="20.6" r="0.5" fill="white" />
                      <path d="M26 24.5 Q28 26 30 24.5" fill="none" stroke="#e8dff5" strokeWidth="0.8" opacity="0.6" />
                      <ellipse cx="28" cy="40" rx="12" ry="14" fill="#2a1f3e" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--n2-text-muted)', textTransform: 'uppercase' as const }}>LYRA</span>
                  <span style={{ fontFamily: mono, fontSize: 9, color: 'var(--n2-xp)', opacity: 0.8 }}>ACTIVE</span>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <p style={{ fontFamily: strong, fontSize: 15, fontWeight: 600, color: 'var(--n2-text)' }}>SVG avatar + animated float</p>
                <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 400, color: 'var(--n2-text-muted)', marginTop: 4, lineHeight: 1.6 }}>
                  Teal hair (inactive) &rarr; Orchid hair (active). Glow matches state. Fixed position, bottom-right corner.
                </p>
              </div>
            </div>

            {/* Right — Chat Panel */}
            <div>
              <Label>Chat Panel</Label>
              <div className="n2-chat-panel" style={{ marginTop: 12 }}>
                {/* Header with avatar */}
                <div className="n2-chat-header">
                  <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(181,122,255,0.3)', boxShadow: '0 0 12px rgba(181,122,255,0.2)', overflow: 'hidden', flexShrink: 0 }}>
                    <svg viewBox="0 0 36 36" width="36" height="36">
                      <circle cx="18" cy="18" r="18" fill="#1a1028" />
                      <circle cx="18" cy="13" r="6" fill="#2a1f3e" />
                      <path d="M12 12c1-5 11-5 12 0" fill="#A366FF" opacity="0.7" />
                      <circle cx="16" cy="13.5" r="1" fill="#e8dff5" /><circle cx="20" cy="13.5" r="1" fill="#e8dff5" />
                      <ellipse cx="18" cy="26" rx="8" ry="9" fill="#2a1f3e" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: strong, fontSize: 15, fontWeight: 700, color: 'var(--n2-text)' }}>Lyra</p>
                    <p style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)' }}>Nudge Guide</p>
                  </div>
                  <span style={{ fontFamily: strong, fontSize: 18, color: 'var(--n2-text-muted)', cursor: 'pointer' }}>&times;</span>
                </div>

                {/* XP progress indicator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 16px', borderBottom: '1px solid rgba(181,122,255,0.15)', background: 'var(--n2-xp-muted)', fontSize: 11, fontFamily: mono }}>
                  <span style={{ color: 'var(--n2-xp)' }}>2/3 topics explored</span>
                  <span style={{ color: 'var(--n2-xp)', fontWeight: 700 }}>+50 XP</span>
                </div>

                {/* Messages with mini avatars */}
                <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, marginTop: 2 }}>
                      <svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="12" fill="#1a1028" /><circle cx="12" cy="9" r="4" fill="#2a1f3e" /><path d="M8 8c1-3 7-3 8 0" fill="#A366FF" opacity="0.7" /><ellipse cx="12" cy="17" rx="5" ry="6" fill="#2a1f3e" /></svg>
                    </div>
                    <div className="n2-msg-lyra">Hi! I&apos;m Lyra, your personal guide in the DeFi universe.</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="n2-msg-user">What is Health Factor?</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, marginTop: 2 }}>
                      <svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="12" fill="#1a1028" /><circle cx="12" cy="9" r="4" fill="#2a1f3e" /><path d="M8 8c1-3 7-3 8 0" fill="#A366FF" opacity="0.7" /><ellipse cx="12" cy="17" rx="5" ry="6" fill="#2a1f3e" /></svg>
                    </div>
                    <div>
                      <div className="n2-msg-lyra">Health Factor measures how safe your loan is. Above 2.0 is safe!</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginTop: 6 }}>
                        {['What is Kamino?', 'How to earn XP?'].map((s) => (
                          <span key={s} className="n2-suggestion-pill">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input area */}
                <div className="n2-chat-input">
                  <div style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--n2-radius-sm)', background: 'transparent', fontFamily: mono, fontSize: 13, color: 'var(--n2-text-muted)' }}>
                    Ask something...
                  </div>
                  <button className="n2-btn-primary" style={{ padding: '8px 14px', fontSize: 11, borderRadius: 8 }}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Modals & Toasts ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Modals &amp; Toasts</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>

          {/* Level Up */}
          <div className="n2-card n2-animate-bloom" style={{ padding: 28, textAlign: 'center' as const, border: '1px solid rgba(181,122,255,0.3)' }}>
            <Label>Level Up</Label>
            <div style={{ marginTop: 16, fontSize: 48 }}>⚡</div>
            <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--n2-text-muted)', marginTop: 12, textTransform: 'uppercase' as const }}>NEW LEVEL!</p>
            <p style={{ fontFamily: strong, fontSize: 48, fontWeight: 700, color: 'var(--n2-xp)', marginTop: 8 }}>3</p>
            <p style={{ fontFamily: accent, fontSize: 15, color: 'var(--n2-primary)', marginTop: 4 }}>PRACTITIONER</p>
            <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 400, color: 'var(--n2-text-muted)', marginTop: 4 }}>Guardian</p>
            <button className="n2-btn-primary" style={{ marginTop: 16 }}>Continue</button>
          </div>

          {/* Item Unlock */}
          <div className="n2-card n2-animate-bloom" style={{ padding: 28, textAlign: 'center' as const, border: '1px solid rgba(163,102,255,0.3)' }}>
            <Label>Item Unlock</Label>
            <div style={{ marginTop: 16, fontSize: 48 }}>🔍</div>
            <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--n2-text-muted)', marginTop: 12, textTransform: 'uppercase' as const }}>ITEM UNLOCKED!</p>
            <p style={{ fontFamily: strong, fontSize: 20, fontWeight: 700, color: 'var(--n2-primary)', marginTop: 8 }}>Clarity Lens</p>
            <p style={{ fontFamily: accent, fontSize: 13, color: 'var(--n2-accent)', marginTop: 4 }}>Attention is a skill</p>
            <p style={{ fontFamily: mono, fontSize: 16, fontWeight: 700, color: 'var(--n2-xp)', marginTop: 8 }}>+50 XP</p>
            <button className="n2-btn-primary" style={{ marginTop: 16 }}>Continue</button>
          </div>

          {/* XP Toast */}
          <div className="n2-card" style={{ padding: 28, textAlign: 'center' as const, display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' }}>
            <Label>XP Toast</Label>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
              <span className="n2-badge n2-badge-xp" style={{ fontSize: 20, padding: '10px 24px' }}>+150 XP</span>
            </div>
            <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 400, color: 'var(--n2-text-muted)', marginTop: 16, lineHeight: 1.6 }}>
              Floats up and fades out on activity completion.
            </p>
          </div>
        </div>

        {/* Alert Modal */}
        <div className="n2-card" style={{ padding: 28, marginTop: 16 }}>
          <Label>Alert Modal — Severity Bands</Label>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, marginTop: 16 }}>
            {[
              { label: '2 urgent', color: 'var(--n2-danger)', bg: 'var(--n2-danger-bg)', border: 'rgba(255,77,106,0.2)' },
              { label: '1 warning', color: 'var(--n2-attention)', bg: 'var(--n2-attention-bg)', border: 'rgba(245,166,35,0.2)' },
              { label: '3 info', color: 'var(--n2-primary)', bg: 'var(--n2-primary-muted)', border: 'rgba(163,102,255,0.2)' },
            ].map((band) => (
              <div key={band.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 'var(--n2-radius-sm)', background: band.bg, border: `1px solid ${band.border}` }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: band.color }} />
                <span style={{ fontFamily: mono, fontSize: 13, color: band.color }}>{band.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== XP Journey ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>XP Journey</SectionTitle>
        <div className="n2-card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 700, color: 'var(--n2-text)' }}>First </span>
              <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: 'var(--n2-text-muted)' }}>steps</span>
            </div>
            <span style={{ fontFamily: mono, fontSize: 13, color: 'var(--n2-primary)' }}>2/4</span>
          </div>

          <div className="n2-bar" style={{ marginBottom: 24 }}>
            <div className="n2-bar-fill n2-bar-fill-primary" style={{ width: '50%' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {[
              { name: 'Complete quiz', xp: 100, done: true },
              { name: 'Open dashboard', xp: 75, done: true },
              { name: 'Learn about HF', xp: 75, done: false },
              { name: 'Have a Kamino position', xp: 100, done: false },
            ].map((step) => (
              <div key={step.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 'var(--n2-radius-sm)', background: step.done ? 'var(--n2-safe-bg)' : 'var(--n2-surface)', border: `1px solid ${step.done ? 'rgba(46,216,138,0.15)' : 'var(--n2-surface-border)'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 14, color: step.done ? 'var(--n2-safe)' : 'var(--n2-text-muted)' }}>{step.done ? '✓' : '○'}</span>
                  <span style={{ fontFamily: strong, fontSize: 14, fontWeight: step.done ? 600 : 400, color: step.done ? 'var(--n2-safe)' : 'var(--n2-text-secondary)', textDecoration: step.done ? 'line-through' : 'none' }}>
                    {step.name}
                  </span>
                </div>
                <span className="n2-badge n2-badge-xp" style={{ fontSize: 11, padding: '3px 10px' }}>+{step.xp} XP</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: '12px 16px', background: 'var(--n2-primary-muted)', borderRadius: 'var(--n2-radius-sm)', border: '1px solid rgba(163,102,255,0.1)' }}>
            <p style={{ fontFamily: accent, fontSize: 14, color: 'var(--n2-accent)' }}>
              Complete steps to earn XP and evolve your character
            </p>
          </div>
        </div>
      </section>

      {/* ===== Wallet Management ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Wallet Management</SectionTitle>
        <div className="n2-card" style={{ padding: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>

            {/* Add wallet */}
            <div>
              <Label>Add Wallet</Label>
              <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 'var(--n2-radius-sm)', border: '1px solid var(--n2-surface-border)', background: 'var(--n2-surface)' }}>
                <span style={{ fontFamily: mono, fontSize: 13, color: 'var(--n2-text-muted)' }}>ABC...xyz</span>
              </div>
              <button className="n2-btn-primary" style={{ marginTop: 12, width: '100%' }}>Add</button>
            </div>

            {/* Remove wallet (multi-select) */}
            <div>
              <Label>Remove (Multi-select)</Label>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--n2-surface-border)', cursor: 'pointer' }}>
                  <div className="n2-checkbox n2-checkbox-checked" />
                  <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-text-secondary)' }}>Select all</span>
                </label>
                {['MaRi...dEm0', '7xKp...Phnt', '3mVp...SlfR'].map((addr) => (
                  <label key={addr} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', cursor: 'pointer' }}>
                    <div className="n2-checkbox n2-checkbox-checked" />
                    <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-text-secondary)' }}>{addr}</span>
                  </label>
                ))}
              </div>
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-danger)' }}>3 selected</span>
                <button className="n2-btn-ghost" style={{ borderColor: 'rgba(255,77,106,0.4)', color: 'var(--n2-danger)', fontSize: 12, padding: '6px 16px' }}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
