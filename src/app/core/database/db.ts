import Dexie, { EntityTable } from "dexie";
import { Deck } from "./deck.model";

export class PrettyGoodMemoryDatabase extends Dexie {
    decks!: EntityTable<Deck, 'id'>

    constructor() {
        super('PrettyGoodMemoryDatabase');
        this.version(1).stores({
            decks: '++id, name',
        });
    }
}

export const db = new PrettyGoodMemoryDatabase();