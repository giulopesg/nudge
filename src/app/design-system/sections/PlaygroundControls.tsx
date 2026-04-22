'use client';

export interface Control {
  key: string;
  label: string;
  type: 'select' | 'toggle' | 'range' | 'text';
  options?: string[];
  min?: number;
  max?: number;
  defaultValue: string | boolean | number;
}

interface PlaygroundControlsProps {
  controls: Control[];
  values: Record<string, string | boolean | number>;
  onChange: (next: Record<string, string | boolean | number>) => void;
}

export default function PlaygroundControls({ controls, values, onChange }: PlaygroundControlsProps) {
  const set = (key: string, val: string | boolean | number) =>
    onChange({ ...values, [key]: val });

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-4 pb-4 border-b border-surface-border">
      {controls.map(c => (
        <label key={c.key} className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider whitespace-nowrap">
            {c.label}
          </span>

          {c.type === 'select' && (
            <select
              value={values[c.key] as string}
              onChange={e => set(c.key, e.target.value)}
              className="font-mono text-[11px] rounded-md px-2 py-1 border border-surface-border outline-none"
              style={{ background: 'var(--surface)', color: 'var(--foreground)' }}
            >
              {c.options?.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )}

          {c.type === 'toggle' && (
            <button
              type="button"
              role="switch"
              aria-checked={!!values[c.key]}
              onClick={() => set(c.key, !values[c.key])}
              className="relative w-9 h-5 rounded-full border border-surface-border transition-colors"
              style={{ background: values[c.key] ? 'var(--primary)' : 'var(--surface)' }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform"
                style={{
                  background: 'var(--foreground)',
                  transform: values[c.key] ? 'translateX(16px)' : 'translateX(0)',
                }}
              />
            </button>
          )}

          {c.type === 'range' && (
            <span className="flex items-center gap-2">
              <input
                type="range"
                min={c.min ?? 0}
                max={c.max ?? 100}
                value={values[c.key] as number}
                onChange={e => set(c.key, Number(e.target.value))}
                className="w-24"
                style={{ accentColor: 'var(--primary)' }}
              />
              <span className="font-mono text-[11px] text-primary w-7 text-right">
                {values[c.key]}
              </span>
            </span>
          )}

          {c.type === 'text' && (
            <input
              type="text"
              value={values[c.key] as string}
              onChange={e => set(c.key, e.target.value)}
              className="font-mono text-[11px] rounded-md px-2 py-1 border border-surface-border outline-none w-32"
              style={{ background: 'var(--surface)', color: 'var(--foreground)' }}
            />
          )}
        </label>
      ))}
    </div>
  );
}
