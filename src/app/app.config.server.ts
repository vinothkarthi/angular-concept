import { provideServerRendering } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config: ApplicationConfig = {
  providers: [
    ...(appConfig.providers ?? []),
    ...(serverConfig.providers ?? []),
  ],
};