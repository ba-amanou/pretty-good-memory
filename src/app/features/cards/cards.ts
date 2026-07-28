import { Component, computed, inject, input } from '@angular/core';
import { CardsService } from './cards.service';
import { DecksService } from '../decks/decks.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { Card } from '../../core/database/card.model';
import { Icon } from '../../shared/icon/icon';
import { RouterLink } from '@angular/router';
import { Deck } from '../../core/database/deck.model';

type DeckState = 
  | { status:'loading' } 
  | { status:'missing' } 
  | { status:'found'; deck: Deck };

@Component({
  selector: 'app-cards',
  imports: [RouterLink, Icon],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards {
  readonly id = input.required<string>();

  private cardsService = inject(CardsService);
  private decksService = inject(DecksService);

  private deckId = computed(() => Number(this.id()));
  private deckId$ = toObservable(this.deckId);
  
  protected deckState = toSignal(
    this.deckId$.pipe(
      switchMap((deckId) => this.decksService.observeById(deckId)),
      map((deck) : DeckState => ( deck ? { status: 'found', deck } : { status: 'missing'})),
    ),
    { initialValue: { status : 'loading'} },
  )

  protected cards = toSignal(
    this.deckId$.pipe(switchMap((deckId) => this.cardsService.observeByDeck(deckId))),
    { initialValue: [] as Card[] }
  )
}
