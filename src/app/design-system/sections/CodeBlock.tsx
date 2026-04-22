'use client';

interface CodeBlockProps {
  code: string;
  id: string;
  copyCode: (code: string, id: string) => void;
  copied: string | null;
  lang?: string;
}

export default function CodeBlock({ code, id, copyCode, copied, lang = 'html' }: CodeBlockProps) {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-surface-border" style={{ background: 'rgba(7, 5, 14, 0.6)' }}>
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-surface-border">
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{lang}</span>
        <button
          onClick={() => copyCode(code, id)}
          className="font-mono text-[10px] text-text-muted hover:text-primary transition-colors px-2 py-0.5 rounded border border-transparent hover:border-surface-border"
        >
          {copied === id ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-[12px] sm:text-[13px] leading-relaxed">
        <code className="font-mono text-text-secondary">{code}</code>
      </pre>
    </div>
  );
}
