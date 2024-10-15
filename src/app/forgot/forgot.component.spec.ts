import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotComponent } from './forgot.component';
import { ForgotService } from './forgot.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule or ReactiveFormsModule

describe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;
  let forgotService: jasmine.SpyObj<ForgotService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const forgotServiceSpy = jasmine.createSpyObj('ForgotService', ['getToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [FormsModule], // Import FormsModule here
      declarations: [ForgotComponent],
      providers: [
        { provide: ForgotService, useValue: forgotServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
    forgotService = TestBed.inject(ForgotService) as jasmine.SpyObj<ForgotService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve token and navigate on successful response', () => {
    const mockToken = 'mock-token'; // Simulated token response
    const email = 'test@example.com'; // Test email input

    forgotService.getToken.and.returnValue(of(mockToken)); // Mock the service call to return the token

    component.getForgotToken(email); // Call the method

    expect(forgotService.getToken).toHaveBeenCalledWith(email); // Check that the service was called with the correct email
    expect(localStorage.getItem('forgotToken')).toBe(mockToken); // Verify that the token was stored in localStorage
    expect(router.navigateByUrl).toHaveBeenCalledWith('/reset'); // Check that navigation occurred
  });

  it('should log error on failed token retrieval', () => {
    const email = 'test@example.com'; // Test email input
    const mockError = 'Error retrieving token'; // Simulated error message
    spyOn(console, 'log'); // Spy on console.log

    forgotService.getToken.and.returnValue(throwError(mockError)); // Mock the service call to throw an error

    component.getForgotToken(email); // Call the method

    expect(forgotService.getToken).toHaveBeenCalledWith(email); // Check that the service was called with the correct email
    expect(console.log).toHaveBeenCalledWith(mockError); // Verify that the error was logged
  });
});
