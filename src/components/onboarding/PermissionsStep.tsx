'use client';

import { useTranslation } from 'react-i18next';

interface Props {
  onContinue: () => void;
}

export default function PermissionsStep({ onContinue }: Props) {
  const { t } = useTranslation('onboarding');

  const canDo = t('permissions.canDo.items', { returnObjects: true }) as string[];
  const cantDo = t('permissions.cantDo.items', { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col items-center px-4">
      <h1 className="font-display text-2xl font-bold uppercase tracking-wider">
        {t('permissions.title')}
      </h1>
      <p className="mt-2 text-[15px] leading-[1.7] text-text-secondary">
        {t('permissions.subtitle')}
      </p>

      <div className="mt-8 w-full max-w-md space-y-4">
        {/* Can do */}
        <div className="card rounded-xl border-safe/20 bg-safe-bg/50">
          <h3 className="font-mono text-[13px] font-semibold uppercase tracking-wider text-safe">
            {t('permissions.canDo.title')}
          </h3>
          <ul className="mt-3 space-y-2">
            {canDo.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[15px] text-foreground">
                <span className="mt-0.5 text-safe text-[13px]">&#9656;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Can't do */}
        <div className="card rounded-xl border-danger/20 bg-danger-bg/50">
          <h3 className="font-mono text-[13px] font-semibold uppercase tracking-wider text-danger">
            {t('permissions.cantDo.title')}
          </h3>
          <ul className="mt-3 space-y-2">
            {cantDo.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[15px] text-foreground">
                <span className="mt-0.5 text-danger text-[13px]">&#9747;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center font-mono text-[12px] text-text-muted tracking-wider">
          {t('permissions.readOnly')}
        </p>
      </div>

      <button
        onClick={onContinue}
        className="n2-btn-primary mt-8"
      >
        {t('permissions.continue')}
      </button>
    </div>
  );
}
