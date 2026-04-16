'use client';

import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import WalletButton from '@/components/WalletButton';
import DemoToggle from '@/components/DemoToggle';

function LandingContent() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
        <span className="font-display text-sm font-bold uppercase tracking-widest text-primary text-glow-primary">
          {t('app.name')}
        </span>
        <div className="flex items-center gap-3">
          <Suspense><DemoToggle /></Suspense>
          <WalletButton />
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Decorative line */}
        <div className="mb-8 h-px w-16 bg-gradient-to-r from-transparent via-plum to-transparent" />

        <h1 className="font-display text-4xl font-bold uppercase tracking-wider text-glow-primary sm:text-5xl">
          {t('landing.hero')}
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary">
          {t('landing.subtitle')}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/onboarding"
            className="chamfer-md border border-primary bg-transparent px-8 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-primary transition-all glow-primary hover:bg-primary hover:text-background"
          >
            {t('landing.cta')}
          </Link>
          <Link
            href="/app?demo=true"
            className="chamfer-md border border-plum bg-transparent px-8 py-3 font-mono text-sm uppercase tracking-wider text-plum-light transition-all hover:bg-plum-muted hover:glow-plum"
          >
            Ver demo
          </Link>
        </div>

        {/* Decorative element */}
        <div className="mt-16 flex items-center gap-2 text-text-muted">
          <div className="h-px w-8 bg-surface-border" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            Solana Frontier 2026
          </span>
          <div className="h-px w-8 bg-surface-border" />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="font-mono text-xs text-text-muted tracking-wider">
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
