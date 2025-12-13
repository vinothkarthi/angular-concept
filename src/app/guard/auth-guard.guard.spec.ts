import { TestBed } from '@angular/core/testing';
import {
  CanActivateFn,
  CanActivateChildFn,
  CanDeactivateFn,
  ResolveFn,
} from '@angular/router';
import {
  canActivateGuard,
  canActivateChildGuard,
  canDeactivateGuard,
  resolveGuard,
  delayResolver,
  canLoadGuard,
  ICanDeactivate,
} from './auth-guard.guard';
import { SharedService } from '../service/shared.service';
import { of } from 'rxjs';

// Mock SharedService
class MockSharedService {
  isAuth = true;
  isAuthenticate() {
    return this.isAuth;
  }
  getPosts() {
    return of([{ id: 1, title: 'mock post' }]);
  }
}

describe('Auth Guards', () => {
  let sharedService: MockSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SharedService, useClass: MockSharedService }],
    });
    sharedService = TestBed.inject(SharedService) as any;
  });

  // ----------------- canActivateGuard -----------------
  it('canActivateGuard should allow when authenticated', () => {
    sharedService.isAuth = true;
    const executeGuard: CanActivateFn = (...params) =>
      TestBed.runInInjectionContext(() => canActivateGuard(...params));
    expect(executeGuard({} as any, {} as any)).toBeTrue();
  });

  it('canActivateGuard should block when not authenticated', () => {
    sharedService.isAuth = false;
    const executeGuard: CanActivateFn = (...params) =>
      TestBed.runInInjectionContext(() => canActivateGuard(...params));
    expect(executeGuard({} as any, {} as any)).toBeFalse();
  });

  // ----------------- canActivateChildGuard -----------------
  it('canActivateChildGuard should delegate to canActivateGuard', () => {
    sharedService.isAuth = true;
    const executeGuard: CanActivateChildFn = (...params) =>
      TestBed.runInInjectionContext(() => canActivateChildGuard(...params));
    expect(executeGuard({} as any, {} as any)).toBeTrue();
  });

  // ----------------- canDeactivateGuard -----------------
  it('canDeactivateGuard should call component.canExit()', () => {
    const mockComp: ICanDeactivate = { canExit: () => true };
    const executeGuard: CanDeactivateFn<ICanDeactivate> = (...params) =>
      TestBed.runInInjectionContext(() => canDeactivateGuard(...params));
    expect(executeGuard(mockComp, {} as any, {} as any, {} as any)).toBeTrue();
  });

  // ----------------- resolveGuard -----------------
  it('resolveGuard should return posts', (done) => {
    const executeGuard: ResolveFn<any> = (...params) =>
      TestBed.runInInjectionContext(() => resolveGuard(...params));
    executeGuard({} as any, {} as any).subscribe(
      (posts: { id: number; title: string }[]) => {
        expect(posts.length).toBe(1);
        done();
      }
    );
  });

  // ----------------- delayResolver -----------------
  it('delayResolver should resolve true after delay', (done) => {
    const executeGuard: ResolveFn<boolean> = (...params) =>
      TestBed.runInInjectionContext(() => delayResolver(...params));
    const result = executeGuard({} as any, {} as any);
    if (result && typeof (result as any).subscribe === 'function') {
      (result as any).subscribe((val: boolean) => {
        expect(val).toBeTrue();
        done();
      });
    } else {
      expect(result).toBeTrue();
      done();
    }
  });

  // ----------------- canLoadGuard -----------------
  it('canLoadGuard should allow when authenticated', () => {
    sharedService.isAuth = true;
    const result = TestBed.runInInjectionContext(() => canLoadGuard());
    expect(result).toBeTrue();
  });

  it('canLoadGuard should block when not authenticated', () => {
    sharedService.isAuth = false;
    const result = TestBed.runInInjectionContext(() => canLoadGuard());
    expect(result).toBeFalse();
  });
});
