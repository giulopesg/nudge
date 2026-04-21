'use client';

import { useTranslation } from 'react-i18next';
import type { Insight } from '@/lib/insights';
import type { CommProfile } from '@/lib/communication';

interface Props {
  insights: Insight[];
  commProfile: CommProfile;
}

const TYPE_STYLES: Record<string, string> = {
  info: 'border-surface-border',
  warning: 'border-attention/40 bg-attention/5',
  action: 'border-danger/40 bg-danger/5 animate-pulse-glow',
};

const TYPE_ICONS: Record<string, string> = {
  info: '\u2139\uFE0F',
  warning: '\u26A0\uFE0F',
  action: '\uD83D\uDEA8',
};

export default function InsightCards({ insights, commProfile }: Props) {
  const { t } = useTranslation('insights');

  if (insights.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-muted">
        {t('sectionTitle')}
      </h3>
      <div className="space-y-2">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`card rounded-lg border ${TYPE_STYLES[insight.type] ?? TYPE_STYLES.info}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-[17px] flex-shrink-0 mt-0.5">
                {TYPE_ICONS[insight.type]}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-mono text-[13px] font-semibold text-foreground">
                  {t(`${insight.titleKey}.${commProfile}`, insight.interpolation)}
                </h4>
                <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                  {t(`${insight.bodyKey}.${commProfile}`, insight.interpolation)}
                </p>
                {insight.actionKey && (
                  <div className="mt-2">
                    {insight.actionHref ? (
                      <a
                        href={insight.actionHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg border border-danger/30 bg-danger/10 px-3 py-1.5 font-mono text-[13px] font-semibold text-danger hover:bg-danger/20 transition-colors"
                      >
                        {t(`${insight.actionKey}.${commProfile}`)}
                        <span className="ml-1">&#8599;</span>
                      </a>
                    ) : (
                      <span className="font-mono text-[13px] font-semibold text-primary">
                        {t(`${insight.actionKey}.${commProfile}`)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
