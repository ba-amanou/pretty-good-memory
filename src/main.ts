import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { isDevMode } from '@angular/core';
import { db, PrettyGoodMemoryDatabase } from './app/core/database/db';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

declare global {
  interface Window {
    db?: PrettyGoodMemoryDatabase;
  }
}

if (isDevMode()) {
  window.db = db;
}
