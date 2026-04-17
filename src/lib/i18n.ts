import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonPt from '@/locales/pt-BR/common.json';
import onboardingPt from '@/locales/pt-BR/onboarding.json';
import dashboardPt from '@/locales/pt-BR/dashboard.json';
import insightsPt from '@/locales/pt-BR/insights.json';
import educationPt from '@/locales/pt-BR/education.json';
import goalsPt from '@/locales/pt-BR/goals.json';
import scorePt from '@/locales/pt-BR/score.json';
import nudgesPt from '@/locales/pt-BR/nudges.json';

import commonEn from '@/locales/en/common.json';
import onboardingEn from '@/locales/en/onboarding.json';
import dashboardEn from '@/locales/en/dashboard.json';
import insightsEn from '@/locales/en/insights.json';
import educationEn from '@/locales/en/education.json';
import goalsEn from '@/locales/en/goals.json';
import scoreEn from '@/locales/en/score.json';
import nudgesEn from '@/locales/en/nudges.json';

const resources = {
  'pt-BR': {
    common: commonPt,
    onboarding: onboardingPt,
    dashboard: dashboardPt,
    insights: insightsPt,
    education: educationPt,
    goals: goalsPt,
    score: scorePt,
    nudges: nudgesPt,
  },
  en: {
    common: commonEn,
    onboarding: onboardingEn,
    dashboard: dashboardEn,
    insights: insightsEn,
    education: educationEn,
    goals: goalsEn,
    score: scoreEn,
    nudges: nudgesEn,
  },
};

function detectLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('nudge:lang');
  if (stored && stored in resources) return stored;
  const browserLang = navigator.language;
  if (browserLang.startsWith('pt')) return 'pt-BR';
  return 'en';
}

i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
