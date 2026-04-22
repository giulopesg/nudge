'use client';

import { useState } from 'react';
import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

function ModalPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="n2-btn-primary" onClick={() => setOpen(true)}>Open Modal</button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(7, 5, 14, 0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[400px] rounded-2xl border border-surface-border p-6 sm:p-8"
            style={{ background: 'rgba(13, 11, 21, 0.98)', backdropFilter: 'blur(24px)' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display text-[20px] font-bold text-foreground mb-2">Modal Title</h3>
            <p className="font-sans text-[14px] text-text-secondary mb-6 leading-relaxed">
              This is a modal overlay. Click outside or the button below to close.
            </p>
            <div className="flex gap-3">
              <button className="n2-btn-primary" onClick={() => setOpen(false)}>Confirm</button>
              <button className="n2-btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ModalsGroup({ copyCode, copied }: Props) {
  return (
    <>
      {/* ── Modal / Overlay ────────── */}
      <ComponentDoc
        id="comp-modal"
        name="Modal / Overlay"
        description="Full-screen overlay with centered content card. Base pattern for all modal variants."
        forDesigner="Overlay: 85% opacity dark bg with blur. Card: max-width 400px, radius-2xl, near-opaque bg. Always include close affordance (X or click-outside). Center vertically and horizontally."
        forDev="Fixed inset-0, z-50. Background: rgba(7,5,14,0.85) + backdrop-filter blur(8px). Inner card: max-w-[400px] rounded-2xl. Click overlay to close, stopPropagation on card."
        preview={<ModalPreview />}
        code={`{/* Overlay */}
<div className="fixed inset-0 z-50 flex items-center justify-center p-4"
  style={{ background: 'rgba(7,5,14,0.85)', backdropFilter: 'blur(8px)' }}
  onClick={onClose}>

  {/* Card */}
  <div className="w-full max-w-[400px] rounded-2xl border
    border-surface-border p-6"
    style={{ background: 'rgba(13,11,21,0.98)' }}
    onClick={e => e.stopPropagation()}>

    <h3 className="font-display text-[20px] font-bold">Title</h3>
    <p className="font-sans text-[14px] text-text-secondary">Content</p>
    <button className="n2-btn-primary">Confirm</button>
  </div>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── AlertModal ─────────────── */}
      <ComponentDoc
        id="comp-alert-modal"
        name="AlertModal"
        description="Full-screen alert overlay triggered by nudge urgency. Uses higher opacity (97%) and sheet-enter animation."
        forDesigner="Nearly opaque bg (97%). Card animates in with scale 0.97→1 (animate-sheet-enter). Border: surface-border. Bg: var(--surface). Actions at bottom."
        forDev="Overlay: fixed inset-0 z-50 bg-[rgba(7,5,14,0.97)]. Card: animate-sheet-enter, border, bg-surface, rounded-2xl. Escape key + click-outside to dismiss."
        preview={
          <div className="w-full max-w-[360px] rounded-2xl border border-surface-border p-5 animate-sheet-enter"
            style={{ background: 'var(--surface)' }}>
            <p className="font-mono text-[10px] text-danger uppercase tracking-wider mb-2 font-semibold">Alert</p>
            <h3 className="font-display text-[18px] font-bold text-foreground mb-2">Health Factor Critical</h3>
            <p className="font-sans text-[13px] text-text-secondary mb-4 leading-relaxed">
              Your HF dropped below 1.1. Take action to avoid liquidation.
            </p>
            <button className="n2-btn-primary">Add Collateral</button>
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyInline value="animate-sheet-enter" />
            </div>
          </div>
        }
        code={`<div className="fixed inset-0 z-50 flex items-center justify-center
  bg-[rgba(7,5,14,0.97)] p-4">
  <div className="animate-sheet-enter border border-surface-border
    bg-surface rounded-2xl p-6 max-w-md">
    <h3>Alert Title</h3>
    <p>Alert message</p>
    <button className="n2-btn-primary">Action</button>
  </div>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── EducationModal ─────────── */}
      <ComponentDoc
        id="comp-education-modal"
        name="EducationModal"
        description="Educational content modal with sections for learning about DeFi concepts."
        forDesigner="Same overlay pattern as AlertModal. Content card with scrollable sections. Each section: mono title + body text. Max-width 480px for readability."
        forDev="Same overlay + animate-sheet-enter pattern. Sections rendered from data array. Scrollable body with max-h constraint. Close button at top-right."
        preview={
          <div className="w-full max-w-[360px] rounded-2xl border border-surface-border p-5"
            style={{ background: 'var(--surface)' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[10px] text-primary uppercase tracking-wider font-semibold">Education</p>
              <span className="text-text-muted cursor-pointer text-[14px]">&#x2715;</span>
            </div>
            <h3 className="font-display text-[18px] font-bold text-foreground mb-3">What is Health Factor?</h3>
            <div className="space-y-3">
              <p className="font-sans text-[13px] text-text-secondary leading-relaxed">
                Health Factor (HF) measures the safety of your lending position. A higher HF means more collateral relative to debt.
              </p>
              <div className="rounded-lg p-3 border border-surface-border" style={{ background: 'rgba(163,102,255,0.03)' }}>
                <p className="font-mono text-[11px] text-primary mb-1">Key Thresholds</p>
                <p className="font-sans text-[12px] text-text-secondary">HF &gt; 1.5 = Safe | HF 1.1-1.5 = Attention | HF &lt; 1.1 = Danger</p>
              </div>
            </div>
          </div>
        }
        code={`<div className="animate-sheet-enter border border-surface-border
  bg-surface rounded-2xl p-6 max-w-[480px]">
  <div className="flex items-center justify-between mb-3">
    <span className="font-mono text-[10px] text-primary uppercase">
      Education
    </span>
    <button onClick={onClose}>✕</button>
  </div>
  <h3 className="font-display text-[18px] font-bold">{title}</h3>
  {sections.map(s => (
    <div key={s.title}>
      <p className="font-mono text-[11px] text-primary">{s.title}</p>
      <p className="text-[13px] text-text-secondary">{s.body}</p>
    </div>
  ))}
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── ItemDetailModal ────────── */}
      <ComponentDoc
        id="comp-item-detail-modal"
        name="ItemDetailModal"
        description="RPG item detail view showing icon, name, rarity, and description."
        forDesigner="Same overlay pattern. Center-aligned item icon (large). Item name in font-display bold. Rarity badge in primary color. Description below."
        forDev="Same modal wrapper. Displays item from RPG system inventory. Item icon, name, tier/rarity, description, and how-to-earn info."
        preview={
          <div className="w-full max-w-[300px] rounded-2xl border border-surface-border p-6 text-center"
            style={{ background: 'var(--surface)' }}>
            <span className="text-[48px]">&#x1f6e1;&#xfe0f;</span>
            <p className="font-display text-[18px] font-bold text-foreground mt-2">Shield of Prudence</p>
            <p className="font-mono text-[10px] text-primary uppercase tracking-wider mt-1">Legendary</p>
            <p className="font-sans text-[13px] text-text-secondary mt-3 leading-relaxed">
              Awarded for maintaining a Health Factor above 2.0 for 30 consecutive days.
            </p>
          </div>
        }
        code={`<div className="animate-sheet-enter text-center p-6">
  <span className="text-[48px]">{item.icon}</span>
  <p className="font-display text-[18px] font-bold">{item.name}</p>
  <p className="font-mono text-[10px] text-primary uppercase">
    {item.rarity}
  </p>
  <p className="text-[13px] text-text-secondary mt-3">
    {item.description}
  </p>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── ItemUnlockModal ────────── */}
      <ComponentDoc
        id="comp-item-unlock-modal"
        name="ItemUnlockModal"
        description="Celebratory modal when a new RPG item is unlocked. Features level-up glow animation."
        forDesigner="Primary border with glow animation (animate-level-up-glow). Large centered icon. Title + item name. Confetti-like glow effect. Text-center layout."
        forDev="Overlay with animate-sheet-enter. Card: border-primary/30 + animate-level-up-glow. Glow pulses between 20px and 60px shadow. Auto-dismisses after delay."
        preview={
          <div className="w-full max-w-[300px] rounded-2xl border p-6 text-center animate-level-up-glow"
            style={{ borderColor: 'rgba(163,102,255,0.3)', background: 'var(--surface)' }}>
            <p className="font-mono text-[10px] text-primary uppercase tracking-wider mb-3">Item Unlocked!</p>
            <span className="text-[48px]">&#x2728;</span>
            <p className="font-display text-[18px] font-bold text-foreground mt-2">Spark of Insight</p>
            <p className="font-sans text-[13px] text-text-secondary mt-2">You completed your first education module.</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <CopyInline value="animate-level-up-glow" />
            </div>
          </div>
        }
        code={`<div className="animate-sheet-enter animate-level-up-glow
  border border-primary/30 rounded-2xl p-6 text-center">
  <p className="font-mono text-[10px] text-primary uppercase">
    Item Unlocked!
  </p>
  <span className="text-[48px]">{item.icon}</span>
  <p className="font-display text-[18px] font-bold">{item.name}</p>
</div>

/* animate-level-up-glow: pulsing box-shadow
   20px→60px primary+xp glow, 1.5s infinite */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── LevelUpModal ──────────── */}
      <ComponentDoc
        id="comp-level-up-modal"
        name="LevelUpModal"
        description="Level-up celebration modal with large level number, XP theme, and reward list."
        forDesigner="XP color theme (--xp border/text). Large level number (48px+). Class icon + tier display. Rewards listed below. Same glow animation as ItemUnlock."
        forDev="Overlay with animate-sheet-enter. Card: border-xp/30 + animate-level-up-glow. Shows level number, class name, tier, earned rewards. Auto-dismiss optional."
        preview={
          <div className="w-full max-w-[300px] rounded-2xl border p-6 text-center animate-level-up-glow"
            style={{ borderColor: 'rgba(181,122,255,0.3)', background: 'var(--surface)' }}>
            <p className="font-mono text-[10px] text-xp uppercase tracking-wider mb-2">Level Up!</p>
            <p className="font-mono text-[48px] font-bold text-xp">4</p>
            <p className="font-display text-[16px] font-bold text-foreground mt-1">Guardia</p>
            <p className="font-mono text-[10px] text-primary uppercase tracking-wider">Tier III — Ascended</p>
            <div className="mt-4 space-y-1">
              <p className="font-mono text-[11px] text-text-muted">Rewards:</p>
              <p className="font-mono text-[12px] text-xp">+1 Inventory Slot</p>
              <p className="font-mono text-[12px] text-xp">New ability: Shield Wall</p>
            </div>
          </div>
        }
        code={`<div className="animate-sheet-enter animate-level-up-glow
  border border-xp/30 rounded-2xl p-6 text-center">
  <p className="font-mono text-[10px] text-xp uppercase">Level Up!</p>
  <p className="font-mono text-[48px] font-bold text-xp">{level}</p>
  <p className="font-display text-[16px] font-bold">{className}</p>
  <p className="font-mono text-[10px] text-primary uppercase">{tier}</p>
  <div className="mt-4">
    {rewards.map(r => <p className="text-xp">{r}</p>)}
  </div>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── WalletManageModal ──────── */}
      <ComponentDoc
        id="comp-wallet-manage-modal"
        name="WalletManageModal"
        description="Utility modal for managing watched wallets — add new addresses or remove existing ones."
        forDesigner="Standard modal card. Input field with mono font for wallet addresses. List view with checkboxes for removal. Confirm/Cancel button pair at bottom."
        forDev="Same overlay pattern. Input: font-mono, rounded-lg, border, bg-surface. List items with checkbox toggle. Uses localStorage for wallet list persistence."
        preview={
          <div className="w-full max-w-[360px] rounded-2xl border border-surface-border p-5"
            style={{ background: 'var(--surface)' }}>
            <h3 className="font-display text-[18px] font-bold text-foreground mb-3">Manage Wallets</h3>
            <div className="rounded-lg border border-surface-border p-2 mb-3" style={{ background: 'rgba(7,5,14,0.4)' }}>
              <input
                type="text"
                placeholder="Paste wallet address..."
                className="w-full bg-transparent font-mono text-[12px] text-text-secondary outline-none"
                readOnly
              />
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[12px] font-mono text-text-secondary">
                <div className="w-4 h-4 rounded border border-surface-border" />
                <span>7xKX...9mPQ</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-mono text-text-secondary">
                <div className="w-4 h-4 rounded border border-primary bg-primary-muted" />
                <span>DeFi...WaLt</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="n2-btn-primary">Save</button>
              <button className="n2-btn-ghost">Cancel</button>
            </div>
          </div>
        }
        code={`<div className="animate-sheet-enter border bg-surface rounded-2xl p-6">
  <h3 className="font-display text-[18px] font-bold">Manage Wallets</h3>

  {/* Input */}
  <div className="rounded-lg border border-surface-border p-2">
    <input className="font-mono text-[12px] bg-transparent w-full"
      placeholder="Paste wallet address..." />
  </div>

  {/* Wallet list */}
  {wallets.map(w => (
    <div className="flex items-center gap-2 font-mono text-[12px]">
      <input type="checkbox" /> {w.address}
    </div>
  ))}

  <button className="n2-btn-primary">Save</button>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
