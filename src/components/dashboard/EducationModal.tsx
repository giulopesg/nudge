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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}
    >
      <div className="animate-sheet-enter w-full max-w-md border border-surface-border bg-surface chamfer-lg p-6 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
              {t(`${topicId}.title`)}
            </h2>
            <p className="mt-1 text-xs text-text-secondary">
              {t(`${topicId}.subtitle`)}
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="font-mono text-xs uppercase tracking-wider text-text-muted hover:text-foreground transition-colors"
          >
            [X]
          </button>
        </div>

        {/* Sections */}
        {Array.isArray(sections) && sections.map((section, i) => (
          <div key={i}>
            <div className="section-divider mt-5" />
            <h3 className="mt-4 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              {section.heading}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {section.body}
            </p>
          </div>
        ))}

        {/* Real life connection — the Nudge differentiator */}
        <div className="section-divider mt-5" />
        <div className="mt-4 chamfer-sm border border-primary/20 bg-primary-muted/30 px-4 py-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
            NA PRATICA
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {t(`${topicId}.realLifeConnection`)}
          </p>
        </div>

        {/* Next step hint */}
        <p className="mt-4 text-xs text-text-muted leading-relaxed">
          {t(`${topicId}.nextStep`)}
        </p>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="mt-6 w-full chamfer-sm border border-plum/30 bg-plum-muted px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-plum-light hover:bg-plum-muted/80 transition-colors"
        >
          {t(`${topicId}.actionLabel`)}
        </button>
      </div>
    </div>
  );
}
