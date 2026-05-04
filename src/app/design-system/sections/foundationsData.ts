/* ── Primitive color data (raw palette — never use directly in components) ── */

export const PRIMITIVE_COLORS = [
  { name: 'void/950', var: '--p-void-950', hex: '#07050E', usage: 'Darkest background' },
  { name: 'void/900', var: '--p-void-900', hex: '#0D0B15', usage: 'Elevated background (modals)' },
  { name: 'cream/50', var: '--p-cream-50', hex: '#FFF8F0', usage: 'Warm white base (text)' },
  { name: 'cream/100', var: '--p-cream-100', hex: '#FFF8F5', usage: 'Warm white base (surfaces)' },
  { name: 'orchid/500', var: '--p-orchid-500', hex: '#A366FF', usage: 'Brand primary' },
  { name: 'orchid/400', var: '--p-orchid-400', hex: '#B87AFF', usage: 'Brand primary hover / XP' },
  { name: 'rose/500', var: '--p-rose-500', hex: '#FF6B9D', usage: 'Secondary rose' },
  { name: 'rose/400', var: '--p-rose-400', hex: '#FF8DB5', usage: 'Secondary rose hover' },
  { name: 'mint/500', var: '--p-mint-500', hex: '#3DDBA4', usage: 'Accent mint' },
  { name: 'emerald/500', var: '--p-emerald-500', hex: '#2ED88A', usage: 'Status safe' },
  { name: 'amber/500', var: '--p-amber-500', hex: '#F5A623', usage: 'Status attention' },
  { name: 'coral/500', var: '--p-coral-500', hex: '#FF4D6A', usage: 'Status danger' },
];

/* ── Semantic color data (what components consume) ──────────────────────── */

export const BRAND_COLORS = [
  { name: 'Primary', var: '--primary', hex: '#A366FF', tw: 'text-primary', usage: 'Brand, buttons, primary actions, links', primitive: 'orchid/500' },
  { name: 'Primary Hover', var: '--primary-hover', hex: '#B87AFF', tw: 'text-primary-hover', usage: 'Hover states for primary elements', primitive: 'orchid/400' },
  { name: 'Primary Muted', var: '--primary-muted', hex: 'rgba(163,102,255,0.12)', tw: 'bg-primary-muted', usage: 'Subtle backgrounds, tags, pills', primitive: 'orchid/500', alpha: 0.12 },
  { name: 'Primary Glow', var: '--primary-glow', hex: 'rgba(163,102,255,0.3)', tw: 'shadow-primary-glow', usage: 'Box-shadow glow effects', primitive: 'orchid/500', alpha: 0.3 },
];

export const SECONDARY_COLORS = [
  { name: 'Rose (Plum)', var: '--plum', hex: '#FF6B9D', tw: 'text-plum', usage: 'Secondary actions, accents, feminine touch', primitive: 'rose/500' },
  { name: 'Rose Light', var: '--plum-light', hex: '#FF8DB5', tw: 'text-plum-light', usage: 'Light variant for hover states', primitive: 'rose/400' },
  { name: 'Rose Muted', var: '--plum-muted', hex: 'rgba(255,107,157,0.15)', tw: 'bg-plum-muted', usage: 'Subtle backgrounds for rose elements', primitive: 'rose/500', alpha: 0.15 },
  { name: 'Mint', var: '--mint', hex: '#3DDBA4', tw: 'text-mint', usage: 'Accent, health indicators, fresh vibes', primitive: 'mint/500' },
];

export const STATUS_COLORS = [
  { name: 'Safe', var: '--safe', hex: '#2ED88A', tw: 'text-safe', usage: 'Health Factor OK, positive status', primitive: 'emerald/500' },
  { name: 'Attention', var: '--attention', hex: '#F5A623', tw: 'text-attention', usage: 'Warning, approaching threshold', primitive: 'amber/500' },
  { name: 'Danger', var: '--danger', hex: '#FF4D6A', tw: 'text-danger', usage: 'Critical, liquidation risk', primitive: 'coral/500' },
  { name: 'XP', var: '--xp', hex: '#B87AFF', tw: 'text-xp', usage: 'Experience points, RPG progression', primitive: 'orchid/400' },
];

export const SURFACE_COLORS = [
  { name: 'Background', var: '--background', hex: '#07050E', tw: 'bg-background', usage: 'Page background, deep void', primitive: 'void/950' },
  { name: 'Background Alt', var: '--background-alt', hex: '#0D0B15', tw: 'bg-background-alt', usage: 'Elevated background, modals', primitive: 'void/900' },
  { name: 'Surface', var: '--surface', hex: 'rgba(255,248,245,0.03)', tw: 'bg-surface', usage: 'Card/component backgrounds', primitive: 'cream/100', alpha: 0.03 },
  { name: 'Surface Hover', var: '--surface-hover', hex: 'rgba(255,248,245,0.06)', tw: 'bg-surface-hover', usage: 'Hovered card backgrounds', primitive: 'cream/100', alpha: 0.06 },
  { name: 'Surface Border', var: '--surface-border', hex: 'rgba(163,102,255,0.10)', tw: 'border-surface-border', usage: 'Subtle borders on cards and containers', primitive: 'orchid/500', alpha: 0.1 },
];

export const TEXT_COLORS = [
  { name: 'Foreground', var: '--foreground', hex: 'rgba(255,248,240,0.92)', tw: 'text-foreground', usage: 'Primary text, high emphasis', primitive: 'cream/50', alpha: 0.92 },
  { name: 'Secondary', var: '--text-secondary', hex: 'rgba(255,248,240,0.72)', tw: 'text-text-secondary', usage: 'Body text, descriptions', primitive: 'cream/50', alpha: 0.72 },
  { name: 'Muted', var: '--text-muted', hex: 'rgba(255,248,240,0.48)', tw: 'text-text-muted', usage: 'Labels, captions, low emphasis', primitive: 'cream/50', alpha: 0.48 },
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

export const SPACING = [4, 6, 8, 10, 12, 16, 20, 24, 32, 48, 64];

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
  { name: 'XP Glow', cls: 'glow-xp', css: '0 0 20px var(--xp-glow), inset 0 0 20px rgba(184,122,255,0.05)' },
];

export const ANIMATIONS = [
  { name: 'Gradient Shift', cls: 'n2-gradient-text', desc: 'Animated gradient text (primary -> rose -> mint), 6s loop', sample: 'gradient' as const },
  { name: 'Pulse Glow', cls: 'animate-pulse-glow', desc: 'Breathing opacity (0.6 -> 1), 2s loop', sample: 'box' as const },
  { name: 'Float', cls: 'animate-float', desc: 'Gentle vertical float (-6px), 3s loop', sample: 'box' as const },
  { name: 'Shimmer', cls: 'animate-shimmer', desc: 'Background shimmer sweep, 2s loop', sample: 'box' as const },
  { name: 'Breathe', cls: 'n2-animate-breathe', desc: 'Opacity breathing (0.8 -> 1), 4s loop. Used on danger hero.', sample: 'box' as const },
];
