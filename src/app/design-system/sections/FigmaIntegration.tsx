'use client';

import { useState } from 'react';
import CodeBlock from './CodeBlock';
import CopyInline from './CopyInline';
import {
  BRAND_COLORS, SECONDARY_COLORS, STATUS_COLORS, SURFACE_COLORS, TEXT_COLORS,
} from './foundationsData';

interface FigmaIntegrationProps {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

const ALL_COLORS = [
  { group: 'brand', colors: BRAND_COLORS },
  { group: 'secondary', colors: SECONDARY_COLORS },
  { group: 'status', colors: STATUS_COLORS },
  { group: 'surface', colors: SURFACE_COLORS },
  { group: 'text', colors: TEXT_COLORS },
];

const STEPS = [
  {
    num: '01',
    title: 'Download tokens',
    desc: 'Get the W3C DTCG JSON file with all N2DS design tokens.',
    action: 'download' as const,
  },
  {
    num: '02',
    title: 'Import in Figma',
    desc: 'Open Tokens Studio plugin → Load → File → select design-tokens.json. Or use Variables Import plugin.',
    action: 'none' as const,
  },
  {
    num: '03',
    title: 'Sync via API',
    desc: 'Point Tokens Studio to the API endpoint for live sync. Tokens auto-update when the design system changes.',
    action: 'api' as const,
  },
];

const SAMPLE_JSON = `{
  "n2ds": {
    "color": {
      "brand": {
        "primary": {
          "$type": "color",
          "$value": "#A366FF",
          "$description": "Brand, buttons, primary actions"
        }
      }
    },
    "font": {
      "lora": {
        "$type": "fontFamily",
        "$value": "Lora",
        "$description": "Display / Titles"
      }
    }
  }
}`;

export default function FigmaIntegration({ copyCode, copied }: FigmaIntegrationProps) {
  const [jsonOpen, setJsonOpen] = useState(false);

  return (
    <section id="figma" className="scroll-mt-20 mb-24">
      <div className="mb-8">
        <p className="font-mono text-[11px] text-primary uppercase tracking-[0.12em] mb-2 font-semibold">05</p>
        <h2 className="font-display text-[28px] sm:text-[34px] font-bold text-foreground tracking-wide">
          Figma Integration
        </h2>
        <p className="font-sans text-[14px] text-text-secondary mt-2 max-w-[560px] leading-relaxed">
          Export all N2DS tokens in W3C DTCG format for Figma plugins like Tokens Studio and Variables Import.
          Keep code and design in sync.
        </p>
      </div>

      {/* ── Download & API ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {/* Download card */}
        <div className="rounded-xl border border-surface-border p-5" style={{ background: 'var(--surface)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-surface-border"
              style={{ background: 'var(--primary-muted)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" />
              </svg>
            </div>
            <div>
              <p className="font-sans text-[14px] text-foreground font-semibold">Static File</p>
              <p className="font-mono text-[11px] text-text-muted">/design-tokens.json</p>
            </div>
          </div>
          <a
            href="/design-tokens.json"
            download="design-tokens.json"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-[13px] font-medium transition-all"
            style={{
              background: 'var(--primary)',
              color: '#07050E',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" />
            </svg>
            Download JSON
          </a>
        </div>

        {/* API card */}
        <div className="rounded-xl border border-surface-border p-5" style={{ background: 'var(--surface)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-surface-border"
              style={{ background: 'var(--primary-muted)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                <path d="M2 4h12M2 8h12M2 12h8" />
              </svg>
            </div>
            <div>
              <p className="font-sans text-[14px] text-foreground font-semibold">API Endpoint</p>
              <p className="font-mono text-[11px] text-text-muted">Always fresh from source</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CopyInline value="/api/tokens" label="GET /api/tokens" />
            <span className="font-mono text-[10px] text-text-muted">→ W3C DTCG JSON</span>
          </div>
        </div>
      </div>

      {/* ── JSON Preview ─────────────── */}
      <div className="mb-10">
        <button
          onClick={() => setJsonOpen(!jsonOpen)}
          className="flex items-center gap-2 font-mono text-[12px] text-text-secondary hover:text-primary transition-colors mb-3"
        >
          <span className="text-[10px]">{jsonOpen ? '\u25BC' : '\u25B6'}</span>
          {jsonOpen ? 'Hide' : 'Show'} JSON preview
        </button>
        {jsonOpen && (
          <CodeBlock code={SAMPLE_JSON} id="figma-json-preview" copyCode={copyCode} copied={copied} lang="json" />
        )}
      </div>

      {/* ── Integration Guide ────────── */}
      <div className="mb-10">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-6 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" /> Integration Guide
        </h3>
        <div className="space-y-4">
          {STEPS.map((step) => (
            <div key={step.num} className="rounded-xl border border-surface-border p-5 flex items-start gap-4"
              style={{ background: 'var(--surface)' }}>
              <span className="font-mono text-[20px] text-primary font-bold opacity-40 flex-shrink-0 w-8">{step.num}</span>
              <div className="flex-1">
                <p className="font-sans text-[15px] text-foreground font-semibold mb-1">{step.title}</p>
                <p className="font-sans text-[13px] text-text-secondary leading-relaxed">{step.desc}</p>
                {step.action === 'download' && (
                  <a
                    href="/design-tokens.json"
                    download="design-tokens.json"
                    className="inline-flex items-center gap-1.5 mt-3 font-mono text-[11px] text-primary hover:text-primary-hover transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" />
                    </svg>
                    design-tokens.json
                  </a>
                )}
                {step.action === 'api' && (
                  <div className="mt-3">
                    <CopyInline value="https://nudge.giulopesgalvao.com.br/api/tokens" label="Copy API URL" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tokens Studio config ─────── */}
      <div className="mb-10">
        <h3 className="font-display text-[20px] font-bold text-foreground mb-6 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" /> Tokens Studio Setup
        </h3>
        <CodeBlock
          code={`// Tokens Studio → Settings → Token Storage
// Select "URL" and paste:
{
  "url": "https://nudge.giulopesgalvao.com.br/api/tokens",
  "headers": {}
}`}
          id="figma-tokens-studio"
          copyCode={copyCode}
          copied={copied}
          lang="json"
        />
      </div>

      {/* ── Variable Mapping Table ───── */}
      <div>
        <h3 className="font-display text-[20px] font-bold text-foreground mb-6 tracking-wide flex items-center gap-3">
          <span className="w-8 h-[1px] bg-primary inline-block" /> Variable Mapping
        </h3>
        <p className="font-sans text-[13px] text-text-secondary mb-4 leading-relaxed">
          How CSS custom properties map to Figma variable names in the DTCG file.
        </p>
        <div className="rounded-xl border border-surface-border overflow-hidden" style={{ background: 'var(--surface)' }}>
          {/* Header */}
          <div className="grid grid-cols-3 gap-2 px-4 py-2.5 border-b border-surface-border"
            style={{ background: 'rgba(163,102,255,0.06)' }}>
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider font-semibold">CSS Variable</span>
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider font-semibold">Figma Path</span>
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider font-semibold">Value</span>
          </div>
          {/* Rows */}
          {ALL_COLORS.map(({ group, colors }) =>
            colors.map((c) => {
              const key = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').replace(/^-+/, '');
              return (
                <div key={c.var} className="grid grid-cols-3 gap-2 px-4 py-2 border-b border-surface-border last:border-b-0 hover:bg-surface-hover transition-colors">
                  <code className="font-mono text-[11px] text-primary truncate">{c.var}</code>
                  <code className="font-mono text-[11px] text-text-secondary truncate">n2ds.color.{group}.{key}</code>
                  <code className="font-mono text-[11px] text-text-muted truncate">{c.hex}</code>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
