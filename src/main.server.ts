/* main.server.ts is the entry point for the server-side rendering (SSR) of an Angular application. It bootstraps the application and configures it with the necessary providers and settings for server-side execution. its read by the Node.js runtime */

import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
