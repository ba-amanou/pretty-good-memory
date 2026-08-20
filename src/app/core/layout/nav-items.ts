export interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly icon: 'folder' | 'refresh' | 'download';
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Decks', path: '/decks', icon: 'folder' },
  { label: 'Review', path: '/review', icon: 'refresh' },
  { label: 'Export/Import', path: '/backup', icon: 'download' },
];
