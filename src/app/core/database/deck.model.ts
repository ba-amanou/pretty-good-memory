export interface Deck {
    id: number;
    name: string;
    description?: string;
}

export type NewDeck = Omit<Deck, 'id'>;