import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderdetailsComponent } from './orderdetails.component';
import { OrderdetailsService } from './orderdetails.service';
import { of, throwError } from 'rxjs';
import { Orderdetails } from './orderdetails';
import { HeaderComponent } from '../header/header.component'; // Import HeaderComponent
import { FooterComponent } from '../footer/footer.component'; // Import FooterComponent
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Import CUSTOM_ELEMENTS_SCHEMA

describe('OrderdetailsComponent', () => {
  let component: OrderdetailsComponent;
  let fixture: ComponentFixture<OrderdetailsComponent>;
  let orderService: jasmine.SpyObj<OrderdetailsService>;

  beforeEach(() => {
    const orderServiceSpy = jasmine.createSpyObj('OrderdetailsService', ['getAllOrdersByUser']);

    TestBed.configureTestingModule({
      declarations: [
        OrderdetailsComponent, // Component under test
        HeaderComponent, // Declare HeaderComponent
        FooterComponent, // Declare FooterComponent
      ],
      providers: [
        { provide: OrderdetailsService, useValue: orderServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Use CUSTOM_ELEMENTS_SCHEMA to ignore unknown elements if needed
    }).compileComponents();

    fixture = TestBed.createComponent(OrderdetailsComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderdetailsService) as jasmine.SpyObj<OrderdetailsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on initialization', () => {
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
        price: 2000,
        quantity: 10,
        imageUrl: 'abc.com',
        date: 2000,
      },
    ];

    orderService.getAllOrdersByUser.and.returnValue(of(mockOrders));

    component.ngOnInit();

    expect(orderService.getAllOrdersByUser).toHaveBeenCalled();
    expect(component.order).toEqual(mockOrders);
    expect(component.prices).toEqual([1000, 2000]);
    expect(component.totalPrice).toBe(3000);
  });

  it('should handle error when loading orders', () => {
    orderService.getAllOrdersByUser.and.returnValue(throwError('Error'));

    spyOn(console, 'log'); // To verify if console.log is called

    component.getAllOrders();

    expect(console.log).toHaveBeenCalledWith('Error');
  });

  it('should calculate total price correctly', () => {
    component.prices = [1000, 2000, 50];

    component.calculateTotalPrice();

    expect(component.totalPrice).toBe(3050);
  });

  it('should extract prices correctly', () => {
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
        price: 2000,
        quantity: 10,
        imageUrl: 'abc.com',
        date: 2001,
      },
    ];

    component.order = mockOrders;

    component.extractPrices();

    expect(component.prices).toEqual([1000, 2000]);
  });
});
