import { Service } from '@angular/core';
import { db } from '../../core/database/db';
import { Card, NewCard } from '../../core/database/card.model';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';

@Service()
export class CardsService {
  observeByDeck(deckId: number): Observable<Card[]> {
    return from(liveQuery(() => db.cards.where('deckId').equals(deckId).toArray()));
  }

  observeCountByDeck(deckId: number): Observable<number> {
    return from(liveQuery(() => db.cards.where('deckId').equals(deckId).count()));
  }

  getById(id: number): Promise<Card | undefined> {
    return db.cards.get(id);
  }

  create(card: NewCard): Promise<number> {
    return db.cards.add(card);
  }

  update(id: number, changes: Partial<Card>): Promise<number> {
    return db.cards.update(id, changes);
  }

  delete(id:number): Promise<void> {
    return db.cards.delete(id);
  }
}
