'use client';

import { useTranslation } from 'react-i18next';

export default function AddIntegrationCard() {
  const { t } = useTranslation('dashboard');

  return (
    <div className="card rounded-2xl text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary-muted/30">
        <span className="text-[22px] text-primary">+</span>
      </div>
      <h3 className="flex items-baseline gap-3 justify-center">
        <span className="font-display text-[22px] tracking-[0.02em] font-bold">
          {t('integration.titlePrefix')}
        </span>
        <span className="font-display text-[22px] tracking-[0.02em] font-normal italic text-text-muted">
          {t('integration.titleAccent')}
        </span>
      </h3>
      <p className="mt-1 font-mono text-[14px] text-text-muted">
        {t('integration.subtitle')}
      </p>
    </div>
  );
}
