import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // 🔥 MUST be here for standalone route reloads
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    provideClientHydration(), // keep only if SSR/hydration is used
  ],
};
