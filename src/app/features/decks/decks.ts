import { Component, inject, signal, viewChild } from '@angular/core';
import { DecksService } from './decks.service';
import { RouterLink } from '@angular/router';
import { DeckForm } from './deck-form/deck-form';
import { Deck } from '../../core/database/deck.model';
import { Icon } from '../../shared/icon/icon';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-decks',
  imports: [RouterLink, DeckForm, ConfirmDialog, Icon],
  templateUrl: './decks.html',
  styleUrl: './decks.scss',
})
export class Decks {
  private decksService = inject(DecksService);
  decks = this.decksService.decks;

  private deckForm = viewChild.required<DeckForm>('deckFormDialog');
  private deleteDialog = viewChild.required<ConfirmDialog>('deleteDialog');
  private deckToDelete = signal<Deck | null>(null);

  openCreate(): void {
    this.deckForm().open();
  }

  openEdit(deck: Deck): void {
    this.deckForm().open(deck);
  }

  askDelete(deck: Deck): void {
    this.deckToDelete.set(deck);
    this.deleteDialog().open();
  }

  async onDeleteConfirmed(): Promise<void> {
    const deck = this.deckToDelete();
    if (!deck) return;
    await this.decksService.delete(deck.id);
    this.deckToDelete.set(null);
  }
}
