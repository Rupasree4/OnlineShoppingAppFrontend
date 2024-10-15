import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from '../register/register.component';
import { RegisterService } from '../register/register.service'; 
import { of, throwError } from 'rxjs';
import { Register } from '../register/register'; 
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerService: jasmine.SpyObj<RegisterService>;

  beforeEach(() => {
    const registerServiceSpy = jasmine.createSpyObj('RegisterService', ['registerForm']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule here
      declarations: [RegisterComponent],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerService = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register successfully', () => {
    const mockResponse = {}; // Simulating successful registration response
    registerService.registerForm.and.returnValue(of(mockResponse));

    component.registerFormTemplate();

    expect(registerService.registerForm).toHaveBeenCalledWith(component.register);
    expect(component.message).toBe('Registered Successfully');
    expect(component.register).toEqual(new Register()); // Check if the register object is reset
  });

  it('should handle registration failure', () => {
    registerService.registerForm.and.returnValue(throwError('Error'));

    spyOn(console, 'log'); // To verify if console.log is called

    component.registerFormTemplate();

    expect(console.log).toHaveBeenCalledWith('Error');
    expect(component.message).toBe('Failed');
  });
});
