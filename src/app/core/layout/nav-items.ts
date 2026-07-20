export interface NavItem {
    readonly label: string;
    readonly path: string;
    readonly icon: 'decks' | 'review' | 'backup';
}

export const NAV_ITEMS: readonly NavItem[] = [
    { label: 'Decks', path: '/decks', icon: 'decks'},
    { label: 'Review', path: '/review', icon: 'review'},
    { label: 'Export/Import', path: '/backup', icon: 'backup'},
];