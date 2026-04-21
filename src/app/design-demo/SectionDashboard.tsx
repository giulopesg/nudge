'use client';

import { SectionTitle, ScoreRing, MiniECG, strong, accent, mono } from './helpers';

export default function SectionDashboard() {
  return (
    <section style={{ marginBottom: 72 }}>
      <SectionTitle>Dashboard Preview</SectionTitle>

      {/* Title bar — matches real dashboard header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3>
          <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 700, color: 'var(--n2-text)' }}>Your </span>
          <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: 'var(--n2-text-muted)' }}>dashboard</span>
        </h3>
        <span className="n2-btn-ghost" style={{ padding: '6px 16px', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--n2-xp)', borderColor: 'rgba(255,215,0,0.3)' }}>
          Giuliana
        </span>
      </div>

      {/* Greeting + date — matches Wave 1 */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
        <p style={{ fontFamily: strong, fontSize: 17, fontWeight: 400, color: 'var(--n2-text-secondary)' }}>
          Hi, Giuliana
        </p>
        <p style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)', letterSpacing: '0.06em' }}>
          April 21, 2026
        </p>
      </div>

      {/* StatusHero — with Lyra button indicator */}
      <div className="n2-hero-safe" style={{ position: 'relative', padding: 40, marginBottom: 16, textAlign: 'center' as const }}>
        {/* Lyra button indicator — top right */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', borderRadius: 9999,
          border: '1px solid rgba(163,102,255,0.3)',
          background: 'rgba(163,102,255,0.08)',
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1a0a2e, #2a0e3e)',
            border: '1px solid rgba(163,102,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, color: '#A366FF',
          }}>&#10024;</div>
          <span style={{ fontFamily: mono, fontSize: 10, color: 'rgba(196,161,255,0.9)' }}>Ask for a tip</span>
        </div>

        <ScoreRing score={78} status="safe" />
        <h3 style={{ marginTop: 20 }}>
          <span style={{ fontFamily: strong, fontSize: 28, fontWeight: 700, color: 'var(--n2-safe)' }}>All </span>
          <span style={{ fontFamily: strong, fontSize: 28, fontWeight: 400, fontStyle: 'italic', color: 'var(--n2-safe)' }}>Good</span>
        </h3>
        <p style={{ fontFamily: strong, fontSize: 17, fontWeight: 400, color: 'var(--n2-text-secondary)', marginTop: 12, maxWidth: 460, margin: '12px auto 0', lineHeight: 1.7 }}>
          Your collateral is healthy and your portfolio is balanced. You can breathe easy.
        </p>
      </div>

      {/* ECG */}
      <MiniECG />

      {/* Portfolio Card — NEW, matching real PortfolioCard */}
      <div className="n2-card" style={{ marginTop: 16, padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 700, color: 'var(--n2-text)' }}>Your </span>
            <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: 'var(--n2-text-muted)' }}>portfolio</span>
          </div>
        </div>

        {/* Token grid */}
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { symbol: 'SOL', pct: 69, value: '$1,310', amount: '8.67' },
            { symbol: 'USDC', pct: 31, value: '$590', amount: '590' },
          ].map((tk) => (
            <div key={tk.symbol} style={{ padding: '12px 16px', borderRadius: 'var(--n2-radius-sm)', border: '1px solid var(--n2-surface-border)', background: 'rgba(255,248,245,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: strong, fontSize: 16, fontWeight: 700, color: 'var(--n2-text)' }}>{tk.symbol}</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)' }}>{tk.pct}%</span>
              </div>
              <p style={{ fontFamily: strong, fontSize: 22, fontWeight: 700, color: 'var(--n2-text)', marginTop: 6 }}>{tk.value}</p>
              <p style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)', marginTop: 2 }}>{tk.amount} {tk.symbol}</p>
            </div>
          ))}
        </div>

        {/* Composition bar */}
        <div style={{ marginTop: 16 }}>
          <p style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Composition</p>
          <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 8 }}>
            <div style={{ width: '69%', background: 'var(--n2-primary)' }} />
            <div style={{ width: '31%', background: 'var(--n2-safe)' }} />
          </div>
        </div>

        {/* Metrics */}
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <p style={{ fontFamily: strong, fontSize: 13, fontWeight: 500, color: 'var(--n2-text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>Diversification</p>
            <p style={{ fontFamily: strong, fontSize: 18, fontWeight: 700, color: 'var(--n2-safe)', marginTop: 4 }}>Diversified</p>
          </div>
          <div>
            <p style={{ fontFamily: strong, fontSize: 13, fontWeight: 500, color: 'var(--n2-text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>Stable reserve</p>
            <p style={{ fontFamily: strong, fontSize: 18, fontWeight: 700, color: 'var(--n2-safe)', marginTop: 4 }}>31%</p>
          </div>
        </div>

        {/* Wallet buttons */}
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button className="n2-btn-ghost" style={{ fontSize: 12 }}>+ Add wallet</button>
          <button className="n2-btn-ghost" style={{ fontSize: 12 }}>- Remove wallet</button>
        </div>
      </div>

      {/* Kamino Card — matches real KaminoCard layout */}
      <div className="n2-card" style={{ marginTop: 16, padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 700, color: 'var(--n2-text)' }}>Kamino </span>
            <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: 'var(--n2-text-muted)' }}>your loan</span>
          </div>
          <span className="n2-badge n2-badge-safe">SAFE</span>
        </div>

        <div style={{ marginTop: 16, padding: '16px 20px', background: 'var(--n2-safe-bg)', borderRadius: 'var(--n2-radius-sm)', border: '1px solid rgba(46,216,138,0.1)' }}>
          <p style={{ fontFamily: strong, fontSize: 16, fontWeight: 400, color: 'var(--n2-text-secondary)', lineHeight: 1.7 }}>
            Your Kamino loan is safe. Your collateral is worth 54.8% more than your debt.
          </p>
          <p style={{ fontFamily: accent, fontSize: 19, color: 'var(--n2-safe)', marginTop: 8 }}>
            relax, you&apos;re doing great
          </p>
        </div>

        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { label: 'Collateral', value: '$1,890', sub: '12.5 SOL' },
            { label: 'Debt', value: '$850', sub: '850 USDC' },
            { label: 'Margin', value: '55%', color: 'var(--n2-safe)', sub: 'more than enough' },
            { label: 'Net Value', value: '$1,040' },
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

        <div style={{ marginTop: 20 }}>
          <button className="n2-btn-primary">View on Kamino</button>
        </div>
      </div>

      {/* Timestamp */}
      <p style={{ textAlign: 'center' as const, fontFamily: mono, fontSize: 12, color: 'var(--n2-text-muted)', letterSpacing: '0.06em', marginTop: 16 }}>
        Updated 14:32:15
      </p>
    </section>
  );
}
