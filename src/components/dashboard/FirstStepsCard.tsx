'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface Props {
  hasProfile: boolean;
  hasBalance: boolean;
  hasExploredLyra: boolean;
  hasOnChainRegistration: boolean;
  onOpenLyra?: () => void;
}

export default function FirstStepsCard({
  hasProfile,
  hasBalance,
  hasExploredLyra,
  hasOnChainRegistration,
  onOpenLyra,
}: Props) {
  const { t } = useTranslation('dashboard');

  const steps = [
    { key: 'step1', done: true },
    { key: 'step2', done: hasProfile },
    { key: 'step3', done: hasBalance },
    { key: 'step4', done: hasExploredLyra },
    { key: 'step5', done: hasOnChainRegistration },
  ];

  const completed = steps.filter((s) => s.done).length;
  const total = steps.length;
  const allDone = completed === total;

  if (allDone) {
    return (
      <div className="card rounded-2xl border-primary/20 bg-primary/5 px-5 py-4 text-center">
        <p className="font-display text-[17px] font-bold text-primary">
          {t('firstSteps.allDone')}
        </p>
      </div>
    );
  }

  return (
    <div className="card rounded-2xl border-primary/20">
      {/* Title */}
      <h2 className="flex items-baseline gap-3">
        <span className="font-display text-[22px] tracking-[0.02em] font-bold">{t('firstSteps.titlePrefix')}</span>
        <span className="font-display text-[22px] tracking-[0.02em] font-normal italic text-text-muted">
          {t('firstSteps.titleAccent')}
        </span>
      </h2>

      {/* Progress bar */}
      <div className="mt-3 flex items-center gap-3">
        <div className="h-2 flex-1 rounded-full bg-surface-elevated overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(completed / total) * 100}%` }}
          />
        </div>
        <span className="font-mono text-[13px] text-text-muted whitespace-nowrap">
          {t('firstSteps.progress', { completed, total })}
        </span>
      </div>

      {/* Steps */}
      <ul className="mt-5 space-y-4">
        {steps.map((step) => (
          <li key={step.key} className="flex items-start gap-3">
            {/* Icon */}
            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
              step.done
                ? 'bg-primary/20 text-primary'
                : 'bg-surface-elevated text-text-muted'
            }`}>
              {step.done ? '✓' : '○'}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`text-[15px] font-medium ${
                step.done ? 'text-text-secondary line-through' : 'text-text-primary'
              }`}>
                {step.done && step.key === 'step1'
                  ? t('firstSteps.step1.done')
                  : t(`firstSteps.${step.key}.label`)}
              </p>
              {!step.done && (
                <StepAction stepKey={step.key} onOpenLyra={onOpenLyra} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepAction({ stepKey, onOpenLyra }: { stepKey: string; onOpenLyra?: () => void }) {
  const { t } = useTranslation('dashboard');
  const desc = t(`firstSteps.${stepKey}.desc`, { defaultValue: '' });

  return (
    <>
      {desc && (
        <p className="mt-0.5 text-[14px] text-text-muted">{desc}</p>
      )}
      {stepKey === 'step2' && (
        <Link
          href="/onboarding"
          className="mt-1.5 inline-block font-mono text-[12px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
        >
          {t('firstSteps.step2.cta')} →
        </Link>
      )}
      {stepKey === 'step4' && onOpenLyra && (
        <button
          onClick={onOpenLyra}
          className="mt-1.5 font-mono text-[12px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
        >
          {t('firstSteps.step4.cta')} →
        </button>
      )}
      {stepKey === 'step5' && (
        <Link
          href="/onboarding?step=registration"
          className="mt-1.5 inline-block font-mono text-[12px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
        >
          {t('firstSteps.step5.cta')} →
        </Link>
      )}
    </>
  );
}
