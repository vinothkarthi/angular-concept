/* main.ts is the entry point for the Angular application. It bootstraps the application and configures it with the necessary providers and settings.its read by the Angular CLI and executed by the browser before the application is initialized. these providers are used to configure the application's behavior and functionality before the application is initialized. */

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
    provideStoreDevtools({ logOnly: !isDevMode() }), // logOnly: !isDevMode() is used to enable the Redux DevTools extension in development mode only. it prevents the extension from being used in production mode, which can be a security risk. it ensures that the DevTools extension is only available when the application is running in development mode, where it can be used for debugging and testing purposes.

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

const config: ApplicationConfig = {
  providers: [
    ...(appConfig.providers ?? []),
    ...(extraConfig.providers ?? []),
  ],
};


bootstrapApplication(
  AppComponent,
  config
).catch(console.error);
