'use client';

import { useState } from 'react';
import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';
import PlaygroundControls from '../PlaygroundControls';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function LayoutGroup({ copyCode, copied }: Props) {
  const [card, setCard] = useState<Record<string, string | boolean | number>>({
    hover: false, content: 'Hover to see elevation effect.',
  });
  const [hero, setHero] = useState<Record<string, string | boolean | number>>({
    status: 'safe',
  });

  const heroMap: Record<string, { cls: string; desc: string; badge: string }> = {
    safe:      { cls: 'status-hero-safe', desc: "HF 2.4 — You're protected", badge: 'status-safe' },
    attention: { cls: 'status-hero-attention', desc: 'HF 1.3 — Monitor closely', badge: 'status-attention' },
    danger:    { cls: 'status-hero-danger', desc: 'HF 1.05 — Liquidation risk', badge: 'status-danger' },
    neutral:   { cls: 'status-hero-neutral', desc: 'No position detected', badge: '' },
  };
  const h = heroMap[hero.status as string] ?? heroMap.safe;

  return (
    <>
      {/* ── Card ────────────────────── */}
      <ComponentDoc
        id="comp-card"
        name="Card"
        description="Glassmorphism container with backdrop blur, subtle border, and hover elevation."
        forDesigner="Card is the base container for all content. Background is nearly transparent with blur. Border uses --surface-border. Hover lifts -2px with stronger shadow."
        forDev="Class: card. Includes backdrop-filter: blur(24px). Padding 16px mobile, 24px desktop. Hover changes bg, border, and adds translateY(-2px)."
        preview={
          <div className="w-full space-y-4">
            <PlaygroundControls
              controls={[
                { key: 'hover', label: 'Hover', type: 'toggle', defaultValue: false },
                { key: 'content', label: 'Content', type: 'text', defaultValue: 'Hover to see elevation effect.' },
              ]}
              values={card}
              onChange={setCard}
            />
            <div
              className="card max-w-[320px]"
              style={card.hover ? { transform: 'translateY(-2px)', borderColor: 'rgba(163,102,255,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' } : undefined}
            >
              <p className="font-display text-[15px] font-semibold text-foreground mb-1">Card</p>
              <p className="font-sans text-[13px] text-text-secondary">{card.content as string}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="card" />
            </div>
          </div>
        }
        code={`<div className="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>

/* CSS: background: var(--surface);
   border: 1px solid var(--surface-border);
   border-radius: var(--radius-lg);
   backdrop-filter: blur(24px);
   :hover → translateY(-2px) + shadow + brighter border */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── DashboardShell ──────────── */}
      <ComponentDoc
        id="comp-dashboard-shell"
        name="DashboardShell"
        description="Top-level layout with fixed header, sidebar (desktop), and floating bottom nav (mobile)."
        forDesigner="Header: 64px fixed, glassmorphism on scroll. Sidebar: 240px fixed left (desktop only). Mobile: floating bottom bar with rounded corners and blur."
        forDev="Classes: dashboard-layout, dashboard-main, dashboard-header, dashboard-header-scrolled, nav-sidebar. Content area padded for sidebar (md) and header (always)."
        preview={
          <div className="w-full rounded-xl border border-surface-border overflow-hidden" style={{ height: 200 }}>
            <div className="flex h-full">
              <div className="w-[100px] border-r border-surface-border p-3 hidden sm:flex flex-col gap-1" style={{ background: 'rgba(7,5,14,0.6)' }}>
                <div className="font-mono text-[8px] text-primary mb-2">SIDEBAR</div>
                <div className="h-5 rounded bg-primary-muted" />
                <div className="h-5 rounded" style={{ background: 'var(--surface)' }} />
                <div className="h-5 rounded" style={{ background: 'var(--surface)' }} />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="h-10 border-b border-surface-border flex items-center px-3" style={{ background: 'rgba(7,5,14,0.88)' }}>
                  <span className="font-mono text-[8px] text-text-muted">HEADER (64px fixed)</span>
                </div>
                <div className="flex-1 p-3">
                  <span className="font-mono text-[8px] text-text-muted">CONTENT AREA</span>
                </div>
              </div>
            </div>
          </div>
        }
        code={`<div className="dashboard-layout">
  <header className="dashboard-header dashboard-header-scrolled">
    {/* Brand + wallet button */}
  </header>
  <nav className="nav-sidebar">
    {/* Nav items */}
  </nav>
  <main className="dashboard-main">
    {/* Page content */}
  </main>
</div>

/* dashboard-main: pt-64px (header), pl-240px (sidebar on md+)
   dashboard-header-scrolled: blur + dark bg on scroll */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── StatusHero ──────────────── */}
      <ComponentDoc
        id="comp-status-hero"
        name="StatusHero"
        description="Large status card at the top of the dashboard. Gradient background indicates health state."
        forDesigner="Each status has a unique gradient bg and border. Safe=green, Attention=orange, Danger=red (with breathing animation), Neutral=purple. Border-radius 24px."
        forDev="Classes: status-hero-safe/attention/danger/neutral. Gradient bg + 1px border + 24px radius. Danger variant includes n2-breathe animation (4s)."
        preview={
          <div className="w-full space-y-4">
            <PlaygroundControls
              controls={[
                { key: 'status', label: 'Status', type: 'select', options: ['safe', 'attention', 'danger', 'neutral'], defaultValue: 'safe' },
              ]}
              values={hero}
              onChange={setHero}
            />
            <div className={`${h.cls} p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display text-[15px] font-bold text-foreground capitalize">{hero.status as string}</span>
                {h.badge && <span className={`status-badge ${h.badge}`} style={{ fontSize: 10, padding: '3px 10px' }}>{(hero.status as string).charAt(0).toUpperCase() + (hero.status as string).slice(1)}</span>}
              </div>
              <p className="font-sans text-[12px] text-text-secondary">{h.desc}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="status-hero-safe" />
              <CopyInline value="status-hero-attention" />
              <CopyInline value="status-hero-danger" />
              <CopyInline value="status-hero-neutral" />
            </div>
          </div>
        }
        code={`<div className="status-hero-safe">
  <span className="status-badge status-safe">Safe</span>
  <p>HF 2.4 — You're protected</p>
</div>

<div className="status-hero-attention">...</div>
<div className="status-hero-danger">...</div>  /* includes breathing animation */
<div className="status-hero-neutral">...</div>

/* CSS: gradient background + 1px border + 24px radius
   Danger: animation: n2-breathe 4s ease-in-out infinite */`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
