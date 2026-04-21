'use client';

import './design-system.css';
import { strong, accent, mono } from './helpers';
import SectionFoundation from './SectionFoundation';
import SectionDashboard from './SectionDashboard';
import SectionFeatures from './SectionFeatures';
import SectionLanding from './SectionLanding';

export default function DesignDemo() {
  return (
    <div className="ds-demo">
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        {/* ===== Header ===== */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 72 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <h1 className="n2-gradient-text" style={{ fontFamily: strong, fontSize: 28, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
              Nudge
            </h1>
            <span style={{ fontFamily: accent, fontSize: 20, fontStyle: 'italic', color: 'var(--n2-accent)' }}>
              by Giuliana
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="n2-btn-ghost">EN / PT</button>
            <button className="n2-btn-primary">Connect Wallet</button>
          </div>
        </header>

        {/* ===== Hero ===== */}
        <section style={{ marginBottom: 88, textAlign: 'center' as const }}>
          <div className="n2-divider" style={{ width: 64, margin: '0 auto 36px' }} />
          <h2 style={{ lineHeight: 1.1 }}>
            <span style={{ fontFamily: strong, fontSize: 52, fontWeight: 700, color: 'var(--n2-text)' }}>
              Design System
            </span>
            <br />
            <span className="n2-gradient-text" style={{ fontFamily: accent, fontSize: 56, fontWeight: 700, fontStyle: 'italic' }}>
              version two
            </span>
          </h2>
          <p style={{ fontFamily: accent, fontSize: 24, fontStyle: 'italic', color: 'var(--n2-accent)', marginTop: 16 }}>
            feito por uma mulher, para todas
          </p>
          <p style={{ fontFamily: strong, marginTop: 20, fontSize: 17, fontWeight: 400, color: 'var(--n2-text-secondary)', maxWidth: 500, margin: '20px auto 0', lineHeight: 1.8 }}>
            Bioluminescence, not neon. Bloom, not glow. Breath, not glitch.
            Feminine power encoded in every pixel.
          </p>
          <div className="n2-divider" style={{ width: 64, margin: '36px auto 0' }} />
        </section>

        {/* ===== Sections ===== */}
        <SectionFoundation />
        <SectionDashboard />
        <SectionFeatures />
        <SectionLanding />

        {/* ===== Footer ===== */}
        <footer style={{ textAlign: 'center' as const, padding: '40px 0' }}>
          <div className="n2-divider" style={{ width: 64, margin: '0 auto 28px' }} />
          <p style={{ fontFamily: strong, fontSize: 18, fontWeight: 400, color: 'var(--n2-text-muted)' }}>
            &ldquo;There is something here.
          </p>
          <p style={{ fontFamily: strong, fontSize: 18, fontWeight: 400, color: 'var(--n2-text-muted)' }}>
            We don&apos;t know what it is&mdash;
          </p>
          <p style={{ fontFamily: accent, fontSize: 28, fontStyle: 'italic', color: 'var(--n2-accent)', marginTop: 8 }}>
            but it&apos;s beautiful, interesting, and attractive.&rdquo;
          </p>
          <p style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)', letterSpacing: '0.16em', marginTop: 28 }}>
            NUDGE DESIGN SYSTEM V2
          </p>
        </footer>
      </div>
    </div>
  );
}
