import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './authguard.service';


describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Using RouterTestingModule to mock routing
      providers: [AuthGuard],
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);

    // Spy on the navigate method of Router
    spyOn(router, 'navigate');
    
    // Mocking RouterStateSnapshot
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['url']);
  });

  it('should allow access when the user is logged in', () => {
    // Simulate the user being logged in
    spyOn(localStorage, 'getItem').and.returnValue('12345'); // Mock localStorage to return a value

    const result = authGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);

    expect(result).toBeTrue(); // It should allow the route to activate
    expect(router.navigate).not.toHaveBeenCalled(); // Ensure the router does not navigate away
  });

  it('should block access and redirect to login when the user is not logged in', () => {
    // Simulate the user not being logged in
    spyOn(localStorage, 'getItem').and.returnValue(null); // Mock localStorage to return null

    const result = authGuard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);

    expect(result).toBeFalse(); // It should block the route activation
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Ensure it redirects to login page
  });
});
