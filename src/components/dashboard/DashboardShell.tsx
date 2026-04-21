'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import DashboardNav from '@/components/dashboard/DashboardNav';
import WalletButton from '@/components/WalletButton';
import DemoToggle from '@/components/DemoToggle';
import LanguageToggle from '@/components/LanguageToggle';
import CharacterSheet from '@/components/dashboard/CharacterSheet';
import XpToast from '@/components/dashboard/XpToast';
import LevelUpModal from '@/components/dashboard/LevelUpModal';
import ItemUnlockModal from '@/components/dashboard/ItemUnlockModal';
import NudgeChatButton from '@/components/dashboard/NudgeChatButton';
import NudgeChatPanel from '@/components/dashboard/NudgeChatPanel';

function ShellInner({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const tDash = useTranslation('dashboard').t;
  const {
    character, persona, isDemo, showData, loading, error, refetch, hasProfile, unreadCount,
    pendingXpGain, pendingLevelUp, pendingItemUnlock,
    dismissXpToast, dismissLevelUp, dismissItemUnlock,
    trackLyraTopic,
  } = useDashboard();

  const [showCharacterSheet, setShowCharacterSheet] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    handler(); // check initial state
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="dashboard-layout">
      {/* Fixed header — full viewport width, transparent until scroll */}
      <header className={`dashboard-header ${scrolled ? 'dashboard-header-scrolled' : ''}`}>
        <div className="flex items-center w-full px-4 sm:px-8">
          {/* Mobile logo — visible only on mobile where sidebar is hidden */}
          <Link href="/" className="flex flex-col leading-none md:hidden">
            <span className="n2-gradient-text font-display text-[22px] font-bold uppercase tracking-[0.06em]">
              {t('brand.name')}
            </span>
          </Link>
          {/* Spacer pushes toggles right */}
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <LanguageToggle />
            <DemoToggle />
            {!isDemo && <WalletButton />}
          </div>
        </div>
      </header>

      {/* Sidebar nav — includes logo + character badge on desktop */}
      <DashboardNav
        hasProfile={hasProfile}
        unreadCount={unreadCount}
        character={character}
        onShowCharacterSheet={() => setShowCharacterSheet(true)}
      />

      {/* Content area */}
      <div className="dashboard-main">
        <main className="flex flex-1 flex-col px-4 py-8 sm:px-8 sm:py-10 md:px-10 max-w-3xl mx-auto w-full">
          {!showData ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <p className="text-text-secondary">
                {t('wallet.connectDescription')}
              </p>
              <div className="mt-4">
                <WalletButton />
              </div>
              <p className="mt-6 text-[13px] text-text-muted">
                {tDash('demo.orDemo')}{' '}
                <Link href="/app?demo=marina" className="text-plum-light hover:text-plum">
                  {tDash('demo.enterDemo')}
                </Link>
              </p>
            </div>
          ) : loading ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="mt-3 font-mono text-[13px] text-text-secondary">
                {tDash('loading')}
              </p>
            </div>
          ) : error ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <p className="text-[15px] text-danger">{tDash('error')}</p>
              <button
                onClick={refetch}
                className="n2-btn-ghost mt-3"
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

      {/* XP Toast */}
      {pendingXpGain !== null && (
        <XpToast xp={pendingXpGain} onDismiss={dismissXpToast} />
      )}

      {/* Item Unlock Modal */}
      {pendingItemUnlock && (
        <ItemUnlockModal itemId={pendingItemUnlock} onClose={dismissItemUnlock} />
      )}

      {/* Level-Up Modal */}
      {pendingLevelUp && character && !pendingItemUnlock && (
        <LevelUpModal character={character} onClose={dismissLevelUp} />
      )}

      {/* Lyra Chatbot */}
      <NudgeChatButton isActive={chatOpen} onClick={() => setChatOpen((v) => !v)} />
      {chatOpen && <NudgeChatPanel onClose={() => setChatOpen(false)} onTopicExplored={trackLyraTopic} />}
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
