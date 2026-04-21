'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'pt-BR', label: 'PT' },
] as const;

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const toggle = useCallback(() => {
    const next = current === 'pt-BR' ? 'en' : 'pt-BR';
    i18n.changeLanguage(next);
    localStorage.setItem('nudge:lang', next);
  }, [current, i18n]);

  return (
    <button
      onClick={toggle}
      className="n2-btn-ghost !py-1 !px-3 !text-[11px] opacity-60 hover:opacity-100 transition-all flex items-center gap-1"
      aria-label="Toggle language"
    >
      {LANGS.map((lang) => (
        <span
          key={lang.code}
          className={
            current === lang.code || (lang.code === 'en' && !current.startsWith('pt'))
              ? 'text-primary'
              : 'text-text-muted'
          }
        >
          {lang.label}
        </span>
      ))}
    </button>
  );
}
