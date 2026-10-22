import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
    window.localStorage.removeItem('isLoggedIn');
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('marks the user as logged in after a successful response', async () => {
    const login = service.login('user', 'password');
    const request = httpTestingController.expectOne('https://localhost:44305/api/Auth');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ username: 'user', password: 'password' });
    request.flush({});

    await expectAsync(login).toBeResolvedTo(true);
    expect(service.isLoggedIn).toBeTrue();
  });

  it('marks the user as logged out when the request fails', async () => {
    const login = service.login('user', 'wrong-password');
    const request = httpTestingController.expectOne('https://localhost:44305/api/Auth');
    spyOn(console, 'error');
    request.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    await expectAsync(login).toBeResolvedTo(false);
    expect(service.isLoggedIn).toBeFalse();
  });
});
