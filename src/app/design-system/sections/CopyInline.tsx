'use client';

import { useState } from 'react';

interface CopyInlineProps {
  value: string;
  label?: string;
}

export default function CopyInline({ value, label }: CopyInlineProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 font-mono text-[12px] px-1.5 py-0.5 rounded border transition-all cursor-pointer"
      style={{
        color: copied ? 'var(--safe)' : 'var(--primary)',
        background: copied ? 'var(--safe-bg)' : 'var(--primary-muted)',
        borderColor: copied ? 'rgba(46,216,138,0.3)' : 'var(--surface-border)',
      }}
      title={`Copy: ${value}`}
    >
      {copied ? 'Copied!' : (label || value)}
    </button>
  );
}
