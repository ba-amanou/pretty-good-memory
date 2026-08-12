import { Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { liveQuery } from 'dexie';
import { Deck, NewDeck } from '../../core/database/deck.model';
import { db } from '../../core/database/db';
import { from, Observable } from 'rxjs';

@Service()
export class DecksService {
  decks = toSignal(from(liveQuery(() => db.decks.toArray())), { initialValue: [] as Deck[] });

  observeById(id: number): Observable<Deck | undefined> {
    return from(liveQuery(() => db.decks.get(id)));
  }

  getById(id: number): Promise<Deck | undefined> {
    return db.decks.get(id);
  }

  create(deck: NewDeck): Promise<number> {
    return db.decks.add(deck);
  }

  update(id: number, changes: Partial<Deck>): Promise<number> {
    return db.decks.update(id, changes);
  }

  delete(id: number): Promise<void> {
    return db.transaction('rw', db.decks, db.cards, async () => {
      await db.cards.where('deckId').equals(id).delete();
      await db.decks.delete(id);
    });
  }
}
