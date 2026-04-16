import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from '@/locales/pt-BR/common.json';
import onboarding from '@/locales/pt-BR/onboarding.json';
import dashboard from '@/locales/pt-BR/dashboard.json';
import insights from '@/locales/pt-BR/insights.json';
import education from '@/locales/pt-BR/education.json';
import goals from '@/locales/pt-BR/goals.json';
import score from '@/locales/pt-BR/score.json';
import nudges from '@/locales/pt-BR/nudges.json';

const resources = {
  'pt-BR': {
    common,
    onboarding,
    dashboard,
    insights,
    education,
    goals,
    score,
    nudges,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
