import { Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { CardsService } from './cards.service';
import { DecksService } from '../decks/decks.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { Card } from '../../core/database/card.model';
import { Icon } from '../../shared/icon/icon';
import { RouterLink } from '@angular/router';
import { Deck } from '../../core/database/deck.model';
import { CardForm } from './card-form/card-form';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';

type DeckState = 
  | { status:'loading' } 
  | { status:'missing' } 
  | { status:'found'; deck: Deck };

@Component({
  selector: 'app-cards',
  imports: [RouterLink, CardForm, ConfirmDialog, Icon],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards {
  readonly id = input.required<string>();

  private cardsService = inject(CardsService);
  private decksService = inject(DecksService);

  private deckId = computed(() => Number(this.id()));
  private deckId$ = toObservable(this.deckId);

  private cardForm = viewChild.required<CardForm>('cardFormDialog');
  private confirmDialog = viewChild.required<ConfirmDialog>('deleteDialog');

  private cardToDelete = signal<Card | null>(null);
  
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

  protected openCreate(): void {
    this.cardForm().open();
  }

  protected openEdit(card: Card): void {
    this.cardForm().open(card);
  }

  protected askDelete(card: Card): void {
    this.cardToDelete.set(card);
    this.confirmDialog().open();
  }

  protected async onDeleteConfirmed(): Promise<void> {
    const card = this.cardToDelete();
    if (!card) return;
    await this.cardsService.delete(card.id);
    this.cardToDelete.set(null);
  }
}
