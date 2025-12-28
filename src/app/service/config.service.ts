import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: any;
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);

  loadAppConfig(): Promise<void> {
    // 🚫 Skip during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    return firstValueFrom(this.http.get('/assets/app-config.json'))
      .then((config) => {
        this.config = config;
        console.log('App config loaded:', this.config);
      })
      .catch(() => Promise.resolve()); // never block bootstrap
  }

  get setting() {
    return this.config;
  }
}
