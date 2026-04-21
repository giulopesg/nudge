'use client';

import { useTranslation } from 'react-i18next';
import type { CommProfile } from '@/lib/communication';
import { useDashboard } from '@/contexts/DashboardContext';
import { genderSuffix } from '@/lib/neurotags';

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
  const { gender } = useDashboard();
  const suffix = genderSuffix(gender);

  return (
    <div className="card rounded-2xl">
      <h3 className="flex items-baseline gap-3">
        <span className="font-display text-[22px] tracking-[0.02em] font-bold">{t('beginnerKamino.titlePrefix')}</span>
        <span className="font-display text-[22px] tracking-[0.02em] font-normal italic text-text-muted">{t('beginnerKamino.titleAccent')}</span>
      </h3>
      <p className="mt-2 text-[15px] text-text-secondary leading-[1.7]">
        {t(`beginnerKamino.body.${INTRO_KEYS[commProfile]}`, { suffix })}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={onLearnKamino}
          className="n2-btn-secondary"
        >
          {t(`beginnerKamino.cta.${INTRO_KEYS[commProfile]}`)}
        </button>
        <a
          href="https://app.kamino.finance/lending/borrow"
          target="_blank"
          rel="noopener noreferrer"
          className="n2-btn-primary"
        >
          {t('beginnerKamino.ctaBorrow')}
        </a>
      </div>
    </div>
  );
}
