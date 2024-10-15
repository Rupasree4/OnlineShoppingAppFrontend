// import { TestBed } from '@angular/core/testing';

// import { OrderdetailsService } from './orderdetails.service';

// describe('OrdertailsService', () => {
//   let service: OrderdetailsService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(OrderdetailsService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderdetailsService } from './orderdetails.service'; // Adjust the path as necessary
import { Orderdetails } from './orderdetails'; // Adjust the path as necessary

describe('OrderdetailsService', () => {
  let service: OrderdetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderdetailsService],
    });

    service = TestBed.inject(OrderdetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should place an order successfully', () => {
    const mockOrder: Orderdetails = {
      orderId: undefined,
      loginId: undefined,
      productName: undefined,
      price: undefined,
      quantity: undefined,
      imageUrl: undefined,
      date: undefined
    }; // Adjust according to your Orderdetails model
    const mockResponse: Orderdetails = {
      orderId: undefined,
      loginId: undefined,
      productName: undefined,
      price: undefined,
      quantity: undefined,
      imageUrl: undefined,
      date: undefined
    }; // Adjust as needed

    service.placeOrder(mockOrder).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/v1.0/shopping/order');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simulate returning a response
  });

  it('should handle error during placing order', () => {
    const mockOrder: Orderdetails = {
      orderId: undefined,
      loginId: undefined,
      productName: undefined,
      price: undefined,
      quantity: undefined,
      imageUrl: undefined,
      date: undefined
    }; // Adjust according to your Orderdetails model
    const errorMessage = 'Error placing order';

    service.placeOrder(mockOrder).subscribe(
      () => {},
      (error) => {
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('http://localhost:8081/api/v1.0/shopping/order');
    expect(req.request.method).toBe('POST');
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' }); // Simulate an error response
  });

  it('should get all orders for the user', () => {
    const loginId = 'testLoginId';
    localStorage.setItem('loginId', loginId);

    const mockOrders: Array<Orderdetails> = [/* Populate with mock orders data */];

    service.getAllOrdersByUser().subscribe((orders) => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne(`http://localhost:8081/api/v1.0/shopping/orders/${loginId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders); // Simulate returning a response
  });

  it('should handle error when getting orders', () => {
    const loginId = 'testLoginId';
    localStorage.setItem('loginId', loginId);
    const errorMessage = 'Error fetching orders';

    service.getAllOrdersByUser().subscribe(
      () => {},
      (error) => {
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`http://localhost:8081/api/v1.0/shopping/orders/${loginId}`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' }); // Simulate an error response
  });
});
