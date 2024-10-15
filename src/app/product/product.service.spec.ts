import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from './product.service';
import { OrderdetailsService } from '../orderdetails/orderdetails.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Product } from './product';
import { HeaderComponent } from '../header/header.component'; // Import the app-header component

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
      declarations: [ProductComponent, HeaderComponent],  // Add the app-header component to declarations
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

  it('should retrieve all products on initialization', () => {
    const mockProducts: Product[] = [
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
      }
    ];

    productService.getAllProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.getAllProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
    expect(component.products).toEqual(mockProducts);
  });
});
