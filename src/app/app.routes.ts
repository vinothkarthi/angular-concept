import { inject, NgModule } from '@angular/core';
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
  canLoadGuard,
  delayResolver,
  resolveGuard,
} from './guard/auth-guard.guard';
import { SignalComponent } from './signal/signal.component';
import { LifeCycleHookComponent } from './life-cycle-hook/life-cycle-hook.component';
import { UserComponent } from './user/user.component';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { SharedService } from './service/shared.service';

export const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    redirectTo: () => {
      const service = inject(SharedService);
      return true ? 'home' : '**';
    },
    pathMatch: 'full',
  },
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
  {
    path: 'dependency-injection',
    loadComponent: () =>
      import('./di-provider-resolver/di-provider-resolver.component').then(
        (m) => m.DiProviderResolverComponent
      ),
    canMatch: [canLoadGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: '404 - Not Found',
  },
];
