import { Component, computed, input } from '@angular/core';

export type IconName = 'pencil' | 'trash' | 'close';

const ICON_PATHS: Record<IconName, string> = {
  pencil: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z M15 5l4 4',
  trash: 'M3 6h18 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6',
  close: 'M18 6 6 18 M6 6l12 12',
};

@Component({
  selector: 'app-icon',
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path [attr.d]="path()" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
    }
    svg {
      width: var(--icon-size, 1.125rem);
      height: var(--icon-size, 1.125rem);
    }
  `,
})
export class Icon {
  name = input.required<IconName>();
  path = computed(() => ICON_PATHS[this.name()]);
}
