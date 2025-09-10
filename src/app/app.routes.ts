import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  mapToCanActivate,
  mapToCanDeactivate,
} from '@angular/router';
import { PersonalComponent } from './user/personal/personal.component';
import { PostComponent } from './user/post/post.component';
import { ObservableSubjectComponent } from './observable-subject/observable-subject.component';
import { RxjsJoinOperatorsComponent } from './rxjs-join-operators/rxjs-join-operators.component';
import { HomeComponent } from './home.component';
import {
  canActivateChildGuard,
  canActivateGuard,
  canDeactivateGuard,
  delayResolver,
  resolveGuard,
} from './guard/auth-guard.guard';
import { SignalComponent } from './signal/signal.component';
import { LifeCycleHookComponent } from './life-cycle-hook/life-cycle-hook.component';
import { UserComponent } from './user/user.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { UserFormComponent } from './forms/user-form/user-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, resolve: { delayResolver } },
  {
    path: 'user',
    component: UserComponent,
    canActivateChild: [canActivateChildGuard],
    children: [
      {
        path: 'hostlistener',
        component: PostComponent,
        resolve: { resolvedData: resolveGuard },
      },
      {
        path: 'store',
        component: PersonalComponent,
        canDeactivate: [canDeactivateGuard],
      },
    ],
  },
  {
    path: 'observable',
    component: ObservableSubjectComponent,
    canActivate: [canActivateGuard],
  },
  { path: 'rxjs', component: RxjsJoinOperatorsComponent },
  { path: 'signal', component: SignalComponent },
  { path: 'lifecycle', component: LifeCycleHookComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'signup', component: UserFormComponent },
];
