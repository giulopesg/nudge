'use client';

import { useTranslation } from 'react-i18next';
import type { HealthZone } from '@/lib/portfolio';
import type { CommProfile } from '@/lib/communication';
import type { EducationTopicId } from '@/components/dashboard/EducationModal';

interface Props {
  zone: HealthZone;
  hasKaminoPosition: boolean;
  commProfile: CommProfile;
  onOpenEducation: (topicId: EducationTopicId) => void;
}

type ActionType = 'modal' | 'link' | 'guided' | 'disabled';

interface ActionCard {
  id: string;
  type: ActionType;
  href?: string;
  topicId?: EducationTopicId;
  urgency: 'normal' | 'attention' | 'danger' | 'disabled';
  showWhen: (zone: HealthZone, hasKamino: boolean) => boolean;
}

const KAMINO_BASE = 'https://app.kamino.finance/lending';

const ACTION_DEFS: ActionCard[] = [
  {
    id: 'diversify',
    type: 'guided',
    href: 'https://jup.ag/swap',
    topicId: 'whatIsDiversification',
    urgency: 'normal',
    showWhen: () => true,
  },
  {
    id: 'learnStables',
    type: 'guided',
    href: 'https://solana.com/ecosystem/stablecoins',
    topicId: 'whatAreStablecoins',
    urgency: 'normal',
    showWhen: () => true,
  },
  {
    id: 'exploreKamino',
    type: 'guided',
    href: KAMINO_BASE,
    topicId: 'whatIsKamino',
    urgency: 'normal',
    showWhen: (_z, hasKamino) => !hasKamino,
  },
  {
    id: 'learnHF',
    type: 'modal',
    topicId: 'whatIsHF',
    urgency: 'normal',
    showWhen: () => true,
  },
  {
    id: 'viewKamino',
    type: 'link',
    href: KAMINO_BASE,
    urgency: 'normal',
    showWhen: (_z, hasKamino) => hasKamino,
  },
  {
    id: 'addCollateral',
    type: 'link',
    href: `${KAMINO_BASE}/deposit`,
    urgency: 'attention',
    showWhen: (z, hasKamino) => hasKamino && (z === 'attention' || z === 'danger'),
  },
  {
    id: 'reduceDebt',
    type: 'link',
    href: `${KAMINO_BASE}/repay`,
    urgency: 'danger',
    showWhen: (z, hasKamino) => hasKamino && (z === 'attention' || z === 'danger'),
  },
  {
    id: 'simulate',
    type: 'disabled',
    urgency: 'disabled',
    showWhen: () => true,
  },
];

const URGENCY_STYLES: Record<string, string> = {
  normal: 'action-card-enhanced',
  attention: 'action-card-enhanced action-card-enhanced-attention',
  danger: 'action-card-enhanced action-card-enhanced-urgent',
  disabled: 'action-card-enhanced opacity-40 cursor-default pointer-events-none',
};

const CARD_ICONS: Record<string, string> = {
  diversify: '\uD83D\uDD00',
  learnStables: '\uD83D\uDCB5',
  exploreKamino: '\uD83C\uDF10',
  learnHF: '\uD83D\uDCD6',
  viewKamino: '\uD83D\uDD17',
  simulate: '\uD83D\uDD2E',
  addCollateral: '\uD83D\uDEE1\uFE0F',
  reduceDebt: '\u26A1',
};

const EDUCATION_FIRST_PROFILES: CommProfile[] = ['gentle', 'encouraging'];

export default function ActionCards({ zone, hasKaminoPosition, commProfile, onOpenEducation }: Props) {
  const { t } = useTranslation('dashboard');

  const visibleCards = ACTION_DEFS.filter((card) =>
    card.showWhen(zone, hasKaminoPosition),
  );

  if (visibleCards.length === 0) return null;

  const isEducationFirst = EDUCATION_FIRST_PROFILES.includes(commProfile);

  const handleClick = (card: ActionCard) => {
    if (card.type === 'disabled') return;

    if (card.type === 'modal' && card.topicId) {
      onOpenEducation(card.topicId);
      return;
    }

    if (card.type === 'guided') {
      if (isEducationFirst && card.topicId) {
        onOpenEducation(card.topicId);
        return;
      }
      if (card.href) {
        window.open(card.href, '_blank', 'noopener');
        return;
      }
    }

    if (card.type === 'link' && card.href) {
      window.open(card.href, '_blank', 'noopener');
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-text-muted">
        {t(`actions.title.${commProfile}`)}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
        {visibleCards.map((card) => {
          const isUrgent = zone === 'danger' && (card.id === 'addCollateral' || card.id === 'reduceDebt');
          const effectiveUrgency = isUrgent ? 'danger' : card.urgency;

          return (
            <button
              key={card.id}
              onClick={() => handleClick(card)}
              disabled={card.type === 'disabled'}
              className={`${URGENCY_STYLES[effectiveUrgency]} rounded-xl relative ${
                isUrgent ? 'animate-pulse-glow' : ''
              }`}
            >
              {/* Urgency accent line */}
              {effectiveUrgency !== 'normal' && effectiveUrgency !== 'disabled' && (
                <div
                  className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full ${
                    effectiveUrgency === 'danger' ? 'bg-danger/40' : 'bg-attention/40'
                  }`}
                />
              )}

              <div className="flex flex-col items-center text-center gap-2 py-1">
                <span className="text-[32px] leading-none">{CARD_ICONS[card.id]}</span>
                <span className="block text-[15px] font-extrabold leading-tight">
                  {t(`actions.cards.${card.id}.label.${commProfile}`)}
                </span>
                <span className="block text-[13px] leading-[1.5] text-text-muted">
                  {t(`actions.cards.${card.id}.desc.${commProfile}`)}
                </span>
                {card.type === 'disabled' && (
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted opacity-60">
                    {t('actions.comingSoon')}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
