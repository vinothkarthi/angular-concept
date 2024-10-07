import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, CanDeactivateFn, ResolveFn, Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { Observable, map, timer } from 'rxjs';

export interface ICanDeactivate {
  canExit: ()=>boolean | Observable<boolean> | Promise<boolean>
}

export const canActivateGuard: CanActivateFn = (route,state) => {
  const sharedSrv= inject(SharedService);
  const router = inject(Router);
  if(sharedSrv.isAuthenticate()) {
    return true;
  }
  else {
    router.navigate(['/home']);
    return false;
  }
};

export const canActivateChildGuard: CanActivateChildFn = (route,state) => {
  return canActivateGuard(route,state);
};

export const canDeactivateGuard: CanDeactivateFn<ICanDeactivate> = (component: ICanDeactivate) => {
  return component.canExit()
}

export const resolveGuard: ResolveFn<any> = ()=> {
  const sharedSrv = inject(SharedService)
  return sharedSrv.getPosts()
}

export const delayResolver: ResolveFn<boolean>=()=>{
return timer(3000).pipe(map(():boolean => true))
}
