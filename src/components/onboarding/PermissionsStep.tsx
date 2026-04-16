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
      <h1 className="font-display text-xl font-bold uppercase tracking-wider">
        {t('permissions.title')}
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        {t('permissions.subtitle')}
      </p>

      <div className="mt-8 w-full max-w-md space-y-4">
        {/* Can do */}
        <div className="card chamfer-md border-safe/20 bg-safe-bg/50">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-safe">
            {t('permissions.canDo.title')}
          </h3>
          <ul className="mt-3 space-y-2">
            {canDo.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 text-safe text-xs">&#9656;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Can't do */}
        <div className="card chamfer-md border-danger/20 bg-danger-bg/50">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-danger">
            {t('permissions.cantDo.title')}
          </h3>
          <ul className="mt-3 space-y-2">
            {cantDo.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 text-danger text-xs">&#9747;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center font-mono text-[10px] text-text-muted tracking-wider">
          {t('permissions.readOnly')}
        </p>
      </div>

      <button
        onClick={onContinue}
        className="mt-8 chamfer-md border border-primary bg-transparent px-8 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-primary transition-all glow-primary hover:bg-primary hover:text-background"
      >
        {t('permissions.continue')}
      </button>
    </div>
  );
}
