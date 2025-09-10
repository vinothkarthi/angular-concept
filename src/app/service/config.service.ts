import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadAppConfig(): Promise<void> {
    return firstValueFrom(this.http.get('/assets/app-config.json'))
      .then((config) => {
        this.config = config;
        console.log('App config loaded:', this.config);
      })
      .catch((err) => {
        console.error('Failed to load config:', err);
        return Promise.resolve(); // prevent bootstrap blocking
      });
  }

  get setting() {
    return this.config;
  }
}
