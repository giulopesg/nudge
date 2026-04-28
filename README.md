# Nudge

**Blockchain is freedom. Nudge teaches you to exercise yours.**

Nudge is a behavioral DeFi coach for Solana. It translates complex lending positions into plain language, monitors your portfolio health in real-time, and sends personalized nudges based on your behavioral profile.

Built for the **Solana Frontier Hackathon 2026** (Colosseum).

**Live:** [nudge.giulopesgalvao.com.br](https://nudge.giulopesgalvao.com.br)

## What it does

- **Portfolio translation** — Shows your Solana wallet balance and Kamino lending positions in human-readable language, adapted to your communication style
- **Behavioral profiling** — A quiz-based neurotag system identifies your risk personality (Guardian, Explorer, Strategist, etc.) and adjusts all messaging accordingly
- **Health Factor monitoring** — Real-time tracking of Kamino lending positions with color-coded status (safe/attention/danger) + daily cron monitoring via Upstash Redis
- **Nudge Score** — A composite score (0-100) reflecting your overall DeFi health
- **RPG progression** — Earn XP for learning, unlock inventory items, level up your character
- **Lyra AI assistant** — FAQ chatbot with contextual follow-up suggestions
- **Alert system** — Severity-based notifications for position changes
- **On-chain registration** — Profile hash committed to Solana via Memo Program
- **Design system** — N2DS (Nudge Design System) with live docs, W3C DTCG token export, and Figma integration
- **Demo mode** — 4 pre-built personas (Marina, Rafael, Luna, Nyx) showcasing different risk scenarios

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.3 + React 19 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Wallet | @solana/wallet-adapter (Phantom, Solflare) |
| DeFi | Kamino klend-sdk v7.3.22 |
| Pricing | Jupiter Price API |
| Monitoring | Upstash Redis + Vercel Cron |
| i18n | react-i18next (pt-BR default, en) |
| Fonts | Lora (display), Agbalumo (accent), Outfit (sans), Fira Code (mono) |

## Getting started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your keys (see Environment variables below)

# Run development server
npm run dev
```

Open [http://localhost:3002](http://localhost:3002).

### Demo mode

Visit `/app?demo=marina` (or `rafael`, `luna`, `semposicao`) to see the app with mock data — no wallet required.

### Design system

Visit `/design-system` to see the full N2DS documentation: Getting Started, Foundations, Components, Patterns, and Figma integration.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_HELIUS_RPC_URL` | Yes | Helius RPC endpoint for Solana mainnet |
| `CRON_SECRET` | Yes | Secret for authenticating cron job requests |
| `KV_REST_API_URL` | Yes | Upstash Redis REST URL (for cron monitoring) |
| `KV_REST_API_TOKEN` | Yes | Upstash Redis REST token |
| `TELEGRAM_BOT_TOKEN` | No | Telegram bot token (future feature) |

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/onboarding` | 5-step: permissions, quiz, goals, profile, registration |
| `/app` | Dashboard (wallet, portfolio, Kamino, score) |
| `/app/alertas` | Nudge history |
| `/app/jornada` | Goals + journey |
| `/app/perfil` | Profile + character sheet |
| `/design-system` | N2DS docs (static) |

## Project structure

```
src/
  app/
    page.tsx                       # Landing
    layout.tsx                     # Root (fonts, MeshGradient, Starfield)
    globals.css                    # Tailwind v4 + design tokens
    onboarding/page.tsx            # 5-step onboarding
    app/
      layout.tsx                   # DashboardShell wrapper
      page.tsx                     # Dashboard home
      alertas/page.tsx             # Alerts
      jornada/page.tsx             # Journey
      perfil/page.tsx              # Profile
    api/
      position/[wallet]/route.ts   # Kamino + portfolio API
      tokens/route.ts              # W3C DTCG token export
      cron/monitor/route.ts        # Daily cron job
      monitor/register/route.ts    # Wallet registration for monitoring
      monitor/nudges/[wallet]/route.ts  # Server nudge history
    design-system/                 # N2DS docs (13 sections)
  components/
    Providers.tsx                  # Wallet + i18n providers
    MeshGradient.tsx               # WebGL background (z-0)
    StarfieldOverlay.tsx           # Canvas stars (z-1)
    WalletButton.tsx
    LanguageToggle.tsx
    DemoToggle.tsx
    dashboard/                     # ~30 dashboard components
    onboarding/                    # 5 step components
  contexts/
    DashboardContext.tsx            # Central state
  hooks/
    usePosition.ts                 # Wallet + Kamino fetch
    useNudges.ts                   # Nudge generation + server sync
    useECGAnimation.ts             # ECG canvas animation
  lib/
    kamino.ts                      # Kamino SDK integration
    neurotags.ts                   # Behavioral profiling
    rpg.ts                         # RPG system (classes, stats, items, XP)
    portfolio.ts                   # NudgeScore calculation
    nudges.ts                      # Snapshot-based nudge engine
    store.ts                       # localStorage wrapper
    demo.ts                        # 4 demo personas
    demo-nudges.ts                 # Mock nudges for demo
    goals.ts                       # Goal/journey system
    insights.ts                    # Contextual insights
    communication.ts               # Communication style profiles
    lyraRecommendation.ts          # Lyra AI recommendation engine
    memo.ts                        # Solana Memo Program
    enrich.ts                      # Position enrichment pipeline
    kv.ts                          # Upstash Redis client
    design-tokens.ts               # W3C DTCG token definitions
    i18n.ts                        # i18n setup
  locales/
    pt-BR/                         # 8 JSON files (default)
    en/                            # 8 JSON files
scripts/
  generate-tokens.mjs              # Token export script (npm run tokens)
public/                            # Avatars, backgrounds, icons
```

## Design philosophy

**Feminine Cypherpunk** — Bioluminescence, not neon. Bloom, not glow. Breath, not glitch.

- Warm dark backgrounds (#07050E, #0D0B15)
- Orchid purple (#A366FF) + Rose (#FF6B9D) + Mint (#3DDBA4)
- Thick serif typography (Lora) + playful accent (Agbalumo)
- Glassmorphic cards with organic glow effects
- All messaging adapts to 4 communication styles: gentle, encouraging, direct, technical

## Hackathon tracks

- **Colosseum Frontier** (main) — Grand Champion $30K / Solana Foundation $10K
- **Eitherway** — Kamino + Solflare integration ($5K + $3K + $3K)
- **Superteam Brazil** — Built by a Brazilian woman developer

## Author

**Giuliana Lopes Galvao** — UX Designer Senior, behavioral science practitioner, building with AI.

Made by a woman, for all women.
