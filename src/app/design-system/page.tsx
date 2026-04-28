'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import GettingStarted from './sections/GettingStarted';
import Foundations from './sections/Foundations';
import Components from './sections/Components';
import Patterns from './sections/Patterns';
import FigmaIntegration from './sections/FigmaIntegration';

const NAV_SECTIONS = [
  { id: 'getting-started', label: 'Getting Started', icon: '01' },
  { id: 'foundations', label: 'Foundations', icon: '02' },
  { id: 'components', label: 'Components', icon: '03' },
  { id: 'patterns', label: 'Patterns', icon: '04' },
  { id: 'figma', label: 'Figma', icon: '05' },
] as const;

const FOUNDATION_SUBS = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius' },
  { id: 'shadows', label: 'Shadows & Glows' },
  { id: 'animations', label: 'Animations' },
];

/* Component sub-items per category — maps to IDs inside each group file */
const COMPONENT_CATEGORIES: { id: string; label: string; subs: { id: string; label: string }[] }[] = [
  { id: 'cat-actions', label: 'Actions', subs: [
    { id: 'comp-button', label: 'Button' },
    { id: 'comp-action-card', label: 'ActionCard' },
    { id: 'comp-wallet-button', label: 'WalletButton' },
  ]},
  { id: 'cat-layout', label: 'Layout', subs: [
    { id: 'comp-card', label: 'Card' },
    { id: 'comp-dashboard-shell', label: 'DashboardShell' },
    { id: 'comp-status-hero', label: 'StatusHero' },
  ]},
  { id: 'cat-data-display', label: 'Data Display', subs: [
    { id: 'comp-wallet-card', label: 'WalletCard' },
    { id: 'comp-portfolio-card', label: 'PortfolioCard' },
    { id: 'comp-kamino-card', label: 'KaminoCard' },
    { id: 'comp-health-bar', label: 'HealthBar' },
    { id: 'comp-score-ring', label: 'ScoreRing' },
    { id: 'comp-score-explainer', label: 'ScoreExplainer' },
    { id: 'comp-ecg-monitor', label: 'ECGMonitor' },
  ]},
  { id: 'cat-feedback', label: 'Feedback', subs: [
    { id: 'comp-badge', label: 'Badge/Status' },
    { id: 'comp-progress', label: 'ProgressBar' },
    { id: 'comp-xp-toast', label: 'XpToast' },
    { id: 'comp-insight-cards', label: 'InsightCards' },
  ]},
  { id: 'cat-navigation', label: 'Navigation', subs: [
    { id: 'comp-nav', label: 'NavItem' },
    { id: 'comp-dashboard-nav', label: 'DashboardNav' },
  ]},
  { id: 'cat-rpg', label: 'RPG', subs: [
    { id: 'comp-tag', label: 'Tag/Neurotag' },
    { id: 'comp-inventory', label: 'InventorySlot' },
    { id: 'comp-character-card', label: 'CharacterCard' },
    { id: 'comp-character-badge', label: 'CharacterBadge' },
    { id: 'comp-character-sheet', label: 'CharacterSheet' },
  ]},
  { id: 'cat-ai-chat', label: 'AI / Chat', subs: [
    { id: 'comp-chat', label: 'ChatMessage' },
    { id: 'comp-nudge-chat-button', label: 'NudgeChatButton' },
    { id: 'comp-nudge-chat-panel', label: 'NudgeChatPanel' },
    { id: 'comp-lyra-avatar', label: 'LyraAvatar' },
  ]},
  { id: 'cat-modals', label: 'Modals', subs: [
    { id: 'comp-modal', label: 'Modal/Overlay' },
    { id: 'comp-alert-modal', label: 'AlertModal' },
    { id: 'comp-education-modal', label: 'EducationModal' },
    { id: 'comp-item-detail-modal', label: 'ItemDetailModal' },
    { id: 'comp-item-unlock-modal', label: 'ItemUnlockModal' },
    { id: 'comp-level-up-modal', label: 'LevelUpModal' },
    { id: 'comp-wallet-manage-modal', label: 'WalletManageModal' },
  ]},
  { id: 'cat-onboarding', label: 'Onboarding', subs: [
    { id: 'comp-permissions-step', label: 'PermissionsStep' },
    { id: 'comp-quiz-step', label: 'QuizStep' },
    { id: 'comp-goals-step', label: 'GoalsStep' },
    { id: 'comp-profile-step', label: 'ProfileStep' },
    { id: 'comp-registration-step', label: 'RegistrationStep' },
  ]},
  { id: 'cat-content-cards', label: 'Content Cards', subs: [
    { id: 'comp-journey-card', label: 'JourneyCard' },
    { id: 'comp-first-steps-card', label: 'FirstStepsCard' },
    { id: 'comp-nudge-history-card', label: 'NudgeHistoryCard' },
    { id: 'comp-add-integration-card', label: 'AddIntegrationCard' },
    { id: 'comp-beginner-kamino-card', label: 'BeginnerKaminoCard' },
  ]},
  { id: 'cat-backgrounds', label: 'Backgrounds', subs: [
    { id: 'comp-mesh-gradient', label: 'MeshGradient' },
    { id: 'comp-starfield-overlay', label: 'StarfieldOverlay' },
  ]},
];

/* Flat list of all scrollable sub-item IDs for scroll tracking */
const ALL_SUB_IDS = [
  ...FOUNDATION_SUBS.map(s => s.id),
  ...COMPONENT_CATEGORIES.flatMap(cat => [cat.id, ...cat.subs.map(s => s.id)]),
];

/* Map component sub-id → parent category id */
const SUB_TO_CAT = new Map<string, string>();
for (const cat of COMPONENT_CATEGORIES) {
  for (const sub of cat.subs) {
    SUB_TO_CAT.set(sub.id, cat.id);
  }
}

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set());
  const sidebarRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    /* 1. Detect top-level section */
    const sections = NAV_SECTIONS.map(s => ({
      id: s.id,
      el: document.getElementById(s.id),
    }));

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = sections[i].el;
      if (el && el.getBoundingClientRect().top <= 120) {
        setActiveSection(sections[i].id);
        break;
      }
    }

    /* 2. Detect active sub-item (foundation sub, category header, or component) */
    let found: string | null = null;
    for (let i = ALL_SUB_IDS.length - 1; i >= 0; i--) {
      const el = document.getElementById(ALL_SUB_IDS[i]);
      if (el && el.getBoundingClientRect().top <= 150) {
        found = ALL_SUB_IDS[i];
        break;
      }
    }
    setActiveSub(found);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Auto-scroll sidebar to keep the active item visible */
  useEffect(() => {
    const target = activeSub ?? activeSection;
    if (!target || !sidebarRef.current) return;
    const btn = sidebarRef.current.querySelector<HTMLElement>(`[data-nav="${target}"]`);
    if (!btn) return;
    const nav = sidebarRef.current;
    const btnRect = btn.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    /* If button is outside visible area of sidebar, scroll it into center */
    if (btnRect.top < navRect.top + 60 || btnRect.bottom > navRect.bottom - 40) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeSub, activeSection]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleCat = (catId: string) => {
    setCollapsedCats(prev => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  return (
    <div className="min-h-screen">
      {/* Mobile header bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 border-b border-surface-border"
        style={{ background: 'rgba(7, 5, 14, 0.92)', backdropFilter: 'blur(20px)' }}>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-text-secondary hover:text-foreground transition-colors mr-3"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
        <span className="n2-gradient-text font-display text-[18px] font-bold uppercase tracking-[0.06em]">
          N2DS
        </span>
        <span className="font-accent text-[13px] text-plum ml-2">
          Design System
        </span>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(7, 5, 14, 0.8)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full z-50 w-[260px] flex flex-col
          border-r border-surface-border overflow-y-auto
          transition-transform duration-200
          md:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ background: 'rgba(7, 5, 14, 0.96)', backdropFilter: 'blur(24px)' }}
      >
        {/* Brand */}
        <div className="px-6 pt-6 pb-4 border-b border-surface-border">
          <div className="flex flex-col">
            <span className="n2-gradient-text font-display text-[22px] font-bold uppercase tracking-[0.06em]">
              Nudge
            </span>
            <span className="font-accent text-[14px] text-plum">
              Design System v4
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.08em] bg-primary-muted px-2 py-0.5 rounded-full border border-surface-border">
              N2DS
            </span>
            <span className="font-mono text-[10px] text-text-muted tracking-wider">
              v4.0
            </span>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 px-3 py-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.id}>
              <button
                data-nav={section.id}
                onClick={() => scrollTo(section.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150
                  ${activeSection === section.id
                    ? 'text-primary bg-primary-muted'
                    : 'text-text-muted hover:text-text-secondary hover:bg-surface'
                  }
                `}
              >
                <span className="font-mono text-[10px] tracking-wider opacity-50">
                  {section.icon}
                </span>
                <span className="font-display text-[14px] font-semibold tracking-wide">
                  {section.label}
                </span>
              </button>

              {/* Sub-items for Foundations */}
              {section.id === 'foundations' && activeSection === 'foundations' && (
                <div className="ml-8 mt-1 mb-2 flex flex-col gap-0.5">
                  {FOUNDATION_SUBS.map((sub) => (
                    <button
                      key={sub.id}
                      data-nav={sub.id}
                      onClick={() => scrollTo(sub.id)}
                      className={`text-left px-2 py-1 text-[12px] font-mono transition-colors rounded ${
                        activeSub === sub.id
                          ? 'text-primary bg-primary-muted'
                          : 'text-text-muted hover:text-text-secondary'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Sub-items for Components — category groups */}
              {section.id === 'components' && activeSection === 'components' && (
                <div className="ml-4 mt-1 mb-2 flex flex-col gap-0.5">
                  {COMPONENT_CATEGORIES.map((cat) => {
                    const isOpen = !collapsedCats.has(cat.id);
                    const activeCatId = activeSub ? SUB_TO_CAT.get(activeSub) : null;
                    const isCatActive = activeSub === cat.id || activeCatId === cat.id;
                    return (
                      <div key={cat.id}>
                        <button
                          data-nav={cat.id}
                          onClick={() => { scrollTo(cat.id); toggleCat(cat.id); }}
                          className={`w-full flex items-center gap-2 text-left px-2 py-1 text-[12px] font-mono transition-colors rounded ${
                            isCatActive
                              ? 'text-primary'
                              : 'text-text-muted hover:text-text-secondary'
                          }`}
                        >
                          <span className="text-[8px] opacity-50">{isOpen ? '\u25BC' : '\u25B6'}</span>
                          <span>{cat.label}</span>
                          <span className="ml-auto text-[9px] opacity-40">{cat.subs.length}</span>
                        </button>
                        {isOpen && (
                          <div className="ml-5 flex flex-col gap-0.5">
                            {cat.subs.map((sub) => (
                              <button
                                key={sub.id}
                                data-nav={sub.id}
                                onClick={() => scrollTo(sub.id)}
                                className={`text-left px-2 py-0.5 text-[11px] font-mono transition-colors rounded truncate ${
                                  activeSub === sub.id
                                    ? 'text-primary bg-primary-muted'
                                    : 'text-text-muted hover:text-primary'
                                }`}
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-surface-border">
          <p className="font-mono text-[10px] text-text-muted tracking-wider">
            &copy; 2026 Giuliana Lopes Galv&atilde;o
          </p>
          <a
            href="https://giulopesgalvao.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-accent text-[12px] text-plum hover:text-plum-light transition-colors"
          >
            giulopesgalvao.com.br
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main className="md:ml-[260px] pt-16 md:pt-8 px-4 sm:px-8 lg:px-12 pb-24 max-w-[900px]">
        <GettingStarted />
        <Foundations copyCode={copyCode} copied={copied} />
        <Components copyCode={copyCode} copied={copied} />
        <Patterns copyCode={copyCode} copied={copied} />
        <FigmaIntegration copyCode={copyCode} copied={copied} />
      </main>
    </div>
  );
}
