import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { materialLotReducer } from './store/material-lots/material-lot.reducer';
import { MaterialLotEffects } from './store/material-lots/material-lot.effects';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ materialLots: materialLotReducer }),
    provideEffects([MaterialLotEffects]),
    provideHttpClient(), // Add provideHttpClient to the providers array
  ],
};
