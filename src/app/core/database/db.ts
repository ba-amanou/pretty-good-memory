import Dexie, { EntityTable } from 'dexie';
import { Deck } from './deck.model';
import { Card } from './card.model';

export class PrettyGoodMemoryDatabase extends Dexie {
  decks!: EntityTable<Deck, 'id'>;
  cards!: EntityTable<Card, 'id'>;

  constructor() {
    super('PrettyGoodMemoryDatabase');
    this.version(1).stores({ decks: '++id, name' });
    this.version(2).stores({ cards: '++id, deckId' });
  }
}

export const db = new PrettyGoodMemoryDatabase();
