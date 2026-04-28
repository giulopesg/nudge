@AGENTS.md

# Nudge — Behavioral DeFi Coach for Solana

Reads Kamino lending positions, profiles financial personality via quizzes, assigns RPG classes, sends nudges via Lyra AI. Hackathon: Colosseum Frontier 2026.

## Stack
- Next.js 16.2.3 + React 19 + TypeScript + Tailwind v4 — port 3002
- Wallet: Phantom + Solflare via @solana/wallet-adapter
- DeFi: @kamino-finance/klend-sdk 7.3.22 + @solana/kit
- i18n: react-i18next (pt-BR default, en)
- Fonts: Lora (display), Agbalumo (accent), Outfit (sans), Fira Code (mono)

## Rules (MANDATORY)

### i18n — Zero Hardcoded Text
Every user-visible string uses `t('namespace.key')`. Files: `src/locales/{pt-BR,en}/`. Namespaces: common, onboarding, dashboard, insights, education, goals, score, nudges.

### 200-Line File Limit
Any file exceeding 200 lines must be split. Single responsibility per file.

### Brand Header
Every page: name + byline, never just name.
```tsx
<span className="n2-gradient-text font-display text-[20px] sm:text-[28px] font-bold uppercase tracking-[0.06em]">{t('brand.name')}</span>
<span className="font-accent text-[11px] sm:text-[17px] text-plum">{t('brand.byline')}</span>
```

### Tailwind v4
CSS outside `@layer` beats utilities. Use inline styles when conflicting.

## Routes
| Route | Purpose |
|-------|---------|
| `/` | Landing |
| `/onboarding` | 5-step: permissions → quiz → goals → profile → registration |
| `/app` | Dashboard (wallet, portfolio, Kamino, score) |
| `/app/alertas` | Nudge history |
| `/app/jornada` | Goals + journey |
| `/app/perfil` | Profile + character sheet |
| `/design-system` | N2DS docs (static) |

## Design Tokens
- Background: #07050E, #0D0B15
- Primary: orchid #A366FF, hover #B87AFF
- Secondary: rose #FF6B9D, mint #3DDBA4
- Status: safe #2ED88A, attention #F5A623, danger #FF4D6A, xp #B57AFF
- Surface: rgba(255,248,245,0.03), border rgba(163,102,255,0.10)
- Layers: MeshGradient (WebGL z-0) + StarfieldOverlay (canvas z-1) + content (z-10)

## Key Patterns
- Central state: `DashboardContext.tsx` — position, profile, nudges, XP, character
- DeFi data: `usePosition` → `/api/position/[wallet]` → `kamino.ts`
- Demo: `?demo={marina|rafael|luna|semposicao}` on dashboard routes
- Tokens export: `/api/tokens` (W3C DTCG) + `/design-tokens.json` (static)
