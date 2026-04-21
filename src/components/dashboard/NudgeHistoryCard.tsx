'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Nudge, NudgeSeverity } from '@/lib/nudges';
import type { CommProfile } from '@/lib/communication';

interface Props {
  nudges: Nudge[];
  unreadCount: number;
  commProfile: CommProfile;
  onMarkRead: (nudgeId: string) => void;
  showAll?: boolean;
}

const INITIAL_VISIBLE = 3;

const SEVERITY_STYLES: Record<NudgeSeverity, string> = {
  urgent: 'border-danger/60 bg-danger/8 animate-pulse-glow',
  warning: 'border-attention/40 bg-attention/5',
  info: 'border-surface-border',
};

const SEVERITY_ICONS: Record<NudgeSeverity, string> = {
  urgent: '\uD83D\uDEA8',
  warning: '\u26A0\uFE0F',
  info: '\u2139\uFE0F',
};

function formatTimeAgo(timestamp: string, t: (key: string, opts?: Record<string, number>) => string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return t('timeAgo.minutes', { count: Math.max(1, minutes) });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t('timeAgo.hours', { count: hours });
  const days = Math.floor(hours / 24);
  return t('timeAgo.days', { count: days });
}

function getNudgeTitleKey(nudge: Nudge): string {
  if (nudge.type === 'hf-alert') {
    return `hf-alert.title.${nudge.severity}`;
  }
  if (nudge.type === 'volatility') {
    const dir = nudge.data.direction as string;
    return `volatility.title.${dir}`;
  }
  return `${nudge.type}.title`;
}

function getNudgeBodyKey(nudge: Nudge): string {
  if (nudge.type === 'hf-alert') {
    return `hf-alert.body.${nudge.severity}`;
  }
  if (nudge.type === 'volatility') {
    const dir = nudge.data.direction as string;
    return `volatility.body.${dir}`;
  }
  return `${nudge.type}.body`;
}

export default function NudgeHistoryCard({ nudges, unreadCount, commProfile, onMarkRead, showAll = false }: Props) {
  const { t } = useTranslation('nudges');
  const [expanded, setExpanded] = useState(false);

  if (nudges.length === 0) return null;

  const visible = (showAll || expanded) ? nudges : nudges.slice(0, INITIAL_VISIBLE);
  const hiddenCount = nudges.length - INITIAL_VISIBLE;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-muted">
          {t('sectionTitle')}
        </h3>
        {unreadCount > 0 && (
          <span className="rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[12px] font-semibold text-primary">
            {t('badge', { count: unreadCount })}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {visible.map((nudge) => {
          const titleKey = getNudgeTitleKey(nudge);
          const bodyKey = getNudgeBodyKey(nudge);

          return (
            <button
              key={nudge.id}
              type="button"
              onClick={() => { if (!nudge.read) onMarkRead(nudge.id); }}
              className={`card rounded-xl border w-full text-left transition-opacity ${
                SEVERITY_STYLES[nudge.severity]
              } ${nudge.read ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-[17px] flex-shrink-0 mt-0.5">
                  {SEVERITY_ICONS[nudge.severity]}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-mono text-[13px] font-semibold text-foreground">
                      {t(`${titleKey}.${commProfile}`, nudge.data as Record<string, string>)}
                    </h4>
                    <span className="flex-shrink-0 font-mono text-[12px] text-text-muted">
                      {formatTimeAgo(nudge.timestamp, t)}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                    {t(`${bodyKey}.${commProfile}`, nudge.data as Record<string, string>)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {!showAll && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 font-mono text-[13px] text-text-secondary hover:bg-surface-hover transition-colors"
        >
          {expanded
            ? t('showLess')
            : t('showMore', { count: hiddenCount })}
        </button>
      )}
    </div>
  );
}
