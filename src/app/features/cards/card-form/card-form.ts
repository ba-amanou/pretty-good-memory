import { Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardsService } from '../cards.service';
import { Card, Difficulty, INITIAL_EASE_FACTOR } from '../../../core/database/card.model';
import { todayIso } from '../../../core/date/today-iso';

@Component({
  selector: 'app-card-form',
  imports: [ReactiveFormsModule],
  templateUrl: './card-form.html',
  styleUrl: './card-form.scss',
})
export class CardForm {
  deckId = input.required<number>();

  private fb = inject(FormBuilder);
  private cardsService = inject(CardsService);

  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');
  private questionField = viewChild.required<ElementRef<HTMLTextAreaElement>>('questionEl');
  private editing = signal<Card | null>(null);
  isEditMode = signal(false);

  form = this.fb.nonNullable.group({
    question: ['', Validators.required],
    answer: ['', Validators.required],
    difficulty: ['medium' as Difficulty, Validators.required],
  });

  open(card: Card | null = null): void {
    this.editing.set(card);
    this.isEditMode.set(card != null);
    this.form.reset(
      card
        ? { question: card.question, answer: card.answer, difficulty: card.difficulty }
        : { question: '', answer: '', difficulty: 'medium' },
    );
    this.dialog().nativeElement.showModal();
  }

  async save(): Promise<void> {
    if (this.form.invalid) return;
    await this.persist();
    this.close();
  }

  async saveAndAddAnother(): Promise<void> {
    if (this.form.invalid) return;
    await this.persist();
    this.form.reset({ question: '', answer: '', difficulty: 'medium' });
    this.questionField().nativeElement.focus();
  }

  cancel(): void {
    this.close();
  }

  private async persist(): Promise<void> {
    const { question, answer, difficulty } = this.form.getRawValue();
    const card = this.editing();

    if (card) {
      const changes: Partial<Card> = { question, answer, difficulty };
      if (card.repetitions === 0) {
        changes.easeFactor = INITIAL_EASE_FACTOR[difficulty];
      }
      await this.cardsService.update(card.id, changes);
    } else {
      await this.cardsService.create({
        deckId: this.deckId(),
        question,
        answer,
        difficulty,
        easeFactor: INITIAL_EASE_FACTOR[difficulty],
        interval: 0,
        repetitions: 0,
        nextReviewDate: todayIso(),
      });
    }
  }

  private close(): void {
    this.dialog().nativeElement.close();
  }
}
