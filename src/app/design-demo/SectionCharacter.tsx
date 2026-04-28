'use client';

import { SectionTitle, strong, accent } from './helpers';

export default function SectionCharacter() {
  return (
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
            <p style={{ fontFamily: strong, fontSize: 17, fontWeight: 400, fontStyle: 'italic', color: 'var(--n2-accent)', marginTop: 4 }}>
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
                <span style={{ fontFamily: accent, fontSize: 16, color: 'var(--n2-xp)' }}>XP to next level</span>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {['🔑', '🗺️', '📜', '🔍', '🛡️', '⛓️'].map((icon, i) => (
              <div key={i} className="n2-slot"><span style={{ fontSize: 22 }}>{icon}</span></div>
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`e-${i}`} className="n2-slot n2-slot-empty"><span style={{ fontSize: 11 }}>???</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
