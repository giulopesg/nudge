'use client';

import { useTranslation } from 'react-i18next';
import { useDashboard } from '@/contexts/DashboardContext';
import NudgeHistoryCard from '@/components/dashboard/NudgeHistoryCard';
import type { NudgeSeverity } from '@/lib/nudges';

const SEVERITY_ORDER: NudgeSeverity[] = ['urgent', 'warning', 'info'];

const SEVERITY_COLORS: Record<NudgeSeverity, string> = {
  urgent: 'text-danger border-danger/40 bg-danger/8',
  warning: 'text-attention border-attention/40 bg-attention/8',
  info: 'text-primary border-primary/40 bg-primary/8',
};

export default function AlertasPage() {
  const { t } = useTranslation('dashboard');
  const {
    nudges, unreadCount, commProfile, markAsRead, markAllAsRead,
  } = useDashboard();

  const counts: Record<NudgeSeverity, number> = { urgent: 0, warning: 0, info: 0 };
  nudges.forEach((n) => { counts[n.severity]++; });

  return (
    <>
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="font-display text-lg font-bold uppercase tracking-wider">
            {t('alertas.title')}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">{t('alertas.subtitle')}</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="rounded-lg border border-surface-border bg-surface px-3 py-1.5 font-mono text-[11px] text-text-secondary hover:bg-surface-hover transition-colors"
          >
            {t('alertas.markAllRead')}
          </button>
        )}
      </div>

      {/* Summary cards */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {SEVERITY_ORDER.map((sev) => (
          <div
            key={sev}
            className={`rounded-xl border px-3 py-2 text-center ${SEVERITY_COLORS[sev]}`}
          >
            <p className="font-display text-xl font-bold">{counts[sev]}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider opacity-80">
              {t(`alertas.summary.${sev}`)}
            </p>
          </div>
        ))}
      </div>

      {/* Full timeline */}
      <div className="mt-6">
        {nudges.length > 0 ? (
          <NudgeHistoryCard
            nudges={nudges}
            unreadCount={unreadCount}
            commProfile={commProfile}
            onMarkRead={markAsRead}
            showAll
          />
        ) : (
          <p className="mt-8 text-center text-sm text-text-muted">
            {t('alertas.empty')}
          </p>
        )}
      </div>
    </>
  );
}
