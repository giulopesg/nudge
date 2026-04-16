'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface NavTab {
  key: string;
  icon: string;
  labelKey: string;
  href: string;
  /** Show even without profile */
  alwaysVisible?: boolean;
}

const TABS: NavTab[] = [
  { key: 'painel', icon: '◈', labelKey: 'nav.painel', href: '/app', alwaysVisible: true },
  { key: 'alertas', icon: '◉', labelKey: 'nav.alertas', href: '/app/alertas', alwaysVisible: true },
  { key: 'jornada', icon: '◆', labelKey: 'nav.jornada', href: '/app/jornada' },
  { key: 'perfil', icon: '◇', labelKey: 'nav.perfil', href: '/app/perfil' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/app') return pathname === '/app';
  return pathname.startsWith(href);
}

interface Props {
  hasProfile: boolean;
  unreadCount?: number;
}

export default function DashboardNav({ hasProfile, unreadCount = 0 }: Props) {
  const { t } = useTranslation('dashboard');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const demoParam = searchParams.get('demo');
  const qs = demoParam ? `?demo=${demoParam}` : '';

  const visibleTabs = TABS.filter(
    (tab) => tab.alwaysVisible || hasProfile,
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="nav-sidebar hidden md:flex" aria-label="Dashboard navigation">
        <Link href="/" className="nav-sidebar-brand">NUDGE</Link>
        <div className="nav-sidebar-divider" />
        {visibleTabs.map((tab) => {
          const active = isActive(pathname, tab.href);
          return (
            <Link
              key={tab.key}
              href={`${tab.href}${qs}`}
              className={`nav-item ${active ? 'nav-item-active' : ''}`}
              title={t(tab.labelKey)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{t(tab.labelKey)}</span>
              {tab.key === 'alertas' && unreadCount > 0 && (
                <span className="nav-badge">{unreadCount}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile floating bottom bar */}
      <nav className="nav-bottom flex md:hidden" aria-label="Dashboard navigation">
        {visibleTabs.map((tab) => {
          const active = isActive(pathname, tab.href);
          return (
            <Link
              key={tab.key}
              href={`${tab.href}${qs}`}
              className={`nav-item-mobile ${active ? 'nav-item-mobile-active' : ''}`}
            >
              <span className="nav-icon-mobile">{tab.icon}</span>
              <span className="nav-label-mobile">{t(tab.labelKey)}</span>
              {tab.key === 'alertas' && unreadCount > 0 && (
                <span className="nav-badge-mobile">{unreadCount}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
