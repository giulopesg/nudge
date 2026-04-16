'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import type { CommProfile } from '@/lib/communication';

interface Props {
  commProfile: CommProfile;
  onLearnKamino: () => void;
}

const INTRO_KEYS: Record<CommProfile, string> = {
  gentle: 'gentle',
  encouraging: 'encouraging',
  direct: 'direct',
  technical: 'technical',
};

export default function BeginnerKaminoCard({ commProfile, onLearnKamino }: Props) {
  const { t } = useTranslation('dashboard');

  return (
    <div className="card rounded-2xl border-plum/20 relative overflow-hidden">
      {/* Watermark */}
      <Image
        src="/kamino-watermark.png"
        alt=""
        width={120}
        height={140}
        className="pointer-events-none absolute -bottom-4 -right-2 opacity-[0.08]"
        aria-hidden="true"
      />

      <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-plum-light">
        {t('beginnerKamino.title')}
      </h3>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
        {t(`beginnerKamino.body.${INTRO_KEYS[commProfile]}`)}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={onLearnKamino}
          className="rounded-lg border border-plum/30 bg-plum-muted px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-plum-light hover:bg-plum-muted/80 transition-colors"
        >
          {t(`beginnerKamino.cta.${INTRO_KEYS[commProfile]}`)}
        </button>
        <a
          href="https://app.kamino.finance/lending/borrow"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-primary hover:bg-primary/20 transition-colors"
        >
          {t('beginnerKamino.ctaBorrow')}
        </a>
      </div>
    </div>
  );
}
