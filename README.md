# Pretty Good Memory
 
A spaced repetition flashcard app inspired by the SM-2 algorithm (Anki-style), built with Angular.
 
## Why this project
 
This is a personal project with two goals:
 
1. **Practice Angular 22** after a backend-focused project on hexagonal architecture with Spring Boot in [`banking-kata-hexagonal`](https://github.com/ba-amanou/banking-kata-hexagonal). The app is used as a playground to work with standalone components, signals, and modern Angular patterns without the crutch of a backend.
2. **Have a tool I actually use daily** mainly to revise for technical interviews (Spring Boot, Angular, ...) and to memorize other topics using spaced repetition.
 
## Features
 
- **Decks**: freely created thematic containers (e.g. "English vocabulary", "Spring Boot").
- **Cards**: belong to a deck, contain a question, an answer, and a difficulty level (`easy` / `medium` / `hard`).
- **Spaced repetition algorithm**: a simplified SM-2, with per-card `easeFactor`, `interval`, `repetitions`, and `nextReviewDate`. Review ratings: *Again / Hard / Good / Easy*.

## Tech stack
 
- **Angular** (standalone components, signals for state — no NgRx, considered overkill for this scope)
- **Dexie.js** on top of IndexedDB for local persistence
- No backend for now, the data model is designed to stay compatible with a future Spring Boot backend if needed later
- TypeScript in `strict` mode

## Getting started
 
```bash
npm install
npm start
```
 
The app will be available at `http://localhost:4200`.
> Currently, the app is used **locally only** (`ng serve`)
 
## Project structure
 
```
src/app/
├── core/       # singleton services, guards, interceptors
├── features/   # feature screens (decks, cards, review, ...)
└── shared/     # reusable components, pipes, directives
```
 
## Roadmap
 
Development is split into iterations, each with a single goal and a working app at the end. See [`TODO.md`](TODO.md) for the detailed, checkable list.
 
| # | Iteration | Content |
|---|---|---|
| 1 | Project setup + Git | Angular project, routing, strict mode, folder structure |
| 2 | Documentation | README, docs, TODO |
| 3 | App Shell | Layout, navigation, styles |
| 4 | Decks CRUD | Model, Dexie table, service, list + form screens |
| 5 | Cards CRUD | Model, Dexie table, service, list + form screens |
| 6 | SM-2 algorithm | Isolated, unit-tested review algorithm service |
| 7 | Review screen | Full review session, flip card, rating, rhythm timeline |
| 8 | Export / Import | Manual JSON backup + AI-generated card import with preview |

## License

Personnal project, no license specified yet.