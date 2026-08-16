import { TestBed } from '@angular/core/testing';
import { DecksService } from './decks.service';
import { db } from '../../core/database/db';
import { NewCard } from '../../core/database/card.model';

describe('DecksService', () => {
  let service: DecksService;

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
    service = TestBed.inject(DecksService);
    await db.decks.clear();
    await db.cards.clear();
  });

  it('should support the full deck lifecycle', async () => {
    const id = await service.create({ name: 'Angular' });
    expect(await service.getById(id)).toEqual(expect.objectContaining({ name: 'Angular' }));

    await service.update(id, { name: 'Updated' });
    expect((await service.getById(id))?.name).toBe('Updated');

    await service.delete(id);
    expect(await service.getById(id)).toBeUndefined();
  });

  it('should delete the cards of a deck along with it', async () => {
    const deckId = await service.create({ name: 'Angular' });
    const otherDeckId = await service.create({ name: 'RxJs' });

    await db.cards.bulkAdd([
      newCard(deckId, 'First'),
      newCard(deckId, 'Second'),
      newCard(otherDeckId, 'Untouched'),
    ]);

    await service.delete(deckId);

    expect(await service.getById(deckId)).toBeUndefined();
    expect(await db.cards.where('deckId').equals(deckId).count()).toBe(0);
    expect(await db.cards.where('deckId').equals(otherDeckId).count()).toBe(1);
  });
});
