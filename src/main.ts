import { bootstrapApplication } from '@angular/platform-browser';
import {
  APP_INITIALIZER,
  importProvidersFrom,
  isDevMode,
  ApplicationConfig,
  mergeApplicationConfig,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { ConfigService } from './app/service/config.service';
import {
  HeadersInterceptor,
  ErrorInterceptor,
} from './app/interceptor/error-handler.interceptor';

// NgRx
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './app/reducer/user.reducer';
import { UserEffect } from './app/effects/user.effects';

function appInitializerFactory(configService: ConfigService) {
  return () => configService.loadAppConfig(); // must return Promise or void
}

const extraConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(FormsModule, ReactiveFormsModule),

    // NgRx
    provideStore({ user: userReducer }),
    provideEffects([UserEffect]),
    provideStoreDevtools({ logOnly: !isDevMode() }),

    // HttpClient (with fetch + interceptors)
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // Config initializer
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [ConfigService],
      multi: true,
    },
  ],
};

// 👇 merge appConfig (router + hydration) with extraConfig (forms, http, ngrx, interceptors, etc.)
bootstrapApplication(
  AppComponent,
  mergeApplicationConfig(appConfig, extraConfig)
).catch((err) => console.error(err));
