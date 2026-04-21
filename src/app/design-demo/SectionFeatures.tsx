'use client';

import { SectionTitle, Label, strong, accent, mono } from './helpers';

export default function SectionFeatures() {
  return (
    <>
      {/* ===== Lyra — AI Assistant ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Lyra — AI Assistant</SectionTitle>
        <div className="n2-card" style={{ padding: 36 }}>
          {/* Floating button */}
          <Label>Floating Button</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 12, marginBottom: 28 }}>
            <div className="n2-animate-float" style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid rgba(163,102,255,0.4)', background: 'linear-gradient(135deg, var(--n2-primary-muted), var(--n2-accent-muted))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px var(--n2-primary-glow)' }}>
                <span style={{ fontSize: 24 }}>✦</span>
              </div>
              <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--n2-text-muted)', textTransform: 'uppercase' as const }}>LYRA</span>
            </div>
            <div>
              <p style={{ fontFamily: strong, fontSize: 15, fontWeight: 600, color: 'var(--n2-text)' }}>Animated float + glow</p>
              <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 400, color: 'var(--n2-text-muted)', marginTop: 4 }}>
                Primary glow (inactive) → Plum glow (active). Badge label below avatar.
              </p>
            </div>
          </div>

          <div className="n2-divider" style={{ margin: '0 0 24px' }} />

          {/* Chat panel */}
          <Label>Chat Panel</Label>
          <div className="n2-chat-panel" style={{ maxWidth: 340, marginTop: 12 }}>
            <div className="n2-chat-header">
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--n2-primary-muted), var(--n2-accent-muted))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 16 }}>✦</span>
              </div>
              <div>
                <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 700, color: 'var(--n2-text)' }}>Lyra</p>
                <p style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)' }}>Guia Nudge</p>
              </div>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              <div className="n2-msg-lyra">Oi! Eu sou a Lyra, sua guia pessoal no universo DeFi.</div>
              <div className="n2-msg-user">O que é Health Factor?</div>
              <div className="n2-msg-lyra">O Health Factor mede quão seguro está seu empréstimo. Acima de 2.0 é seguro!</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginTop: 4 }}>
                {['Como melhorar meu HF?', 'O que é Kamino?', 'Como ganhar XP?'].map((s) => (
                  <span key={s} className="n2-suggestion-pill">{s}</span>
                ))}
              </div>
            </div>

            <div className="n2-chat-input">
              <div style={{ flex: 1, padding: '8px 12px', borderRadius: 'var(--n2-radius-sm)', background: 'var(--n2-surface)', fontFamily: mono, fontSize: 13, color: 'var(--n2-text-muted)' }}>
                Pergunte algo...
              </div>
              <button className="n2-btn-primary" style={{ padding: '8px 12px', fontSize: 11 }}>↑</button>
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
            <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--n2-text-muted)', marginTop: 12, textTransform: 'uppercase' as const }}>NOVO NÍVEL!</p>
            <p style={{ fontFamily: strong, fontSize: 48, fontWeight: 700, color: 'var(--n2-xp)', marginTop: 8 }}>3</p>
            <p style={{ fontFamily: accent, fontSize: 18, fontStyle: 'italic', color: 'var(--n2-primary)', marginTop: 4 }}>PRATICANTE</p>
            <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 400, color: 'var(--n2-text-muted)', marginTop: 4 }}>Guardian</p>
            <button className="n2-btn-primary" style={{ marginTop: 16 }}>Continuar</button>
          </div>

          {/* Item Unlock */}
          <div className="n2-card n2-animate-bloom" style={{ padding: 28, textAlign: 'center' as const, border: '1px solid rgba(163,102,255,0.3)' }}>
            <Label>Item Unlock</Label>
            <div style={{ marginTop: 16, fontSize: 48 }}>🔍</div>
            <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', color: 'var(--n2-text-muted)', marginTop: 12, textTransform: 'uppercase' as const }}>ITEM DESBLOQUEADO!</p>
            <p style={{ fontFamily: strong, fontSize: 20, fontWeight: 700, color: 'var(--n2-primary)', marginTop: 8 }}>Lente de Clareza</p>
            <p style={{ fontFamily: accent, fontSize: 15, fontStyle: 'italic', color: 'var(--n2-accent)', marginTop: 4 }}>Atenção é uma habilidade</p>
            <p style={{ fontFamily: mono, fontSize: 16, fontWeight: 700, color: 'var(--n2-xp)', marginTop: 8 }}>+50 XP</p>
            <button className="n2-btn-primary" style={{ marginTop: 16 }}>Continuar</button>
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
              { label: '2 urgente(s)', color: 'var(--n2-danger)', bg: 'var(--n2-danger-bg)', border: 'rgba(255,77,106,0.2)' },
              { label: '1 atenção', color: 'var(--n2-attention)', bg: 'var(--n2-attention-bg)', border: 'rgba(245,166,35,0.2)' },
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
              <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 700, color: 'var(--n2-text)' }}>Primeiros </span>
              <span style={{ fontFamily: accent, fontSize: 24, fontStyle: 'italic', color: 'var(--n2-text-muted)' }}>passos</span>
            </div>
            <span style={{ fontFamily: mono, fontSize: 13, color: 'var(--n2-primary)' }}>2/4</span>
          </div>

          <div className="n2-bar" style={{ marginBottom: 24 }}>
            <div className="n2-bar-fill n2-bar-fill-primary" style={{ width: '50%' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {[
              { name: 'Completar quiz', xp: 100, done: true },
              { name: 'Abrir dashboard', xp: 75, done: true },
              { name: 'Aprender sobre HF', xp: 75, done: false },
              { name: 'Ter posição no Kamino', xp: 100, done: false },
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
            <p style={{ fontFamily: accent, fontSize: 16, fontStyle: 'italic', color: 'var(--n2-accent)' }}>
              Complete passos para ganhar XP e evoluir seu personagem
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
              <button className="n2-btn-primary" style={{ marginTop: 12, width: '100%' }}>Adicionar</button>
            </div>

            {/* Remove wallet (multi-select) */}
            <div>
              <Label>Remove (Multi-select)</Label>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--n2-surface-border)', cursor: 'pointer' }}>
                  <div className="n2-checkbox n2-checkbox-checked" />
                  <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-text-secondary)' }}>Selecionar todas</span>
                </label>
                {['MaRi...dEm0', '7xKp...Phnt', '3mVp...SlfR'].map((addr) => (
                  <label key={addr} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', cursor: 'pointer' }}>
                    <div className="n2-checkbox n2-checkbox-checked" />
                    <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-text-secondary)' }}>{addr}</span>
                  </label>
                ))}
              </div>
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-danger)' }}>3 selecionada(s)</span>
                <button className="n2-btn-ghost" style={{ borderColor: 'rgba(255,77,106,0.4)', color: 'var(--n2-danger)', fontSize: 12, padding: '6px 16px' }}>Remover</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Animation Catalog ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Animations</SectionTitle>
        <div className="n2-card" style={{ padding: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            {[
              { name: 'Float', cls: 'n2-animate-float', icon: '↕' },
              { name: 'Breathe', cls: 'n2-animate-breathe', icon: '◉' },
              { name: 'Bloom', cls: 'n2-animate-bloom', icon: '✦' },
            ].map((anim) => (
              <div key={anim.name} style={{ textAlign: 'center' as const }}>
                <div className={anim.cls} style={{ width: 64, height: 64, margin: '0 auto', borderRadius: 'var(--n2-radius-md)', background: 'var(--n2-primary-muted)', border: '1px solid var(--n2-surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  {anim.icon}
                </div>
                <p style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-text-muted)', marginTop: 10, letterSpacing: '0.06em' }}>{anim.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
