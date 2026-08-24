import { Component } from '@angular/core';
import { NAV_ITEMS } from '../nav-items';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../../../shared/icon/icon';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './app-nav.html',
  styleUrl: './app-nav.scss',
})
export class AppNav {
  protected readonly navItems = NAV_ITEMS;
}
