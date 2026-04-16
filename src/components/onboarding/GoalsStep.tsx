'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { GoalId } from '@/lib/neurotags';

const ALL_GOALS: GoalId[] = ['reserva', 'independencia', 'aprender', 'rendimento', 'remessas'];

const MAX_GOALS = 3;

const GOAL_ICONS: Record<GoalId, string> = {
  reserva: '\uD83D\uDEE1\uFE0F',
  independencia: '\uD83D\uDD11',
  aprender: '\uD83D\uDCDA',
  rendimento: '\uD83D\uDCC8',
  remessas: '\uD83C\uDF0D',
};

interface Props {
  onComplete: (goals: GoalId[]) => void;
  onBack: () => void;
}

export default function GoalsStep({ onComplete, onBack }: Props) {
  const { t } = useTranslation('goals');
  const [selected, setSelected] = useState<GoalId[]>([]);

  const toggle = (id: GoalId) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((g) => g !== id);
      if (prev.length >= MAX_GOALS) return prev;
      return [...prev, id];
    });
  };

  const canContinue = selected.length >= 1;

  return (
    <div className="flex flex-col items-center px-4 w-full max-w-md">
      <h1 className="font-display text-xl font-bold uppercase tracking-wider text-center">
        {t('stepTitle')}
      </h1>
      <p className="mt-2 text-sm text-text-secondary text-center">
        {t('stepSubtitle')}
      </p>

      <div className="mt-6 w-full space-y-2">
        {ALL_GOALS.map((goalId) => {
          const isSelected = selected.includes(goalId);
          const isDisabled = !isSelected && selected.length >= MAX_GOALS;

          return (
            <button
              key={goalId}
              onClick={() => toggle(goalId)}
              disabled={isDisabled}
              className={`w-full chamfer-sm px-4 py-3 text-left transition-all flex items-center gap-3 ${
                isSelected
                  ? 'border border-primary bg-primary-muted/50 text-foreground'
                  : isDisabled
                    ? 'border border-surface-border bg-surface/30 text-text-muted opacity-50'
                    : 'border border-surface-border bg-surface text-text-secondary hover:border-primary/40 hover:bg-surface-hover'
              }`}
            >
              <span className="text-lg flex-shrink-0">{GOAL_ICONS[goalId]}</span>
              <span className="text-sm leading-snug">
                {t(`options.${goalId}.label`)}
              </span>
              {isSelected && (
                <span className="ml-auto text-primary text-xs font-mono">&#10003;</span>
              )}
            </button>
          );
        })}
      </div>

      {!canContinue && (
        <p className="mt-3 text-xs text-text-muted">{t('validation.min')}</p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="chamfer-sm border border-surface-border bg-transparent px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-text-secondary hover:bg-surface-hover transition-colors"
        >
          {t('common:back', { defaultValue: 'Voltar' })}
        </button>
        <button
          onClick={() => canContinue && onComplete(selected)}
          disabled={!canContinue}
          className={`chamfer-sm border px-8 py-2.5 font-mono text-xs uppercase tracking-wider transition-all ${
            canContinue
              ? 'border-primary bg-transparent text-primary glow-primary hover:bg-primary hover:text-background'
              : 'border-surface-border bg-surface/30 text-text-muted cursor-not-allowed'
          }`}
        >
          {t('continue')}
        </button>
      </div>
    </div>
  );
}
