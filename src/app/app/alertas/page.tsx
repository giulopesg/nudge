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
      <div className="flex items-center justify-between">
        <h1 className="flex items-baseline gap-3">
          <span className="font-display text-[22px] tracking-[0.02em] font-bold">{t('alertas.titlePrefix')}</span>
          <span className="font-display text-[22px] tracking-[0.02em] font-normal italic text-text-muted">{t('alertas.titleAccent')}</span>
        </h1>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="n2-btn-ghost !py-1.5 !px-4 !text-[11px]"
          >
            {t('alertas.markAllRead')}
          </button>
        )}
      </div>

      {/* Summary cards */}
      <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
        {SEVERITY_ORDER.map((sev) => (
          <div
            key={sev}
            className={`card rounded-xl sm:rounded-2xl border px-2 py-2 sm:px-4 sm:py-3 text-center ${SEVERITY_COLORS[sev]}`}
          >
            <p className="font-display text-[20px] sm:text-[28px] font-bold">{counts[sev]}</p>
            <p className="font-display text-[10px] sm:text-[13px] font-medium uppercase tracking-[0.04em] opacity-80">
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
          <div className="card rounded-2xl border-primary/20 bg-primary/5 text-center">
            <p className="font-display text-[17px] font-bold text-text-secondary">
              {t('alertas.emptyTitle')}
            </p>
            <p className="mt-2 text-[14px] text-text-muted">
              {t('alertas.emptyDesc')}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
