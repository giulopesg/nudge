'use client';

/* ===== Font shortcuts ===== */
export const strong = "var(--font-lora), 'Lora', Georgia, serif";
export const accent = "var(--font-cormorant), 'Agbalumo', cursive";
export const ui = "var(--font-outfit), 'Outfit', system-ui, sans-serif";
export const mono = "var(--font-fira-code), 'Fira Code', monospace";

/* ===== Color Swatch ===== */
export function Swatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-20 h-20 rounded-2xl border border-white/5" style={{ background: color, boxShadow: `0 0 20px ${color}30` }} />
      <span style={{ fontFamily: strong, fontSize: 13, fontWeight: 500, color: 'var(--n2-text-secondary)' }}>{name}</span>
      <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)' }}>{hex}</span>
    </div>
  );
}

/* ===== Score Ring SVG ===== */
export function ScoreRing({ score, status }: { score: number; status: 'safe' | 'attention' | 'danger' }) {
  const colors = { safe: '#2ED88A', attention: '#F5A623', danger: '#FF4D6A' };
  const glows = { safe: 'rgba(46,216,138,0.3)', attention: 'rgba(245,166,35,0.3)', danger: 'rgba(255,77,106,0.3)' };
  const c = colors[status];
  const r = 62;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="n2-score-ring" style={{ width: 160, height: 160, margin: '0 auto' }}>
      <svg width="160" height="160">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,248,245,0.04)" strokeWidth="8" />
        <circle cx="80" cy="80" r={r} fill="none" stroke={c} strokeWidth="8" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} filter="url(#glow)" style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: strong, fontSize: 40, fontWeight: 700, color: c, textShadow: `0 0 16px ${glows[status]}`, lineHeight: 1 }}>{score}</div>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.10em', color: 'var(--n2-text-muted)', textTransform: 'uppercase' as const, marginTop: 4 }}>nudge score</div>
      </div>
    </div>
  );
}

/* ===== Mini ECG — matches real ECGMonitor layout ===== */
export function MiniECG() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* ECG trace area — fills available width */}
        <div className="n2-ecg" style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 20px', height: 80 }}>
          <svg width="100%" height="50" viewBox="0 0 300 50" preserveAspectRatio="none" style={{ opacity: 0.7 }}>
            <path
              className="n2-ecg-trace"
              d="M0,25 L40,25 L50,25 L55,8 L60,42 L65,15 L70,30 L75,25 L120,25 L130,25 L135,8 L140,42 L145,15 L150,30 L155,25 L200,25 L210,25 L215,8 L220,42 L225,15 L230,30 L235,25 L300,25"
              fill="none" stroke="#2ED88A" strokeWidth="2"
              strokeDasharray="600" strokeDashoffset="600"
              style={{ filter: 'drop-shadow(0 0 4px rgba(46,216,138,0.4))' }}
            />
          </svg>
        </div>
        {/* Score value display — outside ECG, matching real ECGMonitor */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>NS</span>
          <span style={{ fontFamily: strong, fontSize: 28, fontWeight: 700, color: '#2ED88A', textShadow: '0 0 16px rgba(46,216,138,0.4)' }}>78</span>
          <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: '#2ED88A', textTransform: 'uppercase' as const }}>Safe</span>
        </div>
      </div>
      {/* Scale markers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 4px 0', fontFamily: mono, fontSize: 11, color: 'var(--n2-text-muted)' }}>
        <span>0</span>
        <span>NUDGE SCORE</span>
        <span>100</span>
      </div>
    </div>
  );
}

/* ===== Section title ===== */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ fontFamily: strong, fontSize: 15, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--n2-primary)' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(196,161,255,0.15), transparent)' }} />
    </div>
  );
}

/* ===== Label ===== */
export function Label({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--n2-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{children}</span>;
}
