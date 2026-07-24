import { Component, inject, viewChild } from '@angular/core';
import { DecksService } from './decks.service';
import { RouterLink } from '@angular/router';
import { DeckForm } from './deck-form/deck-form';
import { Deck } from '../../core/database/deck.model';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-decks',
  imports: [RouterLink, DeckForm, Icon],
  templateUrl: './decks.html',
  styleUrl: './decks.scss',
})
export class Decks {
  private decksService = inject(DecksService);
  decks = this.decksService.decks;

  private deckForm = viewChild.required<DeckForm>('deckFormDialog');

  openCreate(): void {
    this.deckForm().open();
  }

  openEdit(deck: Deck): void {
    this.deckForm().open(deck);
  }
}
