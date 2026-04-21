'use client';

import { useTranslation } from 'react-i18next';

export default function AddIntegrationCard() {
  const { t } = useTranslation('dashboard');

  return (
    <div className="rounded-2xl border border-dashed border-surface-border/60 px-6 py-5 text-center">
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-text-muted/40">
        <span className="text-[18px] text-text-muted">+</span>
      </div>
      <p className="font-display text-[13px] font-bold text-text-secondary">
        {t('integration.title')}
      </p>
      <p className="mt-1 font-mono text-[11px] text-text-muted">
        {t('integration.subtitle')}
      </p>
    </div>
  );
}
