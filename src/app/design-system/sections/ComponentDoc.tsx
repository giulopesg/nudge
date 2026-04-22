'use client';

import { ReactNode } from 'react';
import CodeBlock from './CodeBlock';

interface ComponentDocProps {
  id: string;
  name: string;
  description: string;
  forDesigner: string;
  forDev: string;
  preview: ReactNode;
  code: string;
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

export default function ComponentDoc({
  id, name, description, forDesigner, forDev, preview, code, copyCode, copied,
}: ComponentDocProps) {
  return (
    <div id={id} className="scroll-mt-24 mb-16">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-foreground tracking-wide">
          {name}
        </h3>
        <p className="font-sans text-[14px] text-text-secondary mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Live Preview */}
      <div
        className="rounded-xl border border-surface-border p-6 sm:p-8 mb-4"
        style={{ background: 'rgba(255, 248, 245, 0.015)' }}
      >
        <div className="flex flex-wrap items-center gap-4">
          {preview}
        </div>
      </div>

      {/* Code */}
      <CodeBlock code={code} id={`code-${id}`} copyCode={copyCode} copied={copied} />

      {/* Usage notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <div className="rounded-lg border border-surface-border p-4" style={{ background: 'rgba(163, 102, 255, 0.03)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[14px]">&#x1f3a8;</span>
            <span className="font-mono text-[11px] text-primary uppercase tracking-wider font-semibold">For Designer</span>
          </div>
          <p className="font-sans text-[13px] text-text-secondary leading-relaxed">{forDesigner}</p>
        </div>
        <div className="rounded-lg border border-surface-border p-4" style={{ background: 'rgba(255, 107, 157, 0.03)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[14px]">&#x1f4bb;</span>
            <span className="font-mono text-[11px] text-plum uppercase tracking-wider font-semibold">For Dev</span>
          </div>
          <p className="font-sans text-[13px] text-text-secondary leading-relaxed">{forDev}</p>
        </div>
      </div>
    </div>
  );
}
