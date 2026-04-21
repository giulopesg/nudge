'use client';

import { SectionTitle, Label, Swatch, strong, accent, mono } from './helpers';

export default function SectionFoundation() {
  return (
    <>
      {/* ===== Typography ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Typography</SectionTitle>
        <div className="n2-card" style={{ padding: 36 }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 28 }}>
            <div>
              <Label>Title — Lora 700 (strong serif)</Label>
              <p style={{ fontFamily: strong, fontSize: 36, fontWeight: 700, color: 'var(--n2-text)', marginTop: 8 }}>
                Your finances, translated.
              </p>
            </div>
            <div className="n2-divider" />

            <div>
              <Label>Accent — Agbalumo (warm, playful)</Label>
              <p className="n2-gradient-text" style={{ fontFamily: accent, fontSize: 38, marginTop: 8, lineHeight: 1.15 }}>
                Nudge teaches you to exercise yours
              </p>
            </div>
            <div className="n2-divider" />

            <div>
              <Label>Mixed — Hero accent (Lora + Agbalumo)</Label>
              <p style={{ marginTop: 8, lineHeight: 1.2 }}>
                <span style={{ fontFamily: strong, fontSize: 36, fontWeight: 700, color: 'var(--n2-text)' }}>Blockchain </span>
                <span style={{ fontFamily: accent, fontSize: 34, color: 'var(--n2-accent)' }}>is freedom</span>
              </p>
            </div>
            <div className="n2-divider" />

            <div>
              <Label>Card Title — Lora Bold + Lora Italic</Label>
              <p style={{ marginTop: 8, lineHeight: 1.2 }}>
                <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 700, color: 'var(--n2-text)' }}>Kamino </span>
                <span style={{ fontFamily: strong, fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: 'var(--n2-text-muted)' }}>your loan</span>
              </p>
            </div>
            <div className="n2-divider" />

            <div>
              <Label>Body — Lora 400 (readable, warm)</Label>
              <p style={{ fontFamily: strong, fontSize: 17, fontWeight: 400, color: 'var(--n2-text-secondary)', marginTop: 8, lineHeight: 1.8 }}>
                Everything about your finances, translated into your language.
                No jargon, no complexity. Just clarity and peace of mind.
                The thick serifs ensure readability even on dark backgrounds.
              </p>
            </div>
            <div className="n2-divider" />

            <div>
              <Label>Numbers — Lora 700 (data you can read)</Label>
              <div style={{ display: 'flex', gap: 32, marginTop: 8, flexWrap: 'wrap' as const }}>
                {[
                  { label: 'Collateral', value: '$1,890', color: 'var(--n2-safe)' },
                  { label: 'Health Factor', value: '1.82', color: 'var(--n2-text)' },
                  { label: 'Margin', value: '+54.8%', color: 'var(--n2-attention)' },
                ].map((n) => (
                  <div key={n.label}>
                    <p style={{ fontFamily: strong, fontSize: 36, fontWeight: 700, color: n.color }}>{n.value}</p>
                    <p style={{ fontFamily: strong, fontSize: 13, fontWeight: 500, color: 'var(--n2-text-muted)', marginTop: 2 }}>{n.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="n2-divider" />

            <div>
              <Label>Mono — Fira Code (technical data)</Label>
              <p style={{ fontFamily: mono, fontSize: 14, color: 'var(--n2-primary)', marginTop: 8 }}>
                HF: 1.82 | LTV: 45.2% | MARGIN: +54.8%
              </p>
            </div>
          </div>

          {/* Hierarchy guide */}
          <div style={{ marginTop: 36, padding: '20px 24px', background: 'var(--n2-primary-muted)', borderRadius: 'var(--n2-radius-sm)', border: '1px solid rgba(196,161,255,0.1)' }}>
            <Label>Hierarchy</Label>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '10px 20px', fontSize: 15, color: 'var(--n2-text-secondary)', marginTop: 12 }}>
              <span style={{ fontFamily: strong, fontSize: 17, fontWeight: 700, color: 'var(--n2-text)' }}>Lora Bold</span>
              <span style={{ fontFamily: strong, fontWeight: 400 }}>Titles, numbers, the serious part — authority</span>
              <span style={{ fontFamily: strong, fontSize: 17, fontWeight: 400, fontStyle: 'italic', color: 'var(--n2-text-muted)' }}>Lora Italic</span>
              <span style={{ fontFamily: strong, fontWeight: 400 }}>Card title accent — softer counterpart to Bold</span>
              <span style={{ fontFamily: accent, fontSize: 19, color: 'var(--n2-accent)' }}>Agbalumo</span>
              <span style={{ fontFamily: strong, fontWeight: 400 }}>Hero accents, warm personality — large displays</span>
              <span style={{ fontFamily: strong, fontSize: 15, fontWeight: 400 }}>Lora Regular</span>
              <span style={{ fontFamily: strong, fontWeight: 400 }}>Body text, descriptions — warm readability</span>
              <span style={{ fontFamily: mono, fontSize: 14 }}>Fira Code</span>
              <span style={{ fontFamily: strong, fontWeight: 400 }}>Wallet data, metrics — technical precision</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Palette ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Palette</SectionTitle>
        <div className="n2-card" style={{ padding: 36 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 28, justifyContent: 'center' }}>
            <Swatch color="#A366FF" name="Primary" hex="#A366FF" />
            <Swatch color="#FF6B9D" name="Accent" hex="#FF6B9D" />
            <Swatch color="#3DDBA4" name="Mint" hex="#3DDBA4" />
            <Swatch color="#2ED88A" name="Safe" hex="#2ED88A" />
            <Swatch color="#F5A623" name="Attention" hex="#F5A623" />
            <Swatch color="#FF4D6A" name="Danger" hex="#FF4D6A" />
            <Swatch color="#B57AFF" name="XP" hex="#B57AFF" />
            <Swatch color="#0D0B15" name="Background" hex="#0D0B15" />
          </div>
          <div style={{ marginTop: 36 }}>
            <Label>Gradients</Label>
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <div style={{ flex: 1, height: 48, borderRadius: 'var(--n2-radius-sm)', background: 'linear-gradient(135deg, #A366FF, #FF6B9D, #3DDBA4)' }} />
              <div style={{ flex: 1, height: 48, borderRadius: 'var(--n2-radius-sm)', background: 'linear-gradient(135deg, #2ED88A, #3DDBA4)' }} />
              <div style={{ flex: 1, height: 48, borderRadius: 'var(--n2-radius-sm)', background: 'linear-gradient(135deg, #A366FF, #B57AFF)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Buttons ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Buttons</SectionTitle>
        <div className="n2-card" style={{ padding: 36 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 16, alignItems: 'center' }}>
            <button className="n2-btn-primary">Connect Wallet</button>
            <button className="n2-btn-secondary">View on Kamino</button>
            <button className="n2-btn-ghost">Learn more</button>
          </div>
        </div>
      </section>

      {/* ===== Badges & Tags ===== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTitle>Badges &amp; Tags</SectionTitle>
        <div className="n2-card" style={{ padding: 36 }}>
          <Label>Status badges</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12, marginTop: 12 }}>
            <span className="n2-badge n2-badge-safe">SAFE</span>
            <span className="n2-badge n2-badge-attention">ATTENTION</span>
            <span className="n2-badge n2-badge-danger">DANGER</span>
            <span className="n2-badge n2-badge-xp">+150 XP</span>
          </div>
          <div className="n2-divider" style={{ margin: '24px 0' }} />
          <Label>Neurotags</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10, marginTop: 12 }}>
            <span className="n2-tag">#beginner</span>
            <span className="n2-tag">#wants-safety</span>
            <span className="n2-tag">#curious</span>
            <span className="n2-tag">#jargon-averse</span>
          </div>
        </div>
      </section>
    </>
  );
}
