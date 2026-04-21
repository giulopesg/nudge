'use client';

import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import type { Nudge } from '@/lib/nudges';

interface Props {
  nudges: Nudge[];
  alertsHref: string;
  onClose: () => void;
}

export default function AlertModal({ nudges, alertsHref, onClose }: Props) {
  const { t } = useTranslation('dashboard');

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
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

  const unread = nudges.filter((n) => !n.read);
  const urgentCount = unread.filter((n) => n.severity === 'urgent').length;
  const warningCount = unread.filter((n) => n.severity === 'warning').length;
  const infoCount = unread.filter((n) => n.severity === 'info').length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,5,14,0.97)] p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="animate-sheet-enter w-full max-w-sm border border-surface-border bg-surface rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2>
              <span className="font-display text-[18px] font-bold">{t('alertas.modalTitlePrefix')}</span>
              {' '}
              <span className="font-display text-[18px] font-normal italic text-text-muted">{t('alertas.modalTitleAccent')}</span>
            </h2>
            <p className="mt-1 text-[13px] text-text-secondary">
              {t('alertas.modalSubtitle')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[13px] uppercase tracking-wider text-text-muted hover:text-foreground transition-colors"
          >
            [X]
          </button>
        </div>

        {/* Severity counts */}
        <div className="mt-4 space-y-2">
          {urgentCount > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-danger-bg border border-danger/20 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-danger" />
              <span className="font-mono text-[13px] text-danger">
                {t('alertas.urgentCount', { count: urgentCount })}
              </span>
            </div>
          )}
          {warningCount > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-attention-bg border border-attention/20 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-attention" />
              <span className="font-mono text-[13px] text-attention">
                {t('alertas.warningCount', { count: warningCount })}
              </span>
            </div>
          )}
          {infoCount > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-primary-muted border border-primary/20 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-mono text-[13px] text-primary">
                {t('alertas.infoCount', { count: infoCount })}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3">
          <Link
            href={alertsHref}
            onClick={onClose}
            className="n2-btn-primary flex-1 text-center"
          >
            {t('alertas.viewAll')}
          </Link>
          <button onClick={onClose} className="n2-btn-ghost flex-1">
            {t('alertas.dismiss')}
          </button>
        </div>
      </div>
    </div>
  );
}
