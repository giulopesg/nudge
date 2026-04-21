'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  xp: number;
  onDismiss: () => void;
}

export default function XpToast({ xp, onDismiss }: Props) {
  const { t } = useTranslation('dashboard');

  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed bottom-24 left-1/2 z-50 animate-xp-toast pointer-events-none">
      <div className="rounded-full bg-xp-muted border border-xp/30 px-5 py-2 shadow-lg">
        <span className="font-display text-[18px] font-bold text-xp text-glow-primary">
          {t('xpToast.gained', { xp })}
        </span>
      </div>
    </div>
  );
}
