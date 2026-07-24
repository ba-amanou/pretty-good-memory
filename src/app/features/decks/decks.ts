import { Component, inject } from '@angular/core';
import { DecksService } from './decks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-decks',
  imports: [RouterLink],
  templateUrl: './decks.html',
  styleUrl: './decks.scss',
})
export class Decks {
  private decksService = inject(DecksService);
  decks = this.decksService.decks;

}
