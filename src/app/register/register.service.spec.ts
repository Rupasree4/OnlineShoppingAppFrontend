// import { TestBed } from '@angular/core/testing';

// import { RegisterService } from './register.service';

// describe('RegisterService', () => {
//   let service: RegisterService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(RegisterService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service'; // Adjust the path as necessary
import { Register } from './register'; // Adjust the path as necessary

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService],
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should register user successfully', () => {
    const mockRegister: Register = {
      id: undefined,
      loginId: undefined,
      firstName: undefined,
      lastName: undefined,
      password: undefined,
      confirmPassword: undefined,
      email: undefined,
      roles: undefined,
      resetPasswordToken: undefined,
      contactNumber: undefined
    }; // Adjust according to your Register model
    const mockResponse = { success: true };

    service.registerForm(mockRegister).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1.0/shopping/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simulate returning a response
  });

  it('should handle error during registration', () => {
    const mockRegister: Register = {
      id: undefined,
      loginId: undefined,
      firstName: undefined,
      lastName: undefined,
      password: undefined,
      confirmPassword: undefined,
      email: undefined,
      roles: undefined,
      resetPasswordToken: undefined,
      contactNumber: undefined
    }; // Adjust according to your Register model
    const errorMessage = 'Error during registration';

    service.registerForm(mockRegister).subscribe(
      () => {},
      (error) => {
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('http://localhost:8081/api/v1.0/shopping/register');
    expect(req.request.method).toBe('POST');
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' }); // Simulate an error response
  });
});
