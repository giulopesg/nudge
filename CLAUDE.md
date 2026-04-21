@AGENTS.md

# Nudge — Behavioral DeFi Coach for Solana

## What This Is
Nudge is a behavioral finance companion for DeFi on Solana. It reads Kamino lending positions, profiles financial personality via neuroscience quizzes, assigns RPG classes with stats/inventory, and sends personalized nudges via Lyra (AI guide). Built for Solana Frontier Hackathon 2026 (Colosseum). Deadline: 12 maio 2026.

## Owner
**Giuliana Lopes Galvao** — UX Designer Senior (10+ anos). Builds with Claude Code + Claude API + Figma. Method: Design Thinking -> Shape Up -> PRD -> Prompt Frames -> AI executes. Speaks pt-BR primarily.

## Stack
- **Next.js 16.2.3** + React 19 + TypeScript + Tailwind v4
- **Wallet:** Phantom + Solflare via @solana/wallet-adapter
- **DeFi:** @kamino-finance/klend-sdk 7.3.22 + @solana/kit
- **i18n:** react-i18next (pt-BR default, en available)
- **Fonts:** Lora (display), Agbalumo (accent), Outfit (UI), Fira Code (mono)
- **Port:** 3002

## Rules (MANDATORY)
### i18n — Zero Hardcoded Text
Every user-visible string must use `t('namespace.key')` via react-i18next. Translation files in `src/locales/pt-BR/` and `src/locales/en/`. Namespaces: common, onboarding, dashboard, insights, education, goals, score, nudges.

### 400-Line File Limit
Any file exceeding 400 lines must be split into multiple files, each with a single responsibility.

### Brand Header Pattern
Every page must show name + byline, never just the name:
```tsx
<span className="n2-gradient-text font-display text-[20px] sm:text-[28px] font-bold uppercase tracking-[0.06em]">
  {t('brand.name')}
</span>
<span className="font-accent text-[11px] sm:text-[17px] text-plum">
  {t('brand.byline')}
</span>
```

## Architecture

### Pages
| Route | Purpose |
|-------|---------|
| `/` | Landing page (hero, CTA, demo link) |
| `/onboarding` | 5-step flow: permissions -> quiz -> goals -> profile -> registration |
| `/app` | Dashboard home (wallet, portfolio, Kamino, nudge score) |
| `/app/alertas` | Nudge history + alerts |
| `/app/jornada` | Goals + journey progress |
| `/app/perfil` | User profile + character sheet |
| `/design-demo` | Design system showcase (internal) |

### Key Files
| File | Responsibility |
|------|---------------|
| `src/contexts/DashboardContext.tsx` | Central state: position, profile, nudges, XP, character, insights |
| `src/lib/kamino.ts` | Kamino SDK: getFullPosition(wallet) -> collateral, debt, HF |
| `src/lib/neurotags.ts` | 14 behavioral tags from quiz answers |
| `src/lib/rpg.ts` | RPG system: 11 activities, 12 items, tiers, stats, classes |
| `src/lib/portfolio.ts` | NudgeScore (0-100): diversification, stablecoin, concentration, HF |
| `src/lib/nudges.ts` | Snapshot comparison -> threshold-based nudge generation |
| `src/lib/store.ts` | localStorage wrapper (nudge:profile:*, nudge:activities:*, etc) |
| `src/lib/demo.ts` | 4 demo personas: marina, rafael, luna, semposicao |
| `src/lib/goals.ts` | 5 goals: aprender, reserva, independencia, rendimento, remessas |
| `src/lib/communication.ts` | CommProfile: gentle/encouraging/direct/technical from neurotags |
| `src/lib/insights.ts` | Contextual alerts: HF, concentration, stablecoin, diversification |
| `src/lib/lyraRecommendation.ts` | Lyra AI recommendation engine |
| `src/lib/memo.ts` | Solana Memo Program on-chain registration |
| `src/hooks/usePosition.ts` | Fetch wallet balance + Kamino position (real or demo) |
| `src/hooks/useNudges.ts` | Generate nudges from position snapshots |

### Components (30 dashboard + 5 onboarding + 6 root)
**Root:** Providers, WalletButton, DemoToggle, LanguageToggle, MeshGradient, StarfieldOverlay
**Dashboard:** DashboardShell, DashboardNav, StatusHero, ScoreRing, ScoreExplainer, WalletCard, PortfolioCard, KaminoCard, HealthBar, CharacterCard, CharacterBadge, CharacterSheet, ActionCards, JourneyCard, FirstStepsCard, NudgeHistoryCard, AddIntegrationCard, AlertModal, EducationModal, ItemDetailModal, ItemUnlockModal, LevelUpModal, WalletManageModal, LyraAvatar, NudgeChatButton, NudgeChatPanel, InsightCards, ECGMonitor, XpToast, BeginnerKaminoCard
**Onboarding:** PermissionsStep, QuizStep, GoalsStep, ProfileStep, RegistrationStep

### Data Flow
```
Wallet connects -> usePosition(address) -> /api/position/[wallet] -> kamino.ts
                                                                    -> getWalletBalance (SOL + Jupiter price)
                                                                    -> getKaminoPosition (klend-sdk obligation)
DashboardContext receives EnrichedPosition -> derives:
  - NudgeScore (portfolio health 0-100)
  - Character (RPG: class, tier, stats, level, XP, inventory)
  - CommProfile (communication style)
  - Insights (contextual alerts)
  - GoalProgress (journey milestones)
  - Nudges (via useNudges snapshot comparison)
  - Auto-grants activities (first-dashboard, first-position, learn-hf, read-status)
```

### Demo Mode
Access via `?demo=persona` on any dashboard route:
- `?demo=true` or `?demo=semposicao` -> Nyx (no Kamino position)
- `?demo=marina` -> Marina (safe HF, beginner)
- `?demo=rafael` -> Rafael (attention zone, intermediate)
- `?demo=luna` -> Luna (danger zone, experienced)

### Design System
- **Background:** cypherpunk dark (#07050E, #0D0B15)
- **Primary:** neon teal (#00D4AA)
- **Accent:** plum (#6B4FA0), orchid (#A366FF), rose (#FF6B9D)
- **Visual:** chamfered corners, scanlines, glow effects, glassmorphism
- **Background layers:** MeshGradient (WebGL z-0) + StarfieldOverlay (canvas z-1) + content (z-10)

## Current State (21 abril 2026)

### Uncommitted Fix
3 files modified — fix for onboarding crash:
- `CharacterCard.tsx` used `useDashboard()` but `/onboarding` has no `DashboardProvider`
- Fix: gender passed as prop instead of from context
- Files: CharacterCard.tsx, ProfileStep.tsx, onboarding/page.tsx

### What's Built (Sprints 1-2, ~85%)
- Full wallet integration (Phantom + Solflare)
- Kamino SDK reading positions on-chain
- Behavioral quiz -> neurotags -> RPG character
- Dashboard with all cards, modals, animations
- Nudge scoring + generation engine
- Demo mode (4 personas)
- i18n (pt-BR + en)
- Landing page
- Onboarding 5-step flow
- On-chain memo registration
- Lyra AI assistant (basic)
- WebGL mesh gradient + starfield overlay backgrounds
- Deployed: nudge.giulopesgalvao.com.br (Vercel)

### What's NOT Built (Sprints 3-7)
1. **Telegram Bot** (Sprint 3) — grammy, webhook, wallet<->chat linking
2. **Cron Monitoring** (Sprint 4) — HF alerts, volatility nudges, inactivity summaries
3. **On-chain Memo** (Sprint 5) — registration flow exists but needs polish
4. **Polish** (Sprint 6) — responsive, nudge history UI, landing completa
5. **Deploy + Launch** (Sprint 7) — beta testers, video, Colosseum submit

### Pending Accounts
- [ ] Helius RPC key (using fallback api.mainnet-beta.solana.com)
- [ ] Telegram Bot Token via @BotFather
- [ ] Colosseum registration status

### Deployment
- **GitHub:** github.com/giulopesg/nudge (remote: origin)
- **Vercel:** nudge-app-rust.vercel.app + nudge.giulopesgalvao.com.br
- **DNS:** Cloudflare (brother's account) CNAME nudge -> cname.vercel-dns.com

### Hackathon Strategy
- 8 tracks selected (1 project -> multiple tracks)
- Primary: **Eitherway** ($20K) — Kamino+Solflare perfect fit
- Regional: **Superteam Brazil** ($10K) — automatic
- Zero competitors combining Kamino + behavioral + Telegram in 5,400+ submissions
