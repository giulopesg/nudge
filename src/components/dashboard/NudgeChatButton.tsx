'use client';

import { useTranslation } from 'react-i18next';
import LyraAvatar from '@/components/dashboard/LyraAvatar';

interface Props {
  isActive: boolean;
  onClick: () => void;
}

export default function NudgeChatButton({ isActive, onClick }: Props) {
  const { t } = useTranslation('dashboard');

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-40 flex flex-col items-center gap-1 group ${isActive ? 'scale-95' : ''} transition-transform`}
      aria-label={t('lyra.name')}
    >
      <div
        className={`relative animate-lyra-float rounded-full border-2 border-primary/60 shadow-[0_0_24px_var(--primary-glow)] transition-colors`}
      >
        <LyraAvatar size={56} />
      </div>
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted group-hover:text-foreground transition-colors">
        {t('lyra.name')}
      </span>
    </button>
  );
}
