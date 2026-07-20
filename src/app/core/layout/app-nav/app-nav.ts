import { Component } from '@angular/core';
import { NAV_ITEMS } from '../nav-items';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-nav.html',
  styleUrl: './app-nav.scss',
})
export class AppNav {
  protected readonly navItems = NAV_ITEMS;
}
