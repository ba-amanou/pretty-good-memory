import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';
import { NewCard } from '../../core/database/card.model';
import { db } from '../../core/database/db';

describe('CardsService', () => {
  let service: CardsService;

  const newCard = (deckId: number, question: string): NewCard => ({
    deckId,
    question,
    answer: 'An answer',
    difficulty: 'medium',
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReviewDate: '2026-01-01',
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsService);
    await db.cards.clear();
  });

  it('should be support the full card lifecycle', async () => {
    const id = await service.create(newCard(1, 'What is a signal?'));
    expect(await service.getById(id)).toEqual(
      expect.objectContaining({ deckId: 1, question: 'What is a signal?' }),
    );

    await service.update(id, { difficulty: 'hard' });
    expect((await service.getById(id))?.difficulty).toBe('hard');

    await service.delete(id);
    expect(await service.getById(id)).toBeUndefined();
  });

  it('should scope cards to their deck', async () => {
    await service.create(newCard(1, 'First'));
    await service.create(newCard(1, 'Second'));
    await service.create(newCard(2, 'Other deck'));

    expect(await db.cards.where('deckId').equals(1).count()).toBe(2);
    expect(await db.cards.where('deckId').equals(2).count()).toBe(1);
  });
});
