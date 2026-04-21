'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { QuizAnswers } from '@/lib/neurotags';

interface Props {
  onComplete: (answers: QuizAnswers) => void;
  onBack: () => void;
}

type SingleAnswer = string | null;

export default function QuizStep({ onComplete, onBack }: Props) {
  const { t } = useTranslation('onboarding');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<SingleAnswer[]>([null, null, null, null, null]);
  const [q5Selected, setQ5Selected] = useState<string[]>([]);

  const questions = [
    { key: 'q1', options: ['self', 'other', 'together'] as const },
    { key: 'q2', options: ['sell', 'ask', 'unsure', 'hold'] as const },
    { key: 'q3', options: ['daily', 'weekly', 'sometimes', 'rarely'] as const },
    { key: 'q4', options: ['knows', 'heard', 'noIdea'] as const },
    { key: 'q5', options: ['safety', 'learn', 'opportunities', 'monitor'] as const, multi: true },
  ];

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const isFirst = current === 0;
  const canAdvance = q.key === 'q5' ? q5Selected.length > 0 : answers[current] !== null;

  function selectOption(value: string) {
    if (q.key === 'q5') {
      setQ5Selected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
      );
    } else {
      const next = [...answers];
      next[current] = value;
      setAnswers(next);
    }
  }

  function handleNext() {
    if (!canAdvance) return;
    if (isLast) {
      onComplete({
        q1: answers[0] as QuizAnswers['q1'],
        q2: answers[1] as QuizAnswers['q2'],
        q3: answers[2] as QuizAnswers['q3'],
        q4: answers[3] as QuizAnswers['q4'],
        q5: q5Selected,
      });
    } else {
      setCurrent(current + 1);
    }
  }

  function handlePrev() {
    if (isFirst) onBack();
    else setCurrent(current - 1);
  }

  const isSelected = (value: string) =>
    q.key === 'q5' ? q5Selected.includes(value) : answers[current] === value;

  return (
    <div className="flex flex-col items-center px-4">
      {/* Progress */}
      <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-muted">
        {t('quiz.progress', { current: current + 1, total: questions.length })}
      </p>

      {/* Progress bar */}
      <div className="mt-3 stat-bar w-full max-w-md rounded-lg">
        <div
          className="stat-bar-fill bg-primary glow-primary transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h2 className="mt-8 font-display text-[22px] font-bold text-center max-w-md">
        {t(`quiz.${q.key}.question`)}
      </h2>

      {q.key === 'q5' && (
        <p className="mt-1 font-mono text-[13px] text-text-muted">
          {t('quiz.q5.hint')}
        </p>
      )}

      {/* Options */}
      <div className="mt-6 w-full max-w-md space-y-2">
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => selectOption(opt)}
            className={`card w-full rounded-lg text-left text-[15px] ${
              isSelected(opt)
                ? 'border-primary bg-primary-muted text-foreground glow-primary'
                : 'hover:border-plum/30'
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                  q.key === 'q5' ? 'rounded-lg' : 'rounded-full'
                } ${
                  isSelected(opt)
                    ? 'border-primary bg-primary'
                    : 'border-text-muted'
                }`}
              >
                {isSelected(opt) && (
                  <span className="text-[12px] text-background font-bold">&#10003;</span>
                )}
              </span>
              {t(`quiz.${q.key}.options.${opt}`)}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex w-full max-w-md gap-3">
        <button
          onClick={handlePrev}
          className="n2-btn-ghost flex-1"
        >
          {t('quiz.previous')}
        </button>
        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className={`flex-1 ${
            canAdvance
              ? 'n2-btn-primary'
              : 'n2-btn-ghost opacity-50 cursor-not-allowed'
          }`}
        >
          {isLast ? t('quiz.finish') : t('quiz.next')}
        </button>
      </div>
    </div>
  );
}
