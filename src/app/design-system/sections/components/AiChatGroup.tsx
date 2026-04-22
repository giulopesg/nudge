'use client';

import { useState } from 'react';
import ComponentDoc from '../ComponentDoc';
import CopyInline from '../CopyInline';
import PlaygroundControls from '../PlaygroundControls';

interface Props {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function AiChatGroup({ copyCode, copied }: Props) {
  const [chat, setChat] = useState<Record<string, string | boolean | number>>({
    role: 'lyra', message: 'Your Health Factor dropped to 1.3. Consider adding collateral.',
  });

  return (
    <>
      {/* ── ChatMessage ────────────── */}
      <ComponentDoc
        id="comp-chat"
        name="ChatMessage"
        description="Chat bubbles for Lyra AI assistant, user messages, and suggestion pills."
        forDesigner="Lyra messages: left-aligned, primary-muted bg, primary border-left. User messages: right-aligned, plum-muted bg. Suggestion pills: small, rounded-full, hover glow."
        forDev="Custom styles — use Tailwind classes. Lyra: bg-primary-muted border-l-2 border-primary. User: bg-plum-muted ml-auto. Pills: inline buttons with pill shape."
        preview={
          <div className="w-full space-y-4 max-w-[400px]">
            <PlaygroundControls
              controls={[
                { key: 'role', label: 'Role', type: 'select', options: ['lyra', 'user'], defaultValue: 'lyra' },
                { key: 'message', label: 'Message', type: 'text', defaultValue: 'Your Health Factor dropped to 1.3. Consider adding collateral.' },
              ]}
              values={chat}
              onChange={setChat}
            />
            <div className="space-y-3">
              {chat.role === 'lyra' ? (
                <div className="rounded-xl p-3 border-l-2 border-primary max-w-[85%]" style={{ background: 'var(--primary-muted)' }}>
                  <p className="font-mono text-[10px] text-primary mb-1 font-semibold">LYRA</p>
                  <p className="font-sans text-[13px] text-text-secondary leading-relaxed">
                    {chat.message as string}
                  </p>
                </div>
              ) : (
                <div className="rounded-xl p-3 max-w-[85%] ml-auto" style={{ background: 'var(--plum-muted)' }}>
                  <p className="font-sans text-[13px] text-text-secondary leading-relaxed text-right">
                    {chat.message as string}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {['Show my HF history', 'Explain liquidation', 'What should I do?'].map(pill => (
                  <button key={pill} className="font-mono text-[11px] text-primary bg-primary-muted px-3 py-1.5 rounded-full border border-surface-border hover:border-primary hover:shadow-[0_0_12px_var(--primary-glow)] transition-all">
                    {pill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        }
        code={`{/* Lyra message */}
<div className="rounded-xl p-3 border-l-2 border-primary bg-primary-muted">
  <p className="font-mono text-[10px] text-primary font-semibold">LYRA</p>
  <p className="font-sans text-[13px] text-text-secondary">Message...</p>
</div>

{/* User message */}
<div className="rounded-xl p-3 bg-plum-muted ml-auto">
  <p className="text-right">Message...</p>
</div>

{/* Suggestion pill */}
<button className="font-mono text-[11px] text-primary bg-primary-muted
  px-3 py-1.5 rounded-full border border-surface-border
  hover:border-primary hover:shadow-[0_0_12px_var(--primary-glow)]">
  Suggestion text
</button>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── NudgeChatButton ────────── */}
      <ComponentDoc
        id="comp-nudge-chat-button"
        name="NudgeChatButton"
        description="Floating action button to open the Lyra chat panel. Features LyraAvatar with float animation and glow."
        forDesigner="Fixed bottom-right. LyraAvatar with 2px primary border + glow shadow. Floats with lyra-float animation. Label below in font-mono 9px uppercase."
        forDev="Fixed bottom-24 right-4 (sm:bottom-8 sm:right-8) z-40. Uses animate-lyra-float. Glow: shadow-[0_0_24px_var(--primary-glow)]. Toggles NudgeChatPanel."
        preview={
          <div className="w-full flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="animate-lyra-float rounded-full border-2 w-12 h-12 flex items-center justify-center"
                style={{ borderColor: 'rgba(163,102,255,0.6)', boxShadow: '0 0 24px var(--primary-glow)', background: 'var(--primary-muted)' }}>
                <span className="text-[20px]">&#x2728;</span>
              </div>
              <span className="font-mono text-[9px] text-primary uppercase tracking-wider font-semibold">Lyra</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyInline value="animate-lyra-float" />
              <CopyInline value="animate-lyra-glow" />
            </div>
          </div>
        }
        code={`<button className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8
  z-40 flex flex-col items-center gap-1 group">
  <div className="animate-lyra-float rounded-full border-2
    border-primary/60 shadow-[0_0_24px_var(--primary-glow)]">
    <LyraAvatar size={48} />
  </div>
  <span className="font-mono text-[9px] text-primary uppercase
    tracking-wider font-semibold">Lyra</span>
</button>

/* animate-lyra-float: translateY 0→-4px→0, 3s
   animate-lyra-glow: drop-shadow 6px→10px→6px, 2s */`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── NudgeChatPanel ─────────── */}
      <ComponentDoc
        id="comp-nudge-chat-panel"
        name="NudgeChatPanel"
        description="Sliding chat panel with message history, input field, and suggestion pills. Full conversation UI for Lyra."
        forDesigner="Panel: fixed right-side slide-in (or bottom-sheet on mobile). Max-width 420px. Glassmorphism header with Lyra name. Message area scrollable. Input bar at bottom."
        forDev="Fixed z-40, positioned bottom-right. Animates in with transform. Header, scrollable body, sticky footer input. Messages use ChatMessage bubble pattern."
        preview={
          <div className="w-full max-w-[320px] rounded-xl border border-surface-border overflow-hidden" style={{ height: 200, background: 'rgba(13,11,21,0.98)' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-surface-border" style={{ background: 'rgba(7,5,14,0.92)' }}>
              <div className="w-6 h-6 rounded-full bg-primary-muted flex items-center justify-center">
                <span className="text-[10px]">&#x2728;</span>
              </div>
              <span className="font-display text-[13px] font-semibold text-foreground">Lyra</span>
              <span className="font-mono text-[9px] text-text-muted ml-auto">online</span>
            </div>
            <div className="p-3 space-y-2 overflow-y-auto" style={{ height: 120 }}>
              <div className="rounded-lg p-2 border-l-2 border-primary text-[11px] text-text-secondary" style={{ background: 'var(--primary-muted)' }}>
                Welcome! How can I help?
              </div>
              <div className="rounded-lg p-2 text-[11px] text-text-secondary ml-auto max-w-[80%] text-right" style={{ background: 'var(--plum-muted)' }}>
                What&apos;s my HF?
              </div>
            </div>
            <div className="px-3 py-2 border-t border-surface-border">
              <div className="flex gap-2">
                <div className="flex-1 rounded-full border border-surface-border px-3 py-1 text-[11px] text-text-muted">Type a message...</div>
                <button className="text-primary text-[12px]">&#x2191;</button>
              </div>
            </div>
          </div>
        }
        code={`<div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4
  z-40 w-full sm:max-w-[420px] rounded-t-2xl sm:rounded-2xl
  border border-surface-border overflow-hidden"
  style={{ background: 'rgba(13,11,21,0.98)' }}>

  {/* Header */}
  <div className="flex items-center gap-2 px-4 py-3
    border-b border-surface-border">
    <LyraAvatar size={28} />
    <span className="font-display font-semibold">Lyra</span>
  </div>

  {/* Messages */}
  <div className="overflow-y-auto p-4 space-y-3">
    <ChatMessage role="lyra" text="..." />
    <ChatMessage role="user" text="..." />
  </div>

  {/* Input */}
  <div className="px-4 py-3 border-t border-surface-border">
    <input className="rounded-full border px-4 py-2" />
  </div>
</div>`}
        copyCode={copyCode}
        copied={copied}
      />

      {/* ── LyraAvatar ─────────────── */}
      <ComponentDoc
        id="comp-lyra-avatar"
        name="LyraAvatar"
        description="Circular avatar for the Lyra AI guide with glow border and hover enhancement."
        forDesigner="Circular image (rounded-full). Border: 1px primary/40. Shadow glow: 12px primary-glow. Hover increases glow to 24px + plum secondary glow. Smooth 300ms transition."
        forDev="Wrapper: relative, overflow-hidden, rounded-full. Border: border-primary/40. Shadow: shadow-[0_0_12px_var(--primary-glow)]. Hover adds larger combined glow. Size via prop."
        preview={
          <div className="flex items-center gap-6">
            {[32, 48, 64].map(size => (
              <div key={size} className="rounded-full overflow-hidden border transition-all duration-300"
                style={{
                  width: size, height: size,
                  borderColor: 'rgba(163,102,255,0.4)',
                  boxShadow: '0 0 12px var(--primary-glow)',
                  background: 'var(--primary-muted)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span style={{ fontSize: size * 0.4 }}>&#x2728;</span>
                </div>
              </div>
            ))}
          </div>
        }
        code={`<div className="relative overflow-hidden rounded-full
  border border-primary/40
  shadow-[0_0_12px_var(--primary-glow)]
  hover:shadow-[0_0_24px_var(--primary-glow),0_0_48px_rgba(107,79,160,0.3)]
  hover:border-primary/60 transition-all duration-300"
  style={{ width: size, height: size }}>
  <Image src="/lyra-avatar.webp" alt="Lyra" fill />
</div>`}
        copyCode={copyCode}
        copied={copied}
      />
    </>
  );
}
