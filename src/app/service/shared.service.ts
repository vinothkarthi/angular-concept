import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  delay,
  of,
} from 'rxjs';
import { personalDetail, posts } from '../interface/user.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  baseURL: string = 'https://jsonplaceholder.typicode.com';
  obs$: Observable<any> = of(1, 2, 3);
  sub: Subject<any> = new Subject();
  subObs$: Observable<any> = this.sub.asObservable();
  beh: BehaviorSubject<any> = new BehaviorSubject(100);
  behObs$: Observable<any> = this.beh.asObservable();
  rep: ReplaySubject<any> = new ReplaySubject(2);
  repObs$: Observable<any> = this.rep.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  ngOnInit() {
    console.log(this.getApiUrl());
  }

  getUsers() {
    return this.http.get(`${this.baseURL}/users`);
  }

  getPosts() {
    return this.http.get(`${this.baseURL}/posts`).pipe(delay(10000));
  }

  emitData() {
    this.sub.next(Math.floor(Math.random() * 10));
    this.beh.next(Math.floor(Math.random() * 10));
    this.rep.next(Math.floor(Math.random() * 10));
  }

  isAuthenticate() {
    return false;
  }

  getApiUrl(): string {
    return this.configService.setting?.apiBaseUrl ?? 'http://fallback.local';
  }
}
