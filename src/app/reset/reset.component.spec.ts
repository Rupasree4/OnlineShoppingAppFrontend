import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { of, throwError } from 'rxjs';
import { ResetComponent } from './reset.component';
import { ResetService } from './reset.service';
import { Reset } from './reset';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;
  let mockResetService: jasmine.SpyObj<ResetService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ResetService', ['resetPassword']);

    await TestBed.configureTestingModule({
      declarations: [ResetComponent],
      imports: [FormsModule],  // Add FormsModule to imports
      providers: [{ provide: ResetService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    mockResetService = TestBed.inject(ResetService) as jasmine.SpyObj<ResetService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call resetPasswordToken and reset the password successfully', () => {
    const resetData: Reset = { password: 'newPassword123', token: 'token123' };
    component.reset = resetData;

    spyOn(localStorage, 'getItem').and.returnValue('token123'); // Mock localStorage token
    mockResetService.resetPassword.and.returnValue(of('Password reset successfully')); // Mock successful response

    component.resetPasswordToken();

    expect(localStorage.getItem).toHaveBeenCalledWith('forgotToken');
    expect(mockResetService.resetPassword).toHaveBeenCalledWith(resetData);
    expect(mockResetService.resetPassword).toHaveBeenCalledTimes(1);
    expect(component.reset).toEqual(new Reset()); // Resets the form
  });

  it('should handle error when password reset fails', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token123');
    mockResetService.resetPassword.and.returnValue(throwError('Reset failed'));

    const consoleSpy = spyOn(console, 'log');

    component.resetPasswordToken();

    expect(mockResetService.resetPassword).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Password reset failed', 'Reset failed');
  });

  it('should clear localStorage after resetting the password', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token123');
    spyOn(localStorage, 'clear'); // Mock localStorage.clear

    mockResetService.resetPassword.and.returnValue(of('Password reset successfully'));

    component.resetPasswordToken();

    expect(localStorage.clear).toHaveBeenCalled(); // Ensure localStorage is cleared
  });
});
