import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { personalDetail, userInterface } from '../../interface/user.interface';
import { Observable } from 'rxjs';
import { userSelectors } from '../../selector/user.selector';
import { userActions } from '../../action/user.action';
import { Router } from '@angular/router';
import { AsyncPipe, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { LimittoPipe } from '../../pipes/limitto.pipe';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss',
  standalone: true,
  imports: [AsyncPipe, UpperCasePipe, LimittoPipe],
})
export class PersonalComponent implements OnInit, OnDestroy {
  personalDetail$!: Observable<personalDetail[]>;
  users = [
    {
      id: '1',
      name: 'vinoth',
      email: 'vinoth@gmail.com',
    },
  ];
  constructor(
    private store: Store<{ user: userInterface }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personalDetail$ = this.store.select(userSelectors.getUserPersonal);
  }

  getUserPersonal() {
    this.store.dispatch(userActions.getUsers());
  }
  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  canExit() {
    return confirm('Do you really want to exit?');
  }
  ngOnDestroy(): void {}
}
