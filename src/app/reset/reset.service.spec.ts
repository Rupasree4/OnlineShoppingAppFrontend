// import { TestBed } from '@angular/core/testing';

// import { ResetService } from './reset.service';

// describe('ResetService', () => {
//   let service: ResetService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ResetService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResetService } from './reset.service';
import { Reset } from './reset';

describe('ResetService', () => {
  let service: ResetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResetService],
    });
    service = TestBed.inject(ResetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to reset password', () => {
    const mockResponse = 'Password reset successful';
    const resetData: Reset = { password: 'newPassword123', token: 'abc'}; // Example Reset data

    service.resetPassword(resetData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1.0/shopping/reset_password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(resetData);

    // Respond with the mock data
    req.flush(mockResponse);
  });
});
