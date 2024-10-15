
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from './product.service';
import { OrderdetailsService } from '../orderdetails/orderdetails.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Product } from './product';

import { HeaderComponent } from '../header/header.component'; // Import HeaderComponent

TestBed.configureTestingModule({
  declarations: [
    ProductComponent,
    HeaderComponent // Declare the HeaderComponent
  ],
  providers: [
    { provide: ProductService, useValue: ProductService },
    { provide: OrderdetailsService, useValue: OrderdetailsService },
    { provide: Router, useValue: Router }
  ],
}).compileComponents();


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let orderService: jasmine.SpyObj<OrderdetailsService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAllProducts']);
    const orderServiceSpy = jasmine.createSpyObj('OrderdetailsService', ['placeOrder']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: OrderdetailsService, useValue: orderServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    orderService = TestBed.inject(OrderdetailsService) as jasmine.SpyObj<OrderdetailsService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    const mockProducts: Array<Product> = [
      {
        id: 1,
        productName: 'abc',
        productDesc: 'ab',
        price: 1000,
        features: 'ab',
        quantity: 10,
        imageUrl: 'abc.com',
        productStatus: 'instock',
      },
      {
        id: 2,
        productName: 'abc',
        productDesc: 'ab',
        price: 1000,
        features: 'ab',
        quantity: 10,
        imageUrl: 'abc.com',
        productStatus: 'instock',
      },
    ];

    productService.getAllProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.getAllProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
    expect(component.products).toEqual(mockProducts);
  });

  it('should handle error when loading products', () => {
    productService.getAllProducts.and.returnValue(throwError('Error'));

    spyOn(console, 'log'); // To verify if console.log is called

    component.viewProducts();

    expect(console.log).toHaveBeenCalledWith('Error');
  });

  it('should place an order and navigate to order page', () => {
    const mockProduct = { id: 1, price: 100, productName: 'Product 1', imageUrl: 'url1' };
    localStorage.setItem('loginId', 'testLoginId');

    orderService.placeOrder.and.returnValue(of());

    component.placeOrder(mockProduct);

    expect(orderService.placeOrder).toHaveBeenCalledWith(jasmine.objectContaining({
      loginId: 'testLoginId',
      orderId: mockProduct.id,
      price: mockProduct.price,
      productName: mockProduct.productName,
      imageUrl: mockProduct.imageUrl,
      quantity: 1,
    }));

    expect(router.navigateByUrl).toHaveBeenCalledWith('/order');
  });

  it('should handle error when placing an order', () => {
    const mockProduct = { id: 1, price: 100, productName: 'Product 1', imageUrl: 'url1' };
    localStorage.setItem('loginId', 'testLoginId');

    orderService.placeOrder.and.returnValue(throwError('Error'));

    spyOn(console, 'log'); // To verify if console.log is called

    component.placeOrder(mockProduct);

    expect(console.log).toHaveBeenCalledWith('Error');
  });
});
