// import { TestBed } from '@angular/core/testing';

// import { OrderdashboardService } from './orderdashboard.service';

// describe('OrderdashboardService', () => {
//   let service: OrderdashboardService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(OrderdashboardService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderdashboardService } from './orderdashboard.service'; // Adjust the path as necessary
import { Orderdetails } from '../orderdetails/orderdetails'; // Adjust the path as necessary

describe('OrderdashboardService', () => {
  let service: OrderdashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderdashboardService],
    });

    service = TestBed.inject(OrderdashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should retrieve all orders for the user successfully', () => {
    const mockOrders: Array<Orderdetails> = [
      {
        orderId: 1,
        loginId: 'abc',
        productName: 'ab',
        price: 1000,
        quantity: 10,
        imageUrl: 'abc.com',
        date: 2000,
      },
      {
        orderId: 2,
        loginId: 'abc',
        productName: 'ab',
        price: 1000,
        quantity: 10,
        imageUrl: 'abc.com',
        date: 2000,
      },
    ];

    service.getAllOrdersByUser().subscribe((orders) => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1.0/shopping/allorders');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders); // Simulate returning a response
  });

  it('should handle error when retrieving orders', () => {
    const errorMessage = 'Error fetching orders';

    service.getAllOrdersByUser().subscribe(
      () => {},
      (error) => {
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('http://localhost:8081/api/v1.0/shopping/allorders');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' }); // Simulate an error response
  });
});
