'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import DashboardNav from '@/components/dashboard/DashboardNav';
import WalletButton from '@/components/WalletButton';
import DemoToggle from '@/components/DemoToggle';
import CharacterBadge from '@/components/dashboard/CharacterBadge';
import CharacterSheet from '@/components/dashboard/CharacterSheet';

function ShellInner({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const tDash = useTranslation('dashboard').t;
  const {
    character, persona, isDemo, showData, loading, error, refetch, hasProfile, unreadCount,
  } = useDashboard();

  const [showCharacterSheet, setShowCharacterSheet] = useState(false);

  return (
    <div className="dashboard-layout">
      <DashboardNav hasProfile={hasProfile} unreadCount={unreadCount} />

      <div className="dashboard-main">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-display text-sm font-bold uppercase tracking-widest text-primary text-glow-primary md:hidden"
            >
              {t('app.name')}
            </Link>
            {character && (
              <CharacterBadge
                character={character}
                onClick={() => setShowCharacterSheet(true)}
              />
            )}
          </div>
          <div className="flex items-center gap-3">
            <DemoToggle />
            {!isDemo && <WalletButton />}
          </div>
        </header>

        {/* Content area */}
        <main className="flex flex-1 flex-col px-6 py-8 max-w-2xl mx-auto w-full">
          {!showData ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <p className="text-text-secondary">
                {t('wallet.connectDescription')}
              </p>
              <div className="mt-4">
                <WalletButton />
              </div>
              <p className="mt-6 text-xs text-text-muted">
                {tDash('demo.orDemo')}{' '}
                <Link href="/app?demo=marina" className="text-plum-light hover:text-plum">
                  {tDash('demo.enterDemo')}
                </Link>
              </p>
            </div>
          ) : loading ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="mt-3 font-mono text-xs text-text-secondary">
                {tDash('loading')}
              </p>
            </div>
          ) : error ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <p className="text-sm text-danger">{tDash('error')}</p>
              <button
                onClick={refetch}
                className="mt-3 chamfer-sm border border-surface-border bg-surface px-4 py-2 font-mono text-xs text-text-secondary hover:bg-surface-hover"
              >
                {tDash('retry')}
              </button>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      {/* CharacterSheet modal */}
      {showCharacterSheet && character && (
        <CharacterSheet
          character={character}
          avatarSrc={persona?.avatar ?? '/giuliana-avatar.png'}
          onClose={() => setShowCharacterSheet(false)}
        />
      )}
    </div>
  );
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <ShellInner>{children}</ShellInner>
    </DashboardProvider>
  );
}
