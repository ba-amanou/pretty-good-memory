import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecksService } from '../decks.service';
import type { Deck } from '../../../core/database/deck.model';

@Component({
  selector: 'app-deck-form',
  imports: [ReactiveFormsModule],
  templateUrl: './deck-form.html',
  styleUrl: './deck-form.scss',
})
export class DeckForm {
  private fb = inject(FormBuilder);
  private decksService = inject(DecksService);

  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');
  private editingId = signal<number | null>(null);
  isEditMode = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
  });

  open(deck: Deck | null = null): void {
    if (deck) {
      this.editingId.set(deck.id);
      this.isEditMode.set(true);
      this.form.reset({ name: deck.name, description: deck.description ?? '' });
    } else {
      this.editingId.set(null);
      this.isEditMode.set(false);
      this.form.reset({ name: '', description: '' });
    }
    this.dialog().nativeElement.showModal();
  }

  private close(): void {
    this.dialog().nativeElement.close();
  }

  async save(): Promise<void> {
    if (this.form.invalid) return;

    const { name, description } = this.form.getRawValue();
    const id = this.editingId();

    if (id !== null) {
      await this.decksService.update(id, { name, description });
    } else {
      await this.decksService.create({ name, description });
    }

    this.close();
  }

  cancel(): void {
    this.close();
  }
}