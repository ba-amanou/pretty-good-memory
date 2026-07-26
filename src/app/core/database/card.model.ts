export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Card {
  id: number;
  deckId: number;
  question: string;
  answer: string;
  difficulty: Difficulty;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: string;
  lastReviewDate?: string;
}

export type NewCard = Omit<Card, 'id'>;

export const INITIAL_EASE_FACTOR: Record<Difficulty, number> = {
  easy: 2.6,
  medium: 2.5,
  hard: 2.3,
}