'use client';

import { SectionTitle, Label, ScoreRing, MiniECG, strong, accent, mono } from './helpers';

export default function SectionDashboard() {
  return (
    <>
      {/* ===== Dashboard Preview ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Dashboard Preview</SectionTitle>

        {/* Hero status */}
        <div className="n2-hero-safe" style={{ padding: 40, marginBottom: 16, textAlign: 'center' as const }}>
          <ScoreRing score={78} status="safe" />
          <h3 style={{ marginTop: 20 }}>
            <span style={{ fontFamily: strong, fontSize: 28, fontWeight: 700, color: 'var(--n2-safe)' }}>All </span>
            <span style={{ fontFamily: accent, fontSize: 34, fontWeight: 700, fontStyle: 'italic', color: 'var(--n2-safe)' }}>Good</span>
          </h3>
          <p style={{ fontFamily: strong, fontSize: 17, fontWeight: 400, color: 'var(--n2-text-secondary)', marginTop: 12, maxWidth: 460, margin: '12px auto 0', lineHeight: 1.7 }}>
            Your collateral is healthy and your portfolio is balanced. You can breathe easy.
          </p>
        </div>

        {/* ECG */}
        <MiniECG />

        {/* Kamino Card */}
        <div className="n2-card" style={{ marginTop: 16, padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 700, color: 'var(--n2-text)' }}>Kamino </span>
              <span style={{ fontFamily: accent, fontSize: 24, fontStyle: 'italic', color: 'var(--n2-text-muted)' }}>your loan</span>
            </div>
            <span className="n2-badge n2-badge-safe">SAFE</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            {[
              { label: 'Collateral', value: '$1,890', sub: '12.5 SOL' },
              { label: 'Debt', value: '$850', sub: '850 USDC' },
              { label: 'Safety margin', value: '+54.8%', color: 'var(--n2-safe)' },
              { label: 'Health Factor', value: '1.82', color: 'var(--n2-safe)' },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontFamily: strong, fontSize: 13, fontWeight: 500, color: 'var(--n2-text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: strong, fontSize: 28, fontWeight: 700, color: item.color ?? 'var(--n2-text)', marginTop: 6 }}>
                  {item.value}
                </p>
                {item.sub && (
                  <p style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-text-muted)', marginTop: 3 }}>{item.sub}</p>
                )}
              </div>
            ))}
          </div>

          {/* Translated explanation */}
          <div style={{ padding: '16px 20px', background: 'var(--n2-safe-bg)', borderRadius: 'var(--n2-radius-sm)', border: '1px solid rgba(46,216,138,0.1)' }}>
            <p style={{ fontFamily: strong, fontSize: 16, fontWeight: 400, color: 'var(--n2-text-secondary)', lineHeight: 1.7 }}>
              Your Kamino loan is safe. Your collateral is worth 54.8% more than your debt.
            </p>
            <p style={{ fontFamily: accent, fontSize: 22, fontStyle: 'italic', color: 'var(--n2-safe)', marginTop: 8 }}>
              relax, you&apos;re doing great
            </p>
          </div>

          <div style={{ marginTop: 20 }}>
            <button className="n2-btn-primary">View on Kamino</button>
          </div>
        </div>

        {/* Action cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 16 }}>
          {[
            { title: 'Better', titleAccent: 'protection', desc: 'Spread your money across more coins to stay protected' },
            { title: 'Understand', titleAccent: 'HF', desc: 'Learn what the Health Factor means for your loan' },
            { title: 'View on', titleAccent: 'Kamino', desc: 'Open your loan details on the Kamino website' },
          ].map((a) => (
            <div key={a.title} className="n2-action-card" style={{ padding: 20 }}>
              <p style={{ marginBottom: 8 }}>
                <span style={{ fontFamily: strong, fontSize: 16, fontWeight: 700, color: 'var(--n2-text)' }}>{a.title} </span>
                <span style={{ fontFamily: accent, fontSize: 19, fontStyle: 'italic', color: 'var(--n2-primary)' }}>{a.titleAccent}</span>
              </p>
              <p style={{ fontFamily: strong, fontSize: 15, fontWeight: 400, color: 'var(--n2-text-muted)', lineHeight: 1.6 }}>
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Character Dossier ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Character Dossier</SectionTitle>
        <div className="n2-card" style={{ padding: 36 }}>
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' as const }}>
            <div style={{
              width: 110, height: 110, borderRadius: 'var(--n2-radius-md)',
              background: 'linear-gradient(135deg, var(--n2-primary-muted), var(--n2-accent-muted))',
              border: '1px solid var(--n2-surface-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 44, flexShrink: 0,
            }}>
              🛡️
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <h4 style={{ fontFamily: strong, fontSize: 28, fontWeight: 700, color: 'var(--n2-text)' }}>Giuliana</h4>
              <p style={{ fontFamily: accent, fontSize: 20, fontStyle: 'italic', color: 'var(--n2-accent)', marginTop: 4 }}>
                Guardian class, level 3
              </p>

              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
                {[
                  { label: 'Clarity', value: 72 },
                  { label: 'Confidence', value: 58 },
                  { label: 'Serenity', value: 85 },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontFamily: strong, fontSize: 15, fontWeight: 500, color: 'var(--n2-text-secondary)' }}>{s.label}</span>
                      <span style={{ fontFamily: strong, fontSize: 15, fontWeight: 700, color: 'var(--n2-text-muted)' }}>{s.value}</span>
                    </div>
                    <div className="n2-bar"><div className="n2-bar-fill n2-bar-fill-primary" style={{ width: `${s.value}%` }} /></div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: accent, fontSize: 19, fontStyle: 'italic', color: 'var(--n2-xp)' }}>XP to next level</span>
                  <span style={{ fontFamily: strong, fontSize: 14, fontWeight: 600, color: 'var(--n2-text-muted)' }}>320/500</span>
                </div>
                <div className="n2-bar"><div className="n2-bar-fill n2-bar-fill-xp" style={{ width: '64%' }} /></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <p style={{ fontFamily: strong, fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--n2-text-muted)', marginBottom: 12 }}>
              Inventory
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: 8 }}>
              {['🔑', '🗺️', '📜', '🔍', '🛡️', '⛓️'].map((icon, i) => (
                <div key={i} className="n2-slot"><span style={{ fontSize: 22 }}>{icon}</span></div>
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`e-${i}`} className="n2-slot n2-slot-empty"><span style={{ fontSize: 11 }}>???</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
