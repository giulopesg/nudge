'use client';

import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type EducationTopicId =
  | 'whatIsHF'
  | 'whatAreStablecoins'
  | 'whatIsDiversification'
  | 'whatIsKamino'
  | 'whatIsNudgeScore';

interface Props {
  topicId: EducationTopicId;
  onClose: () => void;
  onTopicRead?: (topicId: string) => void;
}

export default function EducationModal({ topicId, onClose, onTopicRead }: Props) {
  const { t } = useTranslation('education');

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const handleDismiss = () => {
    onTopicRead?.(topicId);
    onClose();
  };

  // Read sections array from i18n
  const sections = (t(`${topicId}.sections`, { returnObjects: true }) ?? []) as Array<{
    heading: string;
    body: string;
  }>;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,5,14,0.97)] p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}
    >
      <div className="animate-sheet-enter w-full max-w-md border border-surface-border bg-surface rounded-2xl p-6 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-[15px] font-bold uppercase tracking-wider text-foreground">
              {t(`${topicId}.title`)}
            </h2>
            <p className="mt-1 text-[13px] text-text-secondary">
              {t(`${topicId}.subtitle`)}
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="font-mono text-[13px] uppercase tracking-wider text-text-muted hover:text-foreground transition-colors"
          >
            [X]
          </button>
        </div>

        {/* Sections */}
        {Array.isArray(sections) && sections.map((section, i) => (
          <div key={i}>
            <div className="n2-divider mt-5" />
            <h3 className="mt-4 font-display text-[12px] font-bold uppercase tracking-[0.2em] text-text-muted">
              {section.heading}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.7] text-text-secondary">
              {section.body}
            </p>
          </div>
        ))}

        {/* Real life connection — the Nudge differentiator */}
        <div className="n2-divider mt-5" />
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary-muted/30 px-4 py-3">
          <p className="font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-primary">
            NA PRATICA
          </p>
          <p className="mt-2 text-[15px] leading-[1.7] text-text-secondary">
            {t(`${topicId}.realLifeConnection`)}
          </p>
        </div>

        {/* Next step hint */}
        <p className="mt-4 text-[13px] text-text-muted leading-relaxed">
          {t(`${topicId}.nextStep`)}
        </p>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="n2-btn-secondary mt-6 w-full"
        >
          {t(`${topicId}.actionLabel`)}
        </button>
      </div>
    </div>
  );
}
