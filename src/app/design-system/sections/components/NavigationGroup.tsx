'use client';

import { useState } from 'react';
import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';
import PlaygroundControls from '../PlaygroundControls';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function NavigationGroup({ copyCode, copied }: Props) {
  const [nav, setNav] = useState<Record<string, string | boolean | number>>({
    variant: 'desktop', active: true, badge: 3,
  });

  return (
    <>
      {/* ── NavItem ────────────────── */}
      <ComponentDoc
        id="comp-nav"
        name="NavItem"
        description="Navigation items for desktop sidebar and mobile bottom bar."
        forDesigner="Desktop: 44px height, Lora bold 15px label, 16px icon. Active: primary color + primary-muted bg. Mobile: vertical layout, Fira Code 9px label, floating bar with glassmorphism."
        forDev="Desktop: nav-item + nav-item-active. Mobile: nav-item-mobile + nav-item-mobile-active. Badge: nav-badge (desktop) or nav-badge-mobile. All in navigation.css."
        preview={
          <div className="w-full space-y-4">
            <PlaygroundControls
              controls={[
                { key: 'variant', label: 'Variant', type: 'select', options: ['desktop', 'mobile'], defaultValue: 'desktop' },
                { key: 'active', label: 'Active', type: 'toggle', defaultValue: true },
                { key: 'badge', label: 'Badge', type: 'range', min: 0, max: 9, defaultValue: 3 },
              ]}
              values={nav}
              onChange={setNav}
            />

            {nav.variant === 'desktop' ? (
              <div className="space-y-1 max-w-[220px]">
                <div className={`nav-item ${nav.active ? 'nav-item-active' : ''}`}>
                  <span className="nav-icon">&#x25c8;</span>
                  <span className="nav-label">Dashboard</span>
                  {(nav.badge as number) > 0 && <span className="nav-badge">{nav.badge}</span>}
                </div>
                <div className="nav-item">
                  <span className="nav-icon">&#x25c9;</span>
                  <span className="nav-label">Alertas</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2 py-1.5 rounded-2xl max-w-[340px]"
                style={{ background: 'rgba(7, 5, 14, 0.92)', border: '1px solid rgba(163, 102, 255, 0.15)', backdropFilter: 'blur(20px)' }}>
                <div className={`nav-item-mobile ${nav.active ? 'nav-item-mobile-active' : ''}`} style={{ position: 'relative' }}>
                  <span className="nav-icon-mobile">&#x25c8;</span>
                  <span className="nav-label-mobile">Home</span>
                  {(nav.badge as number) > 0 && <span className="nav-badge-mobile">{nav.badge}</span>}
                </div>
                <div className="nav-item-mobile">
                  <span className="nav-icon-mobile">&#x25c9;</span>
                  <span className="nav-label-mobile">Alertas</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <CopyInline value="nav-item" />
              <CopyInline value="nav-item-active" />
              <CopyInline value="nav-item-mobile" />
              <CopyInline value="nav-badge" />
            </div>
          </div>
        }
        code={`{/* Desktop sidebar */}
<div className="nav-item nav-item-active">
  <span className="nav-icon">icon</span>
  <span className="nav-label">Dashboard</span>
</div>

{/* Mobile bottom bar */}
<div className="nav-bottom">
  <div className="nav-item-mobile nav-item-mobile-active">
    <span className="nav-icon-mobile">icon</span>
    <span className="nav-label-mobile">Home</span>
  </div>
</div>

/* Desktop: 44px, Lora 15px bold, 10px radius
   Mobile: floating bar, glassmorphism, Fira Code 9px
   Active: --primary + --primary-muted bg */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── DashboardNav ───────────── */}
      <ComponentDoc
        id="comp-dashboard-nav"
        name="DashboardNav"
        description="Full dashboard navigation with desktop sidebar + mobile floating bottom bar + CharacterBadge."
        forDesigner="Desktop sidebar: 240px fixed left, brand section + nav items + character badge at bottom. Mobile: floating rounded bar 56px, centered bottom with safe-area padding."
        forDev="nav-sidebar for desktop wrapper. nav-bottom for mobile. Renders CharacterBadge at bottom. Icons use symbol chars. Active tab highlighted with nav-item-active."
        preview={
          <div className="w-full rounded-xl border border-surface-border overflow-hidden" style={{ height: 180 }}>
            <div className="flex h-full">
              <div className="w-[140px] border-r border-surface-border p-3 hidden sm:flex flex-col" style={{ background: 'rgba(7,5,14,0.6)' }}>
                <div className="mb-3 pb-2 border-b border-surface-border">
                  <span className="n2-gradient-text font-display text-[12px] font-bold uppercase">Nudge</span>
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-primary-muted text-primary text-[10px] font-mono">&#x25c8; Home</div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-text-muted text-[10px] font-mono">&#x25c9; Alerts</div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-text-muted text-[10px] font-mono">&#x25c6; Journey</div>
                </div>
                <div className="mt-auto pt-2 border-t border-surface-border">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-primary">
                    <span className="w-4 h-4 rounded-full bg-primary-muted flex items-center justify-center text-[8px]">&#x2726;</span>
                    Lv 3
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-3">
                <span className="font-mono text-[10px] text-text-muted">Content area</span>
              </div>
            </div>
          </div>
        }
        code={`{/* Desktop sidebar */}
<nav className="nav-sidebar">
  <div className="nav-sidebar-brand">
    <span className="n2-gradient-text font-display">Nudge</span>
  </div>
  <NavItem icon="◈" label="Home" active />
  <NavItem icon="◉" label="Alerts" badge={3} />
  <CharacterBadge />
</nav>

{/* Mobile bottom bar */}
<nav className="nav-bottom">
  <NavItemMobile icon="◈" label="Home" active />
  ...
</nav>

/* nav-sidebar: 240px fixed, transparent bg
   nav-bottom: floating, glassmorphism, safe-area padding */`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
