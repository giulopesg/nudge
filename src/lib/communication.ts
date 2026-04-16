// ── Communication profile engine ────────────────────────────────────
// Maps neurotags to 4 communication profiles via weighted scoring.

import type { NeurotageId } from './neurotags';

export type CommProfile = 'gentle' | 'encouraging' | 'direct' | 'technical';

// ── Weight table ────────────────────────────────────────────────────
// Each neurotag contributes points to one or more profiles.
// resolveCommProfile picks the profile with the highest total.

const NEUROTAG_WEIGHTS: Record<NeurotageId, Partial<Record<CommProfile, number>>> = {
  // Autonomy spectrum
  'delegadora':           { gentle: 3, encouraging: 1 },
  'semi-autonoma':        { encouraging: 2, direct: 2 },
  'autonoma-inicial':     { direct: 2, technical: 3 },

  // Pressure response
  'indecisa-sob-pressao': { gentle: 4 },
  'calma-sob-pressao':    { technical: 3, direct: 1 },
  'reativa':              { gentle: 3, encouraging: 1 },

  // Attention
  'negligente':           { gentle: 2, encouraging: 2 },
  'atenta':               { direct: 2, technical: 1 },

  // Knowledge
  'iniciante':            { gentle: 2, encouraging: 3 },
  'intermediaria':        { direct: 3, technical: 1 },
  'avessa-a-jargao':      { gentle: 4 },

  // Goals
  'curiosa':              { encouraging: 3, direct: 1 },
  'exploradora':          { direct: 2, technical: 2 },
  'quer-seguranca':       { gentle: 2, encouraging: 2 },
};

const ALL_PROFILES: CommProfile[] = ['gentle', 'encouraging', 'direct', 'technical'];

/**
 * Resolve the communication profile from a set of neurotags.
 * Sums weighted scores per profile and returns the highest.
 * Falls back to 'encouraging' if no tags provided.
 */
export function resolveCommProfile(tags: NeurotageId[]): CommProfile {
  if (tags.length === 0) return 'encouraging';

  const scores: Record<CommProfile, number> = {
    gentle: 0,
    encouraging: 0,
    direct: 0,
    technical: 0,
  };

  for (const tag of tags) {
    const weights = NEUROTAG_WEIGHTS[tag];
    if (!weights) continue;
    for (const profile of ALL_PROFILES) {
      scores[profile] += weights[profile] ?? 0;
    }
  }

  // Find highest score. Tie-break order: gentle > encouraging > direct > technical
  let best: CommProfile = 'encouraging';
  let bestScore = -1;

  for (const profile of ALL_PROFILES) {
    if (scores[profile] > bestScore) {
      bestScore = scores[profile];
      best = profile;
    }
  }

  return best;
}

/**
 * Get the i18n suffix for a message key based on comm profile.
 * Usage: t(`hero.score.${zone}.title.${commSuffix(profile)}`)
 */
export function commSuffix(profile: CommProfile): string {
  return profile;
}
