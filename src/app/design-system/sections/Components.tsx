'use client';

import ActionsGroup from './components/ActionsGroup';
import LayoutGroup from './components/LayoutGroup';
import DataDisplayGroup from './components/DataDisplayGroup';
import FeedbackGroup from './components/FeedbackGroup';
import NavigationGroup from './components/NavigationGroup';
import RpgGroup from './components/RpgGroup';
import AiChatGroup from './components/AiChatGroup';
import ModalsGroup from './components/ModalsGroup';
import OnboardingGroup from './components/OnboardingGroup';
import ContentCardsGroup from './components/ContentCardsGroup';
import BackgroundsGroup from './components/BackgroundsGroup';

interface ComponentsProps {
  copyCode: (code: string, id: string) => void;
  copied: string | null;
}

const CATEGORIES = [
  { id: 'cat-actions', label: 'Actions', Component: ActionsGroup },
  { id: 'cat-layout', label: 'Layout', Component: LayoutGroup },
  { id: 'cat-data-display', label: 'Data Display', Component: DataDisplayGroup },
  { id: 'cat-feedback', label: 'Feedback', Component: FeedbackGroup },
  { id: 'cat-navigation', label: 'Navigation', Component: NavigationGroup },
  { id: 'cat-rpg', label: 'RPG', Component: RpgGroup },
  { id: 'cat-ai-chat', label: 'AI / Chat', Component: AiChatGroup },
  { id: 'cat-modals', label: 'Modals', Component: ModalsGroup },
  { id: 'cat-onboarding', label: 'Onboarding', Component: OnboardingGroup },
  { id: 'cat-content-cards', label: 'Content Cards', Component: ContentCardsGroup },
  { id: 'cat-backgrounds', label: 'Backgrounds', Component: BackgroundsGroup },
];

export { CATEGORIES };

export default function Components({ copyCode, copied }: ComponentsProps) {
  return (
    <section id="components" className="scroll-mt-20 mb-24">
      <div className="mb-10">
        <p className="font-mono text-[11px] text-primary uppercase tracking-[0.12em] mb-2 font-semibold">03</p>
        <h2 className="font-display text-[28px] sm:text-[34px] font-bold text-foreground tracking-wide">
          Components
        </h2>
        <p className="font-sans text-[14px] text-text-secondary mt-2 max-w-[500px] leading-relaxed">
          41 components across 11 categories — live previews, copyable code, and usage guidelines.
        </p>
      </div>

      {CATEGORIES.map(({ id, label, Component }) => (
        <div key={id} id={id} className="scroll-mt-20 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="n2-divider flex-1" />
            <h3 className="font-display text-[18px] sm:text-[22px] font-bold text-foreground tracking-wide whitespace-nowrap">
              {label}
            </h3>
            <div className="n2-divider flex-1" />
          </div>
          <Component copyCode={copyCode} copied={copied} />
        </div>
      ))}
    </section>
  );
}
