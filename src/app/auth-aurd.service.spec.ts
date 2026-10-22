import { TestBed } from '@angular/core/testing';

import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import { authGuard } from './auth-aurd.service';

describe('authGuard', () => {
  let loginService: { isLoggedIn: boolean };
  let router: Router;

  beforeEach(() => {
    loginService = { isLoggedIn: false };
    TestBed.configureTestingModule({
      providers: [
        { provide: LoginService, useValue: loginService },
        { provide: Router, useValue: { createUrlTree: () => new UrlTree() } }
      ]
    });
    router = TestBed.inject(Router);
  });

  it('allows navigation when the user is logged in', () => {
    loginService.isLoggedIn = true;

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );

    expect(result).toBeTrue();
  });

  it('redirects to login when the user is not logged in', () => {
    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );

    expect(result).toEqual(router.createUrlTree(['/login']));
  });
});
