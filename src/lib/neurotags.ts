export type NeurotageId =
  | 'iniciante'
  | 'delegadora'
  | 'indecisa-sob-pressao'
  | 'negligente'
  | 'avessa-a-jargao'
  | 'quer-seguranca'
  | 'curiosa'
  | 'calma-sob-pressao'
  | 'autonoma-inicial'
  | 'semi-autonoma'
  | 'intermediaria'
  | 'reativa'
  | 'atenta'
  | 'exploradora';

/** Tags that map to Tiers, not visible as personality traits. */
const HIDDEN_TAGS: NeurotageId[] = ['iniciante', 'intermediaria'];

/** Returns only personality traits (filters out tier-mapped tags). */
export function getVisibleTraits(tags: NeurotageId[]): NeurotageId[] {
  return tags.filter((t) => !HIDDEN_TAGS.includes(t));
}

export interface QuizAnswers {
  q1: 'self' | 'other' | 'together';
  q2: 'sell' | 'ask' | 'unsure' | 'hold';
  q3: 'daily' | 'weekly' | 'sometimes' | 'rarely';
  q4: 'knows' | 'heard' | 'noIdea';
  q5: string[]; // multi-select: 'safety' | 'learn' | 'opportunities' | 'monitor'
}

export type GoalId = 'reserva' | 'independencia' | 'aprender' | 'rendimento' | 'remessas';

export interface UserProfile {
  wallet: string;
  neurotags: NeurotageId[];
  answers: QuizAnswers;
  goals?: GoalId[];
  createdAt: string;
}

/**
 * Generate neurotags from quiz answers.
 * Each question maps to one or more tags based on the response.
 */
export function generateNeurotags(answers: QuizAnswers): NeurotageId[] {
  const tags: NeurotageId[] = [];

  // Q1: Wallet setup → autonomy level
  switch (answers.q1) {
    case 'other':
      tags.push('delegadora');
      break;
    case 'together':
      tags.push('semi-autonoma');
      break;
    case 'self':
      tags.push('autonoma-inicial');
      break;
  }

  // Q2: Market reaction → pressure response
  switch (answers.q2) {
    case 'sell':
      tags.push('reativa');
      break;
    case 'ask':
      tags.push('delegadora');
      break;
    case 'unsure':
      tags.push('indecisa-sob-pressao');
      break;
    case 'hold':
      tags.push('calma-sob-pressao');
      break;
  }

  // Q3: Check frequency → attention level
  switch (answers.q3) {
    case 'rarely':
      tags.push('negligente');
      break;
    case 'sometimes':
      // no strong tag
      break;
    case 'weekly':
      tags.push('atenta');
      break;
    case 'daily':
      tags.push('atenta');
      break;
  }

  // Q4: HF knowledge → technical level
  switch (answers.q4) {
    case 'noIdea':
      tags.push('iniciante', 'avessa-a-jargao');
      break;
    case 'heard':
      tags.push('iniciante');
      break;
    case 'knows':
      tags.push('intermediaria');
      break;
  }

  // Q5: Goals → desires (multi-select)
  if (answers.q5.includes('safety')) {
    tags.push('quer-seguranca');
  }
  if (answers.q5.includes('learn')) {
    tags.push('curiosa');
  }
  if (answers.q5.includes('opportunities')) {
    tags.push('exploradora');
  }
  if (answers.q5.includes('monitor')) {
    if (!tags.includes('atenta')) {
      tags.push('atenta');
    }
  }

  // Deduplicate (e.g., delegadora can come from q1 + q2)
  return [...new Set(tags)];
}

/**
 * Returns the list of Nudge actions based on the user's neurotags.
 * These are i18n keys from onboarding.profile.actions.
 */
export function getProfileActions(tags: NeurotageId[]): string[] {
  const actions: string[] = [];

  if (
    tags.includes('iniciante') ||
    tags.includes('avessa-a-jargao')
  ) {
    actions.push('translateAll');
  }

  if (tags.includes('curiosa') || tags.includes('iniciante')) {
    actions.push('teachPace');
  }

  if (tags.includes('delegadora') || tags.includes('semi-autonoma')) {
    actions.push('helpIndependence');
  }

  if (
    tags.includes('negligente') ||
    tags.includes('quer-seguranca') ||
    tags.includes('indecisa-sob-pressao')
  ) {
    actions.push('alertClearly');
  }

  if (tags.includes('exploradora')) {
    actions.push('showOpportunities');
  }

  if (tags.includes('atenta')) {
    actions.push('monitorMarket');
  }

  // Always include at least one action
  if (actions.length === 0) {
    actions.push('translateAll', 'alertClearly');
  }

  return actions;
}
