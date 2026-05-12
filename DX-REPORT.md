# Jupiter Developer Experience Report — Nudge

**Builder:** Giuliana Lopes Galvao (@giuuo)
**Project:** Nudge — Behavioral DeFi Coach for Solana
**API used:** Price API v2 (`api.jup.ag/price/v2`)
**Integration file:** `src/lib/kamino.ts:56-66`

---

## How I used Jupiter

Nudge is a behavioral DeFi coach. It reads Kamino lending positions and wallet balances, then translates everything into plain language for non-technical users. Jupiter Price API v2 is used to convert SOL balance into USD for portfolio valuation.

The integration is a single fetch call:

```typescript
const res = await fetch(
  'https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112',
);
const data = await res.json();
const solPrice = Number(data.data?.['So11111111111111111111111111111111111111112']?.price ?? 0);
```

This feeds into the Nudge Score calculation — a composite metric (0-100) that reflects portfolio diversification, stablecoin reserves, concentration risk, and lending health. Without accurate USD pricing, the score is meaningless.

---

## Onboarding experience

**Time to first successful API call:** ~15 minutes.

The Price API v2 was the simplest part of the entire Solana integration stack. Compare that to Kamino's klend-sdk (which took hours of debugging around `@solana/kit` vs `@solana/web3.js` version conflicts) or the Memo Program (which required understanding transaction instruction building from scratch).

I found the Price API by searching "jupiter price api solana" — landed on the Station docs, found the endpoint, tested it in the browser, and had it working in code within minutes. No API key, no auth, no SDK installation. Just a URL.

---

## Documentation feedback

**What worked:**
- The endpoint URL and response format were clear enough to figure out from a single example
- No authentication required — huge win for quick prototyping
- The response shape (`data.[mintAddress].price`) is predictable

**What was confusing:**
- I initially didn't know I needed the full SOL mint address (`So111...112`). The docs could have a "Common mint addresses" quick-reference table (SOL, USDC, USDT, etc.) right at the top of the Price API page
- The difference between Price API v1 and v2 wasn't immediately clear when I first searched. I found v1 examples in older blog posts and had to figure out v2 was the current one
- Rate limiting — I still don't know what the rate limits are for the Price API. The docs don't mention them clearly. My app makes one call per wallet load, so I haven't hit issues, but if I were building a dashboard that refreshes every 30 seconds for multiple tokens, I'd have no idea if that's acceptable
- Error responses — when the API returns a token with `price: null`, there's no explanation. Is the token delisted? Is there insufficient liquidity? A `reason` field would help

**Specific doc page:** The main Price API reference at `station.jup.ag/docs/apis/price-api-v2` could use:
1. A "Quick Start" code block at the very top (not buried below explanation)
2. Error response examples (not just success)
3. A note about what happens with low-liquidity tokens

---

## API edge cases encountered

1. **Null price for valid tokens:** Some SPL tokens return `price: null` without explanation. In Nudge, I fall back to `0`, but this means users with obscure tokens see "$0.00" in their portfolio — which is technically wrong. A `priceUnavailable: true` flag with a reason would be more honest to display to users.

2. **No batch efficiency signal:** I'm fetching only SOL right now, but if I expand to all tokens in a wallet, I don't know if batching 20 mint addresses in one call is better than 20 separate calls. The API accepts multiple `ids` comma-separated, but the docs don't discuss performance characteristics.

3. **Stale price handling:** The response doesn't include a timestamp or staleness indicator. For a coaching app like Nudge where I calculate health metrics, knowing if a price is 5 seconds old vs 5 minutes old matters. I'd love a `lastUpdated` field.

---

## AI Stack feedback

**Context:** I built Nudge entirely using Claude Code (Opus) with the PRD → Prompt Frames → AI executes methodology. I'm a UX designer, not a developer.

**Jupiter-specific AI experience:**
- Claude knew the Jupiter Price API v2 endpoint and response format without needing docs. This suggests the API is well-documented enough that it's in LLM training data — which is a good sign.
- I did NOT use Jupiter CLI, Agent Skills, or Docs MCP during this build. Honestly, I didn't know they existed until I read this bounty listing. That's a discoverability problem — these tools should be mentioned in the main Price API docs with a "Building with AI? Try these tools" callout.
- The `llms.txt` initiative is interesting but I never encountered it organically. If `api.jup.ag/llms.txt` existed and Claude could reference it, that would have saved me from googling "jupiter solana price api endpoint" at the start.

**What would have helped:**
- A Jupiter MCP server that Claude Code could connect to — so I could say "get SOL price" and it would generate the correct fetch call with proper error handling
- Example code snippets in the docs tagged for AI copy-paste (with full error handling, not just the happy path)

---

## What I'd change about the platform

1. **Add a "Common tokens" quick reference** — SOL, USDC, USDT, BONK mint addresses right at the top. Every Solana builder needs this and currently has to look it up every time.

2. **Add response timestamps** — `lastUpdated` per token so apps can show "price as of 30s ago" and decide whether to refetch.

3. **Document rate limits explicitly** — even if generous, developers need to know the ceiling to architect correctly.

4. **Add a `reason` field for null prices** — "insufficient liquidity", "token delisted", "price feed unavailable" would help builders display honest information to users instead of silent $0.

5. **Surface AI tools in the main docs** — Skills, CLI, Docs MCP should have a dedicated section in the API reference, not just in separate repos. Most builders using AI won't find them otherwise.

6. **Provide a lightweight TypeScript SDK** — even a thin wrapper with types would save every builder from writing the same fetch-and-parse boilerplate. Something like:
   ```typescript
   import { getPrice } from '@jup-ag/price';
   const { price, lastUpdated } = await getPrice('SOL');
   ```

---

## Summary

Jupiter Price API v2 is the easiest part of building on Solana. No auth, no SDK, predictable response — it just works. The gap is in the edges: error transparency, staleness signals, rate limit docs, and AI tooling discoverability. For a product like Nudge where I'm translating raw numbers into human-readable insights, knowing *why* a price is null or *when* it was last updated matters as much as the price itself.

The platform has the right foundation. The developer experience improvements I'd prioritize are all about **giving builders more context** — not more endpoints.
