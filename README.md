# Nudge

**Blockchain is freedom. Nudge teaches you to exercise yours.**

Nudge is a behavioral DeFi coach for Solana. It translates complex lending positions into plain language, monitors your portfolio health in real-time, and sends personalized nudges based on your behavioral profile.

Built for the **Solana Frontier Hackathon 2026** (Colosseum).

## What it does

- **Portfolio translation** — Shows your Solana wallet balance and Kamino lending positions in human-readable language, adapted to your communication style
- **Behavioral profiling** — A quiz-based neurotag system identifies your risk personality (Guardian, Explorer, Strategist, etc.) and adjusts all messaging accordingly
- **Health Factor monitoring** — Real-time tracking of Kamino lending positions with color-coded status (safe/attention/danger)
- **Nudge Score** — A composite score (0-100) reflecting your overall DeFi health
- **RPG progression** — Earn XP for learning, unlock inventory items, level up your character
- **Lyra AI assistant** — FAQ chatbot with contextual follow-up suggestions
- **Alert system** — Severity-based notifications for position changes
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
| i18n | react-i18next (pt-BR default) |
| Fonts | Lora, Cormorant Garamond, Outfit, Fira Code |

## Getting started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your Helius RPC key

# Run development server
npm run dev
```

Open [http://localhost:3002](http://localhost:3002).

### Demo mode

Visit `/app?demo=marina` (or `rafael`, `luna`, `semposicao`) to see the app with mock data — no wallet required.

### Design system

Visit `/design-demo` to see the complete design system: typography, palette, components, modals, animations.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_HELIUS_RPC_URL` | Yes | Helius RPC endpoint for Solana mainnet |
| `TELEGRAM_BOT_TOKEN` | No | Telegram bot token (future feature) |

## Project structure

```
src/
  app/              # Next.js pages
    app/            # Dashboard (painel, alertas, jornada, perfil)
    onboarding/     # 3-step onboarding flow
    design-demo/    # Design system showcase
    api/            # API routes (position fetching)
  components/       # React components
    dashboard/      # Dashboard-specific components
  contexts/         # React contexts (DashboardProvider)
  hooks/            # Custom hooks (usePosition, useNudges)
  lib/              # Business logic
    demo.ts         # Demo personas and mock data
    rpg.ts          # RPG system (classes, XP, inventory)
    neurotags.ts    # Behavioral profiling
    kamino.ts       # Kamino SDK integration
    portfolio.ts    # Portfolio analysis
    nudges.ts       # Nudge generation engine
    goals.ts        # Goal/journey system
    insights.ts     # AI-generated insights
    communication.ts # Communication style profiles
  locales/          # i18n translations (pt-BR, en)
```

## Design philosophy

**Feminine Cypherpunk** — Bioluminescence, not neon. Bloom, not glow. Breath, not glitch.

- Warm dark backgrounds (#07050E, #0D0B15)
- Orchid purple (#A366FF) + Rose (#FF6B9D) + Mint (#3DDBA4)
- Thick serif typography (Lora) + elegant italic accents (Cormorant Garamond)
- Glassmorphic cards with organic glow effects
- All messaging adapts to 4 communication styles: gentle, encouraging, direct, technical

## Hackathon tracks

- **Eitherway** — Kamino + Solflare integration
- **Superteam Brazil** — Built by a Brazilian woman developer
- Additional tracks: see internal track analysis

## Author

**Giuliana Lopes Galvao** — UX Designer Senior, behavioral science practitioner, building with AI.

Made by a woman, for all women.
