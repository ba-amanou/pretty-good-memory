import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'decks'},
    {
        path: 'decks',
        loadComponent: () => import('./features/decks/decks').then((m) => m.Decks),
    },
    {
        path: 'decks/:id/cards',
        loadComponent: () => import('./features/cards/cards').then((m) => m.Cards),
    },
    {
        path: 'review',
        loadComponent: () => import('./features/review/review').then((m) => m.Review),
    },
    {
        path: 'backup',
        loadComponent: () => import('./features/backup/backup').then((m) => m.Backup),
    },
    { path: '**', redirectTo: 'decks'}            
];
