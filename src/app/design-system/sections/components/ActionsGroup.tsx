'use client';

import { useState } from 'react';
import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';
import PlaygroundControls from '../PlaygroundControls';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function ActionsGroup({ copyCode, copied }: Props) {
  const [btn, setBtn] = useState<Record<string, string | boolean | number>>({
    variant: 'primary', label: 'Click me', disabled: false,
  });
  const [ac, setAc] = useState<Record<string, string | boolean | number>>({
    variant: 'default', title: 'Action Title',
  });

  const acVariants: Record<string, { cls: string; icon: string; desc: string }> = {
    default:  { cls: '', icon: '\u{1F4CB}', desc: 'Tap to perform action' },
    attention: { cls: 'action-card-attention', icon: '\u26A0\uFE0F', desc: 'Needs review' },
    urgent:   { cls: 'action-card-urgent', icon: '\u{1F6A8}', desc: 'Immediate action required' },
    disabled: { cls: 'action-card-disabled', icon: '\u{1F512}', desc: 'Locked' },
  };
  const acV = acVariants[ac.variant as string] ?? acVariants.default;

  return (
    <>
      {/* ── Button ──────────────────── */}
      <ComponentDoc
        id="comp-button"
        name="Button"
        description="Primary, secondary, and ghost actions. Pill-shaped with gradient hover effects."
        forDesigner="Use --primary for main CTA, --plum for secondary. Always uppercase. Border-radius full (pill). Min touch target 44px."
        forDev="Classes: n2-btn-primary, n2-btn-secondary, n2-btn-ghost. Defined in buttons.css. Hover includes gradient fill + glow shadow."
        preview={
          <div className="flex flex-col gap-4 w-full">
            <PlaygroundControls
              controls={[
                { key: 'variant', label: 'Variant', type: 'select', options: ['primary', 'secondary', 'ghost'], defaultValue: 'primary' },
                { key: 'label', label: 'Label', type: 'text', defaultValue: 'Click me' },
                { key: 'disabled', label: 'Disabled', type: 'toggle', defaultValue: false },
              ]}
              values={btn}
              onChange={setBtn}
            />
            <div className="flex flex-wrap gap-3 items-center">
              <button
                className={`n2-btn-${btn.variant}`}
                disabled={!!btn.disabled}
                style={btn.disabled ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
              >
                {btn.label as string}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="n2-btn-primary" />
              <CopyInline value="n2-btn-secondary" />
              <CopyInline value="n2-btn-ghost" />
            </div>
          </div>
        }
        code={`<button className="n2-btn-primary">Primary</button>
<button className="n2-btn-secondary">Secondary</button>
<button className="n2-btn-ghost">Ghost</button>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── ActionCard ──────────────── */}
      <ComponentDoc
        id="comp-action-card"
        name="ActionCard"
        description="Contextual action cards with hover glow. Variants: default (primary), attention (orange), urgent (red), disabled."
        forDesigner="Default border uses --surface-border. Attention variant: orange tint. Urgent: red tint. Hover lifts -1px with status glow. Disabled: 40% opacity."
        forDev="Classes: action-card, action-card-attention, action-card-urgent, action-card-disabled. Also enhanced variants: action-card-enhanced + status suffix."
        preview={
          <div className="flex flex-col gap-4 w-full">
            <PlaygroundControls
              controls={[
                { key: 'variant', label: 'Variant', type: 'select', options: ['default', 'attention', 'urgent', 'disabled'], defaultValue: 'default' },
                { key: 'title', label: 'Title', type: 'text', defaultValue: 'Action Title' },
              ]}
              values={ac}
              onChange={setAc}
            />
            <div className="w-full max-w-[320px]">
              <div className={`action-card ${acV.cls}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[16px]">{acV.icon}</span>
                  <span className="font-display text-[14px] font-semibold text-foreground">{ac.title as string}</span>
                </div>
                <p className="font-sans text-[12px] text-text-secondary">{acV.desc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="action-card" />
              <CopyInline value="action-card-attention" />
              <CopyInline value="action-card-urgent" />
              <CopyInline value="action-card-disabled" />
            </div>
          </div>
        }
        code={`<div className="action-card">
  <h4>Default Action</h4>
  <p>Description</p>
</div>

<div className="action-card action-card-attention">...</div>
<div className="action-card action-card-urgent">...</div>
<div className="action-card action-card-disabled">...</div>

/* Enhanced variant with gradient bg: */
<div className="action-card-enhanced">...</div>
<div className="action-card-enhanced-attention">...</div>
<div className="action-card-enhanced-urgent">...</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── WalletButton ────────────── */}
      <ComponentDoc
        id="comp-wallet-button"
        name="WalletButton"
        description="Solana wallet connect button. Styled via wallet-adapter CSS overrides to match the design system."
        forDesigner="Pill-shaped (radius-full), Fira Code mono, --primary border + glow. Hover fills with gradient and inverts text to --background. Height 40px."
        forDev="Uses @solana/wallet-adapter-react-ui. Styles overridden in globals.css under .wallet-adapter-button. No custom className needed."
        preview={
          <div className="flex flex-col gap-3">
            <button className="wallet-adapter-button" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              Connect Wallet
            </button>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="wallet-adapter-button" />
            </div>
          </div>
        }
        code={`import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

<WalletMultiButton />

/* Styled via globals.css overrides:
   .wallet-adapter-button {
     border: 1px solid var(--primary);
     border-radius: var(--radius-full);
     font-family: Fira Code;
     box-shadow: 0 0 12px var(--primary-glow);
   }
   :hover → gradient fill + inverted text */`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
