import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';
import { of, throwError } from 'rxjs';
import { Register } from './register';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerService: jasmine.SpyObj<RegisterService>;

  beforeEach(() => {
    const registerServiceSpy = jasmine.createSpyObj('RegisterService', ['registerForm']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // For HttpClient mocking
        FormsModule, // Import FormsModule to fix ngForm error
      ],
      declarations: [RegisterComponent],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerService = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should register successfully and reset form', () => {
    const mockResponse = {}; // Simulate successful registration response
    registerService.registerForm.and.returnValue(of(mockResponse));

    // Create an instance of Register
    component.register = new Register();
    component.register.loginId = 'undefined';
    component.register.email = 'undefined';
    component.register.password = 'undefined';

    component.registerFormTemplate();

    expect(registerService.registerForm).toHaveBeenCalledWith(component.register); // Check if service method is called with Register instance
    expect(component.message).toBe('Registered Successfully'); // Message should update
    expect(component.register).toEqual(new Register()); // Check if the register object is reset
  });

  it('should handle registration failure', () => {
    registerService.registerForm.and.returnValue(throwError('Error'));

    spyOn(console, 'log'); // Spy on console.log

    component.registerFormTemplate();

    expect(registerService.registerForm).toHaveBeenCalledWith(component.register); // Ensure service was called
    expect(console.log).toHaveBeenCalledWith('Error'); // Error should be logged
    expect(component.message).toBe('Failed'); // Message should reflect the failure
  });
});
