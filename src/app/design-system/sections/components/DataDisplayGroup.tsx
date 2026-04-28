'use client';

import { useState } from 'react';
import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';
import PlaygroundControls from '../PlaygroundControls';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function DataDisplayGroup({ copyCode, copied }: Props) {
  const [hb, setHb] = useState<Record<string, string | boolean | number>>({
    status: 'safe', value: 85,
  });
  const [ring, setRing] = useState<Record<string, string | boolean | number>>({
    score: 78,
  });

  const hbColors: Record<string, { fill: string; glow: string; text: string; label: string }> = {
    safe:      { fill: 'var(--safe)', glow: 'glow-safe', text: 'text-safe', label: 'HF 2.41 — Safe' },
    attention: { fill: 'var(--attention)', glow: 'glow-attention', text: 'text-attention', label: 'HF 1.3 — Attention' },
    danger:    { fill: 'var(--danger)', glow: 'glow-danger', text: 'text-danger', label: 'HF 1.05 — Danger' },
  };
  const hbc = hbColors[hb.status as string] ?? hbColors.safe;

  const scoreVal = ring.score as number;
  const circumference = 2 * Math.PI * 60;
  const ringColor = scoreVal >= 70 ? 'var(--safe)' : scoreVal >= 40 ? 'var(--attention)' : 'var(--danger)';

  return (
    <>
      {/* ── WalletCard ──────────────── */}
      <ComponentDoc
        id="comp-wallet-card"
        name="WalletCard"
        description="Displays wallet SOL balance with optional USD conversion. Uses card base with rounded-2xl."
        forDesigner="Card with rounded-2xl. Title in font-display, balance in font-mono bold. Secondary USD value in text-muted italic. Keep hierarchy: label > value > secondary."
        forDev="Uses card class + rounded-2xl. Balance formatted with toFixed(4). USD price from Jupiter API. Falls back to -- when no position."
        preview={
          <div className="card rounded-2xl max-w-[320px] w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="font-display text-[15px] font-semibold text-foreground">Wallet</span>
              <span className="font-mono text-[11px] text-text-muted">SOL</span>
            </div>
            <p className="font-mono text-[28px] font-bold text-foreground">12.4521</p>
            <p className="font-sans text-[13px] text-text-muted mt-1" style={{ fontStyle: 'italic' }}>~$1,870.00 USD</p>
          </div>
        }
        code={`<div className="card rounded-2xl">
  <div className="flex items-center justify-between mb-3">
    <span className="font-display text-[15px] font-semibold">Wallet</span>
    <span className="font-mono text-[11px] text-text-muted">SOL</span>
  </div>
  <p className="font-mono text-[28px] font-bold">{balance}</p>
  <p className="text-[13px] text-text-muted italic">~${'${usd}'} USD</p>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── PortfolioCard ──────────── */}
      <ComponentDoc
        id="comp-portfolio-card"
        name="PortfolioCard"
        description="Token holdings list with colored badges per asset. Portfolio bar shows allocation proportions."
        forDesigner="Each token has a hardcoded brand color (SOL=#9945FF, USDC=#2775CA, USDT=#26A17B). Portfolio bar: 8px rounded segments. Fallback color: --plum."
        forDev="Token colors are hardcoded map. Portfolio bar uses portfolio-bar + portfolio-bar-segment classes. Segment widths set inline as percentages."
        preview={
          <div className="card rounded-2xl max-w-[360px] w-full">
            <p className="font-display text-[15px] font-semibold text-foreground mb-3">Portfolio</p>
            <div className="portfolio-bar mb-3">
              <div className="portfolio-bar-segment" style={{ width: '60%', background: '#9945FF' }} />
              <div className="portfolio-bar-segment" style={{ width: '25%', background: '#2775CA' }} />
              <div className="portfolio-bar-segment" style={{ width: '15%', background: '#26A17B' }} />
            </div>
            <div className="space-y-2">
              {[
                { token: 'SOL', color: '#9945FF', amount: '12.45', pct: '60%' },
                { token: 'USDC', color: '#2775CA', amount: '450.00', pct: '25%' },
                { token: 'USDT', color: '#26A17B', amount: '280.00', pct: '15%' },
              ].map(t => (
                <div key={t.token} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                  <span className="font-mono text-[12px] text-foreground flex-1">{t.token}</span>
                  <span className="font-mono text-[12px] text-text-secondary">{t.amount}</span>
                  <span className="font-mono text-[10px] text-text-muted w-8 text-right">{t.pct}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyInline value="portfolio-bar" />
              <CopyInline value="portfolio-bar-segment" />
            </div>
          </div>
        }
        code={`<div className="portfolio-bar">
  <div className="portfolio-bar-segment" style={{ width: '60%', background: '#9945FF' }} />
  <div className="portfolio-bar-segment" style={{ width: '25%', background: '#2775CA' }} />
</div>

/* portfolio-bar: 8px height, radius-full, flex row
   portfolio-bar-segment: height 100%, animated width transition */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── KaminoCard ─────────────── */}
      <ComponentDoc
        id="comp-kamino-card"
        name="KaminoCard"
        description="Lending position summary (via Kamino protocol) with collateral, debt, and Health Factor status badge."
        forDesigner="Status badge next to HF value indicates zone (safe/attention/danger). Collateral and debt displayed as key-value rows. Card uses base card class."
        forDev="Uses card + status-badge classes. HF thresholds: safe (>1.5), attention (1.1-1.5), danger (<1.1). Position data from /api/position/[wallet] route."
        preview={
          <div className="card rounded-2xl max-w-[360px] w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="font-display text-[15px] font-semibold text-foreground">Lending Position</span>
              <span className="status-badge status-safe" style={{ fontSize: 10, padding: '3px 10px' }}>Safe</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-mono text-[12px] text-text-muted">Health Factor</span>
                <span className="font-mono text-[14px] font-bold text-safe">2.41</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[12px] text-text-muted">Collateral</span>
                <span className="font-mono text-[12px] text-foreground">$3,200</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[12px] text-text-muted">Debt</span>
                <span className="font-mono text-[12px] text-foreground">$1,328</span>
              </div>
            </div>
          </div>
        }
        code={`<div className="card rounded-2xl">
  <div className="flex items-center justify-between mb-3">
    <span className="font-display font-semibold">Lending Position</span>
    <span className="status-badge status-safe">Safe</span>
  </div>
  <div className="flex justify-between">
    <span>Health Factor</span>
    <span className="font-bold text-safe">{hf}</span>
  </div>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── HealthBar ──────────────── */}
      <ComponentDoc
        id="comp-health-bar"
        name="HealthBar"
        description="Health Factor visualization bar with status-colored fill and glow."
        forDesigner="Bar height 6px. Fill color matches HF zone: safe (green), attention (orange), danger (red). Add glow class for emphasis. Always full border-radius."
        forDev="Uses stat-bar + stat-bar-fill. Color is determined dynamically. Glow classes: glow-safe, glow-attention, glow-danger. Width set via inline style."
        preview={
          <div className="w-full space-y-4">
            <PlaygroundControls
              controls={[
                { key: 'status', label: 'Status', type: 'select', options: ['safe', 'attention', 'danger'], defaultValue: 'safe' },
                { key: 'value', label: 'Value', type: 'range', min: 0, max: 100, defaultValue: 85 },
              ]}
              values={hb}
              onChange={setHb}
            />
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-mono text-[11px] text-text-muted">{hbc.label}</span>
                <span className={`font-mono text-[11px] ${hbc.text}`}>{hb.value}%</span>
              </div>
              <div className={`stat-bar ${hbc.glow}`}>
                <div className="stat-bar-fill" style={{ width: `${hb.value}%`, background: hbc.fill }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="stat-bar" />
              <CopyInline value="stat-bar-fill" />
              <CopyInline value="glow-safe" />
              <CopyInline value="glow-attention" />
              <CopyInline value="glow-danger" />
            </div>
          </div>
        }
        code={`<div className="stat-bar glow-safe">
  <div className="stat-bar-fill stat-bar-fill-safe" style={{ width: '85%' }} />
</div>

/* stat-bar: 6px, radius-full, surface bg
   Glow variants: glow-safe, glow-attention, glow-danger
   Fill variants: stat-bar-fill-primary, -safe, -xp
   Or set color inline: background: var(--attention) */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── ScoreRing ──────────────── */}
      <ComponentDoc
        id="comp-score-ring"
        name="ScoreRing"
        description="SVG circular progress ring for NudgeScore (0-100). Color changes with score zone."
        forDesigner="160x160 SVG with 2 circles: muted background + colored progress. Score number centered. Glow via SVG filter (Gaussian blur). Zone colors: safe/attention/danger."
        forDev="SVG strokeDasharray + strokeDashoffset for progress. Circumference = 2 * PI * r. Filter with feGaussianBlur for glow effect. Color from zone threshold."
        preview={
          <div className="flex flex-col items-center gap-4">
            <PlaygroundControls
              controls={[
                { key: 'score', label: 'Score', type: 'range', min: 0, max: 100, defaultValue: 78 },
              ]}
              values={ring}
              onChange={setRing}
            />
            <svg width="120" height="120" viewBox="0 0 160 160">
              <defs>
                <filter id="ring-glow-pg">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(255,248,240,0.06)" strokeWidth="8" />
              <circle cx="80" cy="80" r="60" fill="none" stroke={ringColor} strokeWidth="8"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={`${circumference * (1 - scoreVal / 100)}`}
                strokeLinecap="round" transform="rotate(-90 80 80)" filter="url(#ring-glow-pg)"
                style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
              />
              <text x="80" y="76" textAnchor="middle" className="font-mono" fill="var(--foreground)" fontSize="32" fontWeight="700">{scoreVal}</text>
              <text x="80" y="98" textAnchor="middle" className="font-mono" fill="var(--text-muted)" fontSize="11">NUDGE SCORE</text>
            </svg>
          </div>
        }
        code={`<svg width="160" height="160" viewBox="0 0 160 160">
  <circle cx="80" cy="80" r="60" fill="none"
    stroke="rgba(255,248,240,0.06)" strokeWidth="8" />
  <circle cx="80" cy="80" r="60" fill="none"
    stroke="var(--safe)" strokeWidth="8"
    strokeDasharray={circumference}
    strokeDashoffset={circumference * (1 - score/100)}
    strokeLinecap="round" transform="rotate(-90 80 80)"
    filter="url(#ring-glow)" />
  <text x="80" y="76" textAnchor="middle">{score}</text>
</svg>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── ScoreExplainer ─────────── */}
      <ComponentDoc
        id="comp-score-explainer"
        name="ScoreExplainer"
        description="Breakdown of NudgeScore metrics with color-coded level indicators."
        forDesigner="Each metric shows label + level (good/ok/bad) with matching status color. Compact list, font-mono for values. Uses semantic colors for levels."
        forDev="Maps score.metrics to rows. Level maps to colors: good=safe, ok=attention, bad=danger. Each row: label (text-muted) + level badge (colored)."
        preview={
          <div className="w-full max-w-[320px] space-y-2">
            {[
              { label: 'Health Factor', level: 'good', color: 'var(--safe)' },
              { label: 'Diversification', level: 'ok', color: 'var(--attention)' },
              { label: 'Stablecoin', level: 'good', color: 'var(--safe)' },
              { label: 'Concentration', level: 'bad', color: 'var(--danger)' },
            ].map(m => (
              <div key={m.label} className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-text-muted">{m.label}</span>
                <span className="font-mono text-[11px] font-semibold uppercase" style={{ color: m.color }}>{m.level}</span>
              </div>
            ))}
          </div>
        }
        code={`{metrics.map(m => (
  <div className="flex items-center justify-between">
    <span className="font-mono text-[12px] text-text-muted">{m.label}</span>
    <span className="font-mono text-[11px] font-semibold uppercase"
      style={{ color: levelColor(m.level) }}>
      {m.level}
    </span>
  </div>
))}

/* Level colors: good → var(--safe), ok → var(--attention), bad → var(--danger) */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── ECGMonitor ─────────────── */}
      <ComponentDoc
        id="comp-ecg-monitor"
        name="ECGMonitor"
        description="Retro ECG-style canvas animation with grid overlay and scanlines. Visual heartbeat for the dashboard."
        forDesigner="80px height. Grid uses orchid lines at 20px intervals. Scanlines overlay for retro effect. Status color determines line hue (safe=green, danger=red)."
        forDev="Classes: ecg-container, ecg-monitor, ecg-grid, ecg-scanlines. Canvas draws animated ECG wave. Grid + scanlines are CSS overlays (pointer-events: none)."
        preview={
          <div className="ecg-container w-full max-w-[360px]">
            <div className="ecg-monitor ecg-grid ecg-scanlines relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[10px] text-text-muted opacity-50">Canvas ECG animation renders here</span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <CopyInline value="ecg-container" />
              <CopyInline value="ecg-monitor" />
              <CopyInline value="ecg-grid" />
              <CopyInline value="ecg-scanlines" />
            </div>
          </div>
        }
        code={`<div className="ecg-container">
  <div className="ecg-monitor ecg-grid ecg-scanlines relative">
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
  </div>
</div>

/* ecg-monitor: 80px, border, radius-md, blur
   ecg-grid: 20px grid lines (orchid 6% opacity)
   ecg-scanlines: horizontal repeating lines */`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
