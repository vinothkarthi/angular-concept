import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig, importProvidersFrom, isDevMode, mergeApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { ConfigService } from './app/service/config.service';

// NgRx
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './app/reducer/user.reducer';
import { UserEffect } from './app/effects/user.effects';

import {
  HeadersInterceptor,
  ErrorInterceptor,
} from './app/interceptor/error-handler.interceptor';

function appInitializerFactory(configService: ConfigService) {
  return () => configService.loadAppConfig();
}

const extraConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(FormsModule, ReactiveFormsModule),

    // NgRx
    provideStore({ user: userReducer }),
    provideEffects([UserEffect]),
    provideStoreDevtools({ logOnly: !isDevMode() }),

    // Interceptors ONLY (HttpClient already provided in appConfig)
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // App initializer
    provideAppInitializer(() => {
        const initializerFn = (appInitializerFactory)(inject(ConfigService));
        return initializerFn();
      }),
  ],
};

bootstrapApplication(
  AppComponent,
  mergeApplicationConfig(appConfig, extraConfig)
).catch(console.error);
