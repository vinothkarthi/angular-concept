import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffect } from './app/effect/user.effect';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './app/reducer/user.reducer';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HeadersInterceptor, ErrorInterceptor } from './app/interceptor/error-handler.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ReactiveFormsModule, StoreModule.forRoot({ user: userReducer }), EffectsModule.forRoot([UserEffect]), StoreDevtoolsModule.instrument({
            logOnly: !isDevMode()
        })),
        {
            provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
        },
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));
