'use client';

import { SectionTitle, Label, strong, accent, mono } from './helpers';

export default function SectionLanding() {
  return (
    <>
      {/* ===== Landing Hero ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Landing Hero</SectionTitle>
        <div className="n2-card" style={{ padding: '72px 40px', textAlign: 'center' as const }}>
          <div className="n2-divider" style={{ width: 48, margin: '0 auto 28px' }} />
          <h2 style={{ lineHeight: 1.1, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 14 }}>
            <span style={{ fontFamily: strong, fontSize: 48, fontWeight: 700, color: 'var(--n2-text)' }}>Blockchain</span>
            <span className="n2-gradient-text" style={{ fontFamily: accent, fontSize: 46, fontWeight: 400 }}>is freedom</span>
          </h2>
          <p style={{ fontFamily: accent, fontSize: 22, color: 'var(--n2-accent)', marginTop: 12 }}>
            Nudge teaches you to exercise yours
          </p>
          <p style={{ fontFamily: strong, fontSize: 17, fontWeight: 400, color: 'var(--n2-text-secondary)', marginTop: 20, maxWidth: 460, margin: '20px auto 0', lineHeight: 1.8 }}>
            Translate, learn, and protect your DeFi positions.
            No jargon. No complexity. Just you and your money.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <button className="n2-btn-primary">Start your journey</button>
            <button className="n2-btn-secondary">See demo</button>
          </div>
          <div className="n2-divider" style={{ width: 48, margin: '44px auto 0' }} />
          <p style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)', marginTop: 20, letterSpacing: '0.16em' }}>
            SOLANA FRONTIER 2026
          </p>
        </div>
      </section>

      {/* ===== v1 vs v2 ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>v1 vs v2</SectionTitle>
        <div className="n2-card" style={{ padding: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
            <div>
              <Label>V1 — Cypherpunk</Label>
              <ul style={{ fontFamily: strong, fontSize: 15, fontWeight: 400, color: 'var(--n2-text-secondary)', lineHeight: 2.2, marginTop: 12 }}>
                <li>Chamfered corners</li>
                <li>Neon teal #00D4AA</li>
                <li>Grid + scanlines</li>
                <li>Orbitron (aggressive sans)</li>
                <li>Small fonts, low contrast</li>
                <li>Cold white text</li>
              </ul>
            </div>
            <div>
              <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-primary)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>V2 — Feminine Cypherpunk</span>
              <ul style={{ fontFamily: strong, fontSize: 15, fontWeight: 400, color: 'var(--n2-text-secondary)', lineHeight: 2.2, marginTop: 12 }}>
                <li>Rounded corners (16-24px)</li>
                <li>Orchid #A366FF + Rose #FF6B9D</li>
                <li>Organic gradient mesh</li>
                <li><span style={{ fontFamily: strong, fontWeight: 700 }}>Lora</span> + <span style={{ fontFamily: accent, fontSize: 15, color: 'var(--n2-accent)' }}>Agbalumo</span></li>
                <li><strong>Big fonts, high contrast</strong></li>
                <li>Warm white, readable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
