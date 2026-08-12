import { Component, inject, input } from '@angular/core';
import { CardsService } from '../cards.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-card-count',
  template: `{{ count() }} {{ count() === 1 ? 'card' : 'cards' }}`,
  styles: `
    :host {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.02rem;
      color: var(--color-text-on-paper);
      opacity: 0.55;
    }
  `,
})
export class CardCount {
  deckId = input.required<number>();

  private cardsService = inject(CardsService);

  protected count = toSignal(
    toObservable(this.deckId).pipe(
      switchMap((deckId) => this.cardsService.observeCountByDeck(deckId)),
    ),
    { initialValue: 0 },
  );
}
