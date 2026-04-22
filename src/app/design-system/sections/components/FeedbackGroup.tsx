'use client';

import { useState } from 'react';
import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';
import PlaygroundControls from '../PlaygroundControls';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function FeedbackGroup({ copyCode, copied }: Props) {
  const [badge, setBadge] = useState<Record<string, string | boolean | number>>({
    variant: 'safe', label: 'Safe',
  });
  const [prog, setProg] = useState<Record<string, string | boolean | number>>({
    variant: 'primary', value: 72,
  });
  const [toast, setToast] = useState<Record<string, string | boolean | number>>({
    amount: 25, label: 'First Dashboard Visit',
  });
  const [insight, setInsight] = useState<Record<string, string | boolean | number>>({
    type: 'info',
  });

  const badgeStyles: Record<string, { color: string; bg: string; border: string; glow: string }> = {
    safe:      { color: 'var(--safe)', bg: 'var(--safe-muted)', border: 'rgba(0,212,170,0.3)', glow: '0 0 12px var(--safe-glow)' },
    attention: { color: 'var(--attention)', bg: 'var(--attention-muted)', border: 'rgba(245,166,35,0.3)', glow: '0 0 12px var(--attention-glow)' },
    danger:    { color: 'var(--danger)', bg: 'var(--danger-muted)', border: 'rgba(255,77,106,0.3)', glow: '0 0 12px var(--danger-glow)' },
    xp:        { color: 'var(--xp)', bg: 'var(--xp-muted)', border: 'rgba(181,122,255,0.3)', glow: '0 0 12px var(--xp-glow)' },
  };
  const bs = badgeStyles[badge.variant as string] ?? badgeStyles.safe;

  const progColors: Record<string, string> = { primary: 'stat-bar-fill-primary', safe: 'stat-bar-fill-safe', xp: 'stat-bar-fill-xp' };
  const progTextColor: Record<string, string> = { primary: 'text-primary', safe: 'text-safe', xp: 'text-xp' };

  const insightMap: Record<string, { label: string; color: string; borderColor: string; bg: string; cls: string; msg: string }> = {
    info:    { label: 'Info', color: 'var(--primary)', borderColor: 'rgba(163,102,255,0.2)', bg: 'transparent', cls: '', msg: 'Your portfolio is well diversified across 4 tokens.' },
    warning: { label: 'Warning', color: 'var(--attention)', borderColor: 'rgba(245,166,35,0.4)', bg: 'rgba(245,166,35,0.05)', cls: '', msg: '80% concentrated in SOL. Consider diversifying.' },
    action:  { label: 'Action', color: 'var(--danger)', borderColor: 'rgba(255,77,106,0.4)', bg: 'rgba(255,77,106,0.05)', cls: 'animate-pulse-glow', msg: 'HF approaching liquidation. Add collateral now.' },
  };
  const ins = insightMap[insight.type as string] ?? insightMap.info;

  return (
    <>
      {/* ── Badge / Status ─────────── */}
      <ComponentDoc
        id="comp-badge"
        name="Badge / Status"
        description="Neon status indicators for Health Factor states and RPG milestones."
        forDesigner="Each status has a dedicated color + glow. Always use Fira Code mono. Uppercase. Use the matching bg/border/glow triplet."
        forDev="Classes: status-badge + status-safe/attention/danger. Font: Fira Code 13px, uppercase. Each variant has color, bg, border, and box-shadow."
        preview={
          <div className="flex flex-col gap-4 w-full">
            <PlaygroundControls
              controls={[
                { key: 'variant', label: 'Variant', type: 'select', options: ['safe', 'attention', 'danger', 'xp'], defaultValue: 'safe' },
                { key: 'label', label: 'Label', type: 'text', defaultValue: 'Safe' },
              ]}
              values={badge}
              onChange={setBadge}
            />
            <div className="flex flex-wrap gap-3 items-center">
              <span
                className="font-mono text-[13px] font-medium uppercase tracking-[0.06em] px-4 py-1.5 rounded-full"
                style={{ color: bs.color, background: bs.bg, border: `1px solid ${bs.border}`, boxShadow: bs.glow }}
              >
                {badge.label as string}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="status-badge" />
              <CopyInline value="status-safe" />
              <CopyInline value="status-attention" />
              <CopyInline value="status-danger" />
            </div>
          </div>
        }
        code={`<span className="status-badge status-safe">Safe</span>
<span className="status-badge status-attention">Attention</span>
<span className="status-badge status-danger">Danger</span>

/* status-badge: Fira Code 13px, uppercase, radius-full
   Variants: status-safe (green glow), status-attention (orange),
   status-danger (red). Each includes bg, border, box-shadow */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── ProgressBar ────────────── */}
      <ComponentDoc
        id="comp-progress"
        name="Progress Bar"
        description="Stat bars for RPG stats, XP, and Health Factor visualization."
        forDesigner="Bar height is 6px. Fill uses gradient backgrounds. Three variants: primary (orchid->rose), safe (green->mint), xp (orchid->violet). Always full border-radius."
        forDev="Container: stat-bar (6px, radius-full). Fill: stat-bar-fill + variant class. Width is set inline. Transition: 0.8s cubic-bezier."
        preview={
          <div className="w-full space-y-4">
            <PlaygroundControls
              controls={[
                { key: 'variant', label: 'Variant', type: 'select', options: ['primary', 'safe', 'xp'], defaultValue: 'primary' },
                { key: 'value', label: 'Value', type: 'range', min: 0, max: 100, defaultValue: 72 },
              ]}
              values={prog}
              onChange={setProg}
            />
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-mono text-[11px] text-text-muted capitalize">{prog.variant as string}</span>
                <span className={`font-mono text-[11px] ${progTextColor[prog.variant as string] ?? 'text-primary'}`}>{prog.value}%</span>
              </div>
              <div className="stat-bar">
                <div className={`stat-bar-fill ${progColors[prog.variant as string] ?? 'stat-bar-fill-primary'}`} style={{ width: `${prog.value}%` }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="stat-bar" />
              <CopyInline value="stat-bar-fill" />
              <CopyInline value="stat-bar-fill-primary" />
              <CopyInline value="stat-bar-fill-safe" />
              <CopyInline value="stat-bar-fill-xp" />
            </div>
          </div>
        }
        code={`<div className="stat-bar">
  <div className="stat-bar-fill stat-bar-fill-primary" style={{ width: '72%' }} />
</div>

/* stat-bar: 6px height, radius-full
   Variants: stat-bar-fill-primary (orchid→rose),
   stat-bar-fill-safe (green→mint), stat-bar-fill-xp (orchid→violet) */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── XpToast ────────────────── */}
      <ComponentDoc
        id="comp-xp-toast"
        name="XpToast"
        description="Floating XP notification that animates upward then fades out. Triggered by activity grants."
        forDesigner="Pill-shaped, XP color theme (--xp). Floats from bottom-center, drifts up 40px, fades. Duration 2.5s. Glow text for emphasis."
        forDev="Classes: animate-xp-toast, text-glow-primary, rounded-full, border-xp/30, bg-xp-muted. Position: fixed bottom-24 left-1/2 z-50 pointer-events-none."
        preview={
          <div className="flex flex-col gap-4 w-full">
            <PlaygroundControls
              controls={[
                { key: 'amount', label: 'Amount', type: 'range', min: 5, max: 100, defaultValue: 25 },
                { key: 'label', label: 'Label', type: 'text', defaultValue: 'First Dashboard Visit' },
              ]}
              values={toast}
              onChange={setToast}
            />
            <div className="relative flex items-center justify-center h-[80px]">
              <div className="rounded-full border px-4 py-2 shadow-lg"
                style={{
                  color: 'var(--xp)', background: 'var(--xp-muted)',
                  borderColor: 'rgba(181,122,255,0.3)',
                  boxShadow: '0 0 12px var(--xp-glow)',
                }}>
                <span className="font-mono text-[14px] font-bold text-glow-primary">+{toast.amount} XP</span>
                <span className="font-mono text-[11px] ml-2 opacity-80">{toast.label as string}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="animate-xp-toast" />
              <CopyInline value="text-glow-primary" />
            </div>
          </div>
        }
        code={`<div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2
  pointer-events-none animate-xp-toast">
  <div className="rounded-full border border-xp/30 bg-xp-muted
    px-4 py-2 shadow-lg">
    <span className="font-mono text-[14px] font-bold text-xp
      text-glow-primary">+25 XP</span>
    <span className="font-mono text-[11px] ml-2">Activity Name</span>
  </div>
</div>

/* animate-xp-toast: 0→scale(0.9) → visible → drift -40px → fade
   Duration: 2.5s ease-out forwards */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── InsightCards ───────────── */}
      <ComponentDoc
        id="comp-insight-cards"
        name="InsightCards"
        description="Contextual alert cards for HF warnings, concentration risks, and portfolio tips."
        forDesigner="Three types: info (primary border), warning (attention border + bg), action (danger border + pulse animation). Card with left accent via border-color."
        forDev="Uses card base. Type determines border/bg: info → border-primary/20, warning → border-attention/40 + bg-attention/5, action → border-danger/40 + bg-danger/5 + animate-pulse-glow."
        preview={
          <div className="w-full space-y-4">
            <PlaygroundControls
              controls={[
                { key: 'type', label: 'Type', type: 'select', options: ['info', 'warning', 'action'], defaultValue: 'info' },
              ]}
              values={insight}
              onChange={setInsight}
            />
            <div className={`card rounded-lg max-w-[400px] ${ins.cls}`} style={{ borderColor: ins.borderColor, background: ins.bg }}>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: ins.color }}>{ins.label}</p>
              <p className="font-sans text-[13px] text-text-secondary">{ins.msg}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="card" />
              <CopyInline value="animate-pulse-glow" />
            </div>
          </div>
        }
        code={`{/* Info */}
<div className="card rounded-lg border-primary/20">
  <p className="font-mono text-[10px] text-primary">Info</p>
  <p>Message</p>
</div>

{/* Warning */}
<div className="card rounded-lg border-attention/40 bg-attention/5">
  ...
</div>

{/* Action (urgent) */}
<div className="card rounded-lg border-danger/40 bg-danger/5 animate-pulse-glow">
  ...
</div>`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
