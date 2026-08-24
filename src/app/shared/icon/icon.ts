import { Component, computed, input } from '@angular/core';

export type IconName =
  'pencil' | 'trash' | 'close' | 'arrow-left' | 'folder' | 'refresh' | 'download';

const ICON_PATHS: Record<IconName, string> = {
  pencil: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z M15 5l4 4',
  trash:
    'M3 6h18 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6',
  close: 'M18 6 6 18 M6 6l12 12',
  'arrow-left': 'M19 12H5 M12 19l-7-7 7-7',
  folder:
    'M4 10.5a1.5 1.5 0 0 1 1.5-1.5h13a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5Z M7.5 9V7.5A1.5 1.5 0 0 1 9 6h6a1.5 1.5 0 0 1 1.5 1.5V9',
  refresh: 'M19 10.5A7 7 0 1 0 17 16 M19 5v5.5h-4.5',
  download:
    'M12 3.5v9.5 M8 9.5l4 4 4-4 M4.5 16v2.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V16',
};

@Component({
  selector: 'app-icon',
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
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
