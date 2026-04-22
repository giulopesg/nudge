/* ── Color data ────────────────────────────── */

export const BRAND_COLORS = [
  { name: 'Primary', var: '--primary', hex: '#A366FF', tw: 'text-primary', usage: 'Brand, buttons, primary actions, links' },
  { name: 'Primary Hover', var: '--primary-hover', hex: '#B87AFF', tw: 'text-primary-hover', usage: 'Hover states for primary elements' },
  { name: 'Primary Muted', var: '--primary-muted', hex: 'rgba(163,102,255,0.12)', tw: 'bg-primary-muted', usage: 'Subtle backgrounds, tags, pills' },
  { name: 'Primary Glow', var: '--primary-glow', hex: 'rgba(163,102,255,0.3)', tw: 'shadow-primary-glow', usage: 'Box-shadow glow effects' },
];

export const SECONDARY_COLORS = [
  { name: 'Rose (Plum)', var: '--plum', hex: '#FF6B9D', tw: 'text-plum', usage: 'Secondary actions, accents, feminine touch' },
  { name: 'Rose Light', var: '--plum-light', hex: '#FF8DB5', tw: 'text-plum-light', usage: 'Light variant for hover states' },
  { name: 'Rose Muted', var: '--plum-muted', hex: 'rgba(255,107,157,0.15)', tw: 'bg-plum-muted', usage: 'Subtle backgrounds for rose elements' },
  { name: 'Mint', var: '--mint', hex: '#3DDBA4', tw: 'text-mint', usage: 'Accent, health indicators, fresh vibes' },
];

export const STATUS_COLORS = [
  { name: 'Safe', var: '--safe', hex: '#2ED88A', tw: 'text-safe', usage: 'Health Factor OK, positive status' },
  { name: 'Attention', var: '--attention', hex: '#F5A623', tw: 'text-attention', usage: 'Warning, approaching threshold' },
  { name: 'Danger', var: '--danger', hex: '#FF4D6A', tw: 'text-danger', usage: 'Critical, liquidation risk' },
  { name: 'XP', var: '--xp', hex: '#B57AFF', tw: 'text-xp', usage: 'Experience points, RPG progression' },
];

export const SURFACE_COLORS = [
  { name: 'Background', var: '--background', hex: '#07050E', tw: 'bg-background', usage: 'Page background, deep void' },
  { name: 'Surface', var: '--surface', hex: 'rgba(255,248,245,0.03)', tw: 'bg-surface', usage: 'Card/component backgrounds' },
  { name: 'Surface Hover', var: '--surface-hover', hex: 'rgba(255,248,245,0.06)', tw: 'bg-surface-hover', usage: 'Hovered card backgrounds' },
  { name: 'Surface Border', var: '--surface-border', hex: 'rgba(163,102,255,0.10)', tw: 'border-surface-border', usage: 'Subtle borders on cards and containers' },
];

export const TEXT_COLORS = [
  { name: 'Foreground', var: '--foreground', hex: 'rgba(255,248,240,0.92)', tw: 'text-foreground', usage: 'Primary text, high emphasis' },
  { name: 'Secondary', var: '--text-secondary', hex: 'rgba(255,248,240,0.72)', tw: 'text-text-secondary', usage: 'Body text, descriptions' },
  { name: 'Muted', var: '--text-muted', hex: 'rgba(255,248,240,0.48)', tw: 'text-text-muted', usage: 'Labels, captions, low emphasis' },
];

/* ── Typography data ───────────────────────── */

export const FONTS = [
  {
    name: 'Lora',
    role: 'Display / Titles',
    variable: '--font-lora',
    twClass: 'font-display',
    weights: ['400', '500', '600', '700'],
    sizes: [15, 17, 20, 24, 28, 36, 42],
    sample: 'Blockchain is freedom',
    usage: 'Headings, section titles, card headers, navigation labels. Warm serif that gives personality.',
  },
  {
    name: 'Agbalumo',
    role: 'Accent / Playful',
    variable: '--font-cormorant',
    twClass: 'font-accent',
    weights: ['400'],
    sizes: [14, 17, 20, 24, 32],
    sample: 'by Giuliana',
    usage: 'Bylines, taglines, hero accents, emotional moments. Playful and warm.',
  },
  {
    name: 'Outfit',
    role: 'UI / Sans-serif',
    variable: '--font-outfit',
    twClass: 'font-sans',
    weights: ['300', '400', '500', '600', '700'],
    sizes: [12, 13, 14, 15, 16],
    sample: 'Your DeFi companion on Solana',
    usage: 'Body text, button labels, form inputs, general UI. Clean and readable.',
  },
  {
    name: 'Fira Code',
    role: 'Mono / Technical',
    variable: '--font-fira-code',
    twClass: 'font-mono',
    weights: ['400', '500', '600'],
    sizes: [10, 11, 12, 13, 14],
    sample: '0x1A2b...3C4d',
    usage: 'Wallet addresses, stats, badges, status labels, technical data. Monospace precision.',
  },
];

/* ── Spacing data ──────────────────────────── */

export const SPACING = [4, 8, 12, 16, 20, 24, 32, 48, 64];

/* ── Radius data ───────────────────────────── */

export const RADII = [
  { name: 'sm', var: '--radius-sm', value: '8px', usage: 'Small elements, tags, inputs' },
  { name: 'md', var: '--radius-md', value: '12px', usage: 'Cards, buttons, medium containers' },
  { name: 'lg', var: '--radius-lg', value: '16px', usage: 'Large cards, modals, hero sections' },
  { name: 'full', var: '--radius-full', value: '9999px', usage: 'Pills, badges, circular elements' },
];

/* ── Shadow data ───────────────────────────── */

export const GLOWS = [
  { name: 'Primary Glow', cls: 'glow-primary', css: '0 0 20px var(--primary-glow), inset 0 0 20px rgba(163,102,255,0.05)' },
  { name: 'Rose Glow', cls: 'glow-plum', css: '0 0 20px var(--plum-glow), inset 0 0 20px rgba(255,107,157,0.05)' },
  { name: 'Safe Glow', cls: 'glow-safe', css: '0 0 16px var(--safe-glow)' },
  { name: 'Attention Glow', cls: 'glow-attention', css: '0 0 16px var(--attention-glow)' },
  { name: 'Danger Glow', cls: 'glow-danger', css: '0 0 16px var(--danger-glow)' },
  { name: 'XP Glow', cls: 'glow-xp', css: '0 0 20px var(--xp-glow), inset 0 0 20px rgba(181,122,255,0.05)' },
];

export const ANIMATIONS = [
  { name: 'Gradient Shift', cls: 'n2-gradient-text', desc: 'Animated gradient text (primary -> rose -> mint), 6s loop', sample: 'gradient' as const },
  { name: 'Pulse Glow', cls: 'animate-pulse-glow', desc: 'Breathing opacity (0.6 -> 1), 2s loop', sample: 'box' as const },
  { name: 'Float', cls: 'animate-float', desc: 'Gentle vertical float (-6px), 3s loop', sample: 'box' as const },
  { name: 'Shimmer', cls: 'animate-shimmer', desc: 'Background shimmer sweep, 2s loop', sample: 'box' as const },
  { name: 'Breathe', cls: 'n2-animate-breathe', desc: 'Opacity breathing (0.8 -> 1), 4s loop. Used on danger hero.', sample: 'box' as const },
];
