'use client';

interface Props {
  size?: number;
  glow?: 'primary' | 'plum';
  className?: string;
}

/**
 * Humanoid avatar for Lyra — feminine face with cosmic/stellar hair.
 * Pure SVG, no external assets.
 */
export default function LyraAvatar({ size = 56, glow = 'primary', className = '' }: Props) {
  const isPrimary = glow === 'primary';
  const skinTone = '#e8d5c4';
  const hairColor = isPrimary ? '#00D4AA' : '#A366FF';
  const hairGlow = isPrimary ? '#00D4AA' : '#A366FF';
  const eyeColor = isPrimary ? '#00D4AA' : '#A366FF';
  const bgGrad1 = isPrimary ? '#0a1a2e' : '#1a0a2e';
  const bgGrad2 = isPrimary ? '#0e2a1e' : '#2a0e3e';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`rounded-full ${className}`}
      aria-hidden="true"
    >
      {/* Background — deep space */}
      <defs>
        <radialGradient id={`lyra-bg-${glow}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={bgGrad2} />
          <stop offset="100%" stopColor={bgGrad1} />
        </radialGradient>
        <radialGradient id={`lyra-hair-glow-${glow}`} cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor={hairGlow} stopOpacity="0.4" />
          <stop offset="100%" stopColor={hairGlow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="32" r="32" fill={`url(#lyra-bg-${glow})`} />

      {/* Star specks */}
      <circle cx="10" cy="12" r="0.7" fill="#fff" opacity="0.6" />
      <circle cx="52" cy="8" r="0.5" fill="#fff" opacity="0.5" />
      <circle cx="8" cy="38" r="0.6" fill="#fff" opacity="0.4" />
      <circle cx="55" cy="28" r="0.5" fill="#fff" opacity="0.5" />
      <circle cx="14" cy="52" r="0.4" fill="#fff" opacity="0.3" />
      <circle cx="50" cy="50" r="0.5" fill="#fff" opacity="0.3" />

      {/* Hair glow aura */}
      <circle cx="32" cy="26" r="22" fill={`url(#lyra-hair-glow-${glow})`} />

      {/* Hair — flowing cosmic strands */}
      <path
        d="M18 28C16 18 22 10 32 9C42 10 48 18 46 28L48 42C48 48 44 54 38 56L26 56C20 54 16 48 16 42L18 28Z"
        fill={hairColor}
        opacity="0.85"
      />
      {/* Hair highlights */}
      <path
        d="M22 14C26 11 38 11 42 14C40 12 34 10 32 10C30 10 24 12 22 14Z"
        fill="#fff"
        opacity="0.25"
      />
      <path
        d="M17 32C16 26 18 18 24 13"
        stroke="#fff"
        strokeWidth="0.8"
        opacity="0.15"
        strokeLinecap="round"
      />
      <path
        d="M47 32C48 26 46 18 40 13"
        stroke="#fff"
        strokeWidth="0.8"
        opacity="0.15"
        strokeLinecap="round"
      />

      {/* Face shape */}
      <ellipse cx="32" cy="32" rx="12" ry="14" fill={skinTone} />

      {/* Neck */}
      <rect x="28" y="44" width="8" height="6" rx="3" fill={skinTone} />

      {/* Shoulders hint */}
      <path
        d="M22 52C24 48 28 47 32 47C36 47 40 48 42 52"
        stroke={hairColor}
        strokeWidth="2"
        opacity="0.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Eyes */}
      <ellipse cx="27" cy="31" rx="2.5" ry="2" fill="#1a1020" />
      <ellipse cx="37" cy="31" rx="2.5" ry="2" fill="#1a1020" />
      {/* Irises */}
      <circle cx="27.5" cy="31" r="1.2" fill={eyeColor} />
      <circle cx="37.5" cy="31" r="1.2" fill={eyeColor} />
      {/* Eye glints */}
      <circle cx="28" cy="30.3" r="0.5" fill="#fff" opacity="0.9" />
      <circle cx="38" cy="30.3" r="0.5" fill="#fff" opacity="0.9" />

      {/* Eyebrows — soft arches */}
      <path d="M24 27.5C25.5 26.5 28.5 26.5 30 27.5" stroke="#5a3a2a" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      <path d="M34 27.5C35.5 26.5 38.5 26.5 40 27.5" stroke="#5a3a2a" strokeWidth="0.8" strokeLinecap="round" fill="none" />

      {/* Nose — subtle */}
      <path d="M31.5 34L32 36L32.5 34" stroke="#c4a891" strokeWidth="0.6" strokeLinecap="round" fill="none" />

      {/* Gentle smile */}
      <path d="M29 38.5C30.5 40 33.5 40 35 38.5" stroke="#b08870" strokeWidth="0.8" strokeLinecap="round" fill="none" />

      {/* Circlet/tiara — cosmic accessory */}
      <path
        d="M22 24C24 21 28 19 32 19C36 19 40 21 42 24"
        stroke={hairColor}
        strokeWidth="1.2"
        fill="none"
        opacity="0.9"
      />
      {/* Gem on circlet */}
      <circle cx="32" cy="19.5" r="1.8" fill={eyeColor} opacity="0.9" />
      <circle cx="32" cy="19.5" r="0.8" fill="#fff" opacity="0.7" />
    </svg>
  );
}
