TODO

Tracked by iteration. One goal per iteration, app stays functional at the end of each one.

## Iteration 1 - Project setup + Git

- [x] Init Git repository
- [x] Angular project (standalone, routing, strict mode)
- [x] `.gitattributes` for consistent line endings
- [x] Folder structure convention decided (`core/`, `features/`, `shared/` - created on demand, not upfront)
- [x] First commit
- [x] Public GitHub repo created and pushed

## Iteration 2 - Documentation

- [x] `README.md` (context, stack, getting started)
- [x] `TODO.md`
- [x] Commit + push

## Iteration 3 — App shell & navigation

- [x] Base routing (`/decks`, `/decks/:id/cards`, default route)
- [x] App layout (header + content area)
- [x] Navigation menu - top horizontal nav (desktop), bottom nav (mobile)
- [x] Global styles: palette variables (ink/paper/gold + rating gradient), base typography setup (Fraunces/Inter/IBM Plex Mono)
- [x] Responsive check (mobile + desktop)
- [x] Commit + push

## Iteration 4 - Decks CRUD

- [x] `Deck` model + Dexie table
- [x] `DecksService` (Dexie access via `liveQuery`, signals-based state)
- [x] Deck list screen
- [x] Shared `ConfirmDialog` component (native `<dialog>`, reusable across features)
- [x] Shared `Icon` component (centralized SVG icon set)
- [x] Deck form (create/edit) implemented as a modal (`<dialog>`) rather than a dedicated route, opened from the list screen
- [x] Delete Deck (with confirmation, via `ConfirmDialog`)
- [x] Responsive check (mobile + desktop)
- [x] Commit + push

## Iteration 5 - Cards CRUD

- [x] `Card` model + Dexie table (with `difficulty`)
- [x] `CardService`
- [x] Card list screen for a Deck, with difficulty badge
- [x] Card form (create/edit) as modal
- [x] Delete card
- [x] Deleting a deck cascades to its cards
- [x] Card count on deck tiles
- [x] Responsive check (mobile + desktop)
- [x] Commit + push

## Iteration 6 - SM-2 algorithm

- [ ] `ReviewAlgoService` (isolated, no UI dependency)
- [ ] Unit tests (`ng test`) covering Again / Hard / Good / Easy transitions
- [ ] Commit + push

## Iteration 7 - Review screen

- [ ] Query cards due for review (`nextReviewDate <= today`)
- [ ] Flip question/answer interaction
- [ ] Rating buttons (Again / Hard / Good / Easy)
- [ ] Rhythm timeline (J+1/J+7/J+16/J+35/J+70)
- [ ] Full session flow (empty state handled)
- [ ] Responsive check (mobile + desktop)
- [ ] Commit + push

## Iteration 8 - Export / Import

- [ ] Manual JSON export
- [ ] Manual JSON import (restore)
- [ ] AI-generated card import: define JSON schema
- [ ] Import preview screen (select/deselect before commit)
- [ ] `navigator.storage.persist()` request
- [ ] Commit + push

## Backlog / not scheduled

- [ ] Security layer before any public (non-local) hosting
- [ ] Remote hosting (Vercel / Netlify / Cloudflare Pages)
- [x] Prettier config
- [x] Run Prettier across the whole repo
- [ ] ESLint config
- [x] Migrate hardcoded SVGs in `AppNav` to the shared `Icon` component
- [x] Extract the hardcoded border color in `app-nav.scss` into a token
- [x] Pin exact dependency versions (currently using `^`)
- [ ] Consider `rxResource` to replace the manual `toObservable`/`switchMap`/`toSignal` pipeline
- [ ] Search/filter within a deck (useful past ~50 cards)
- [ ] Move a card to another deck
