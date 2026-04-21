'use client';

import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import WalletButton from '@/components/WalletButton';
import DemoToggle from '@/components/DemoToggle';
import LanguageToggle from '@/components/LanguageToggle';

function LandingContent() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-surface-border">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
          <span className="n2-gradient-text font-display text-[20px] sm:text-[28px] font-bold uppercase tracking-[0.06em]">
            {t('brand.name')}
          </span>
          <span className="font-accent text-[13px] sm:text-xl italic text-plum">
            {t('brand.byline')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <LanguageToggle />
          <Suspense><DemoToggle /></Suspense>
          <WalletButton />
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 text-center">
        <div className="card py-10 px-5 sm:py-[72px] sm:px-10 text-center max-w-2xl w-full">
          {/* Top divider */}
          <div className="n2-divider mx-auto" style={{ width: 48 }} />

          {/* Mixed-font heading */}
          <h1 className="mt-6 sm:mt-8">
            <span className="font-display text-3xl sm:text-5xl font-bold">
              {t('landing.heroPrefix')}
            </span>
            {' '}
            <span className="n2-gradient-text font-accent text-[36px] sm:text-[54px] italic font-bold">
              {t('landing.heroAccent')}
            </span>
          </h1>

          {/* Accent subtitle */}
          <p className="mt-3 sm:mt-4 font-accent text-[20px] sm:text-[26px] italic text-plum">
            {t('landing.accentSubtitle')}
          </p>

          {/* Body */}
          <p className="mt-4 sm:mt-6 mx-auto max-w-[460px] font-display text-[15px] sm:text-[17px] leading-[1.8] text-text-secondary">
            {t('landing.subtitle')}
          </p>

          {/* Buttons */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-3.5 flex-wrap">
            <Link href="/onboarding" className="n2-btn-primary">
              {t('landing.cta')}
            </Link>
            <Link href="/app?demo=true" className="n2-btn-secondary">
              {t('landing.ctaDemo')}
            </Link>
          </div>

          {/* Bottom divider + footer */}
          <div className="n2-divider mx-auto mt-8 sm:mt-12" style={{ width: 48 }} />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
            {t('landing.solanaFrontier')}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="font-mono text-[13px] text-text-muted tracking-wider">
          {t('app.tagline')}
        </p>
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense>
      <LandingContent />
    </Suspense>
  );
}
