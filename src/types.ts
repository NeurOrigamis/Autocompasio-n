export interface UserInfo {
  name: string;
  email: string;
}

export interface SelfCompassionQuestion {
  id: number;
  text: string;
  isReversed: boolean;
  subscale: string;
}

export interface SelfCompassionResults {
  selfKindness: number;
  selfJudgment: number;
  commonHumanity: number;
  isolation: number;
  mindfulness: number;
  overIdentification: number;
  totalScore: number;
}

export interface DassQuestion {
  id: number;
  text: string;
  subscale: 'depression' | 'anxiety' | 'stress';
}

export interface DassResults {
  depression: number;
  anxiety: number;
  stress: number;
  depressionLevel: string;
  anxietyLevel: string;
  stressLevel: string;
}

export type QuestionnaireType = 'self-compassion' | 'dass-21' | null;