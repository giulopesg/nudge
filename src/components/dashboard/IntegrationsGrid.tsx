'use client';

import { useTranslation } from 'react-i18next';

interface Protocol {
  id: string;
  active: boolean;
}

const PROTOCOLS: Protocol[] = [
  { id: 'kamino', active: true },
  { id: 'jupiter', active: true },
  { id: 'marinade', active: false },
  { id: 'raydium', active: false },
  { id: 'jito', active: false },
];

export default function IntegrationsGrid() {
  const { t } = useTranslation('dashboard');

  return (
    <div className="card rounded-2xl">
      <h3 className="flex items-baseline gap-3">
        <span className="font-display text-[22px] tracking-[0.02em] font-bold">
          {t('integrations.titlePrefix')}
        </span>
        <span className="font-display text-[22px] tracking-[0.02em] font-normal italic text-text-muted">
          {t('integrations.titleAccent')}
        </span>
      </h3>

      <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2.5">
        {PROTOCOLS.map((p) => (
          <div
            key={p.id}
            className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-center transition-colors ${
              p.active
                ? 'border-safe/20 bg-safe/5'
                : 'border-surface-border bg-surface/30 opacity-60'
            }`}
          >
            <span className="font-display text-[14px] font-bold">
              {t(`integrations.protocols.${p.id}.name`)}
            </span>
            <span className="font-mono text-[11px] text-text-muted">
              {t(`integrations.protocols.${p.id}.category`)}
            </span>
            <span
              className={`mt-0.5 rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider ${
                p.active
                  ? 'bg-safe/15 text-safe'
                  : 'bg-surface-border/50 text-text-muted'
              }`}
            >
              {p.active ? t('integrations.active') : t('integrations.comingSoon')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
