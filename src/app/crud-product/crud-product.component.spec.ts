import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudProductComponent } from './crud-product.component';
import { CrudProductService } from './crud-product.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CrudProduct } from './crud-product';
import { FormsModule } from '@angular/forms'; // Import FormsModule for template forms

describe('CrudProductComponent', () => {
  let component: CrudProductComponent;
  let fixture: ComponentFixture<CrudProductComponent>;
  let mockCrudProductService: jasmine.SpyObj<CrudProductService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const crudProductServiceSpy = jasmine.createSpyObj('CrudProductService', [
      'getAllProducts',
      'addProduct',
      'deleteProduct',
      'updateProduct',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [CrudProductComponent], // Declare component
      providers: [
        { provide: CrudProductService, useValue: crudProductServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [FormsModule], // Import FormsModule for two-way binding (if used in the template)
    }).compileComponents();

    fixture = TestBed.createComponent(CrudProductComponent);
    component = fixture.componentInstance;
    mockCrudProductService = TestBed.inject(CrudProductService) as jasmine.SpyObj<CrudProductService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch all products on ngOnInit', () => {
    const mockProducts: CrudProduct[] = [
      {
        id: '1',
        productName: 'Product 1',
        productDesc: 'Good',
        price: 100,
        features: 'abcd',
        quantity: 10,
        imageUrl: 'abcd',
        productStatus: 'instock',
      },
      {
        id: '2',
        productName: 'Product 2',
        productDesc: 'Excellent',
        price: 200,
        features: 'efgh',
        quantity: 5,
        imageUrl: 'xyz',
        productStatus: 'outofstock',
      },
    ];
    mockCrudProductService.getAllProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(mockCrudProductService.getAllProducts).toHaveBeenCalled();
    expect(component.crudProducts).toEqual(mockProducts);
  });

  it('should add a product and update the product list', () => {
    const newProduct: CrudProduct = {
      id: '3',
      productName: 'Product 3',
      productDesc: 'Good',
      price: 300,
      features: 'ijkl',
      quantity: 20,
      imageUrl: 'abcd',
      productStatus: 'instock',
    };
    component.p = newProduct;
    mockCrudProductService.addProduct.and.returnValue(of(newProduct));

    component.addProduct();

    expect(mockCrudProductService.addProduct).toHaveBeenCalledWith(newProduct);
    expect(component.crudProducts).toContain(newProduct);
  });

  it('should delete a product successfully', () => {
    const mockProducts: CrudProduct[] = [
      { id: '1', productName: 'Product 1', productDesc: 'Good', price: 100, features: 'abcd', quantity: 10, imageUrl: 'abcd', productStatus: 'instock' },
      { id: '2', productName: 'Product 2', productDesc: 'Excellent', price: 200, features: 'efgh', quantity: 5, imageUrl: 'xyz', productStatus: 'outofstock' },
    ];
    component.crudProducts = [...mockProducts];

    const productIdToDelete = '1';
    mockCrudProductService.deleteProduct.and.returnValue(of('Product deleted successfully'));

    component.deleteProduct(productIdToDelete);

    expect(mockCrudProductService.deleteProduct).toHaveBeenCalledWith(1);
    expect(component.crudProducts.length).toBe(1);
    expect(component.crudProducts[0].id).toBe('2');
  });

  it('should handle errors when deleting a product fails', () => {
    const productIdToDelete = '1';
    const error = 'Error deleting product';
    mockCrudProductService.deleteProduct.and.returnValue(throwError(() => error));
    const consoleSpy = spyOn(console, 'log');

    component.deleteProduct(productIdToDelete);

    expect(consoleSpy).toHaveBeenCalledWith('Error caught', error);
  });

  it('should update a product successfully', () => {
    const updatedProduct: CrudProduct = {
      id: '1',
      productName: 'Updated Product',
      productDesc: 'Updated Description',
      price: 150,
      features: 'abcd',
      quantity: 15,
      imageUrl: 'updated',
      productStatus: 'instock',
    };
    component.crudProducts = [
      { id: '1', productName: 'Product 1', productDesc: 'Good', price: 100, features: 'abcd', quantity: 10, imageUrl: 'abcd', productStatus: 'instock' },
    ];
    mockCrudProductService.updateProduct.and.returnValue(of(updatedProduct));

    component.updateProduct('1', updatedProduct);

    expect(mockCrudProductService.updateProduct).toHaveBeenCalledWith('1', updatedProduct);
    expect(component.crudProducts[0]).toEqual(updatedProduct);
  });

  it('should handle errors when updating a product fails', () => {
    const error = 'Error updating product';
    const consoleSpy = spyOn(console, 'log');
    const invalidUpdate = { productName: 'Invalid Product', price: 150 };

    mockCrudProductService.updateProduct.and.returnValue(throwError(() => error));

    component.updateProduct('1', invalidUpdate as any);

    expect(consoleSpy).toHaveBeenCalledWith('Error caught', error);
  });

  it('should clear localStorage and navigate to login on logout', () => {
    const localStorageSpy = spyOn(localStorage, 'clear');

    component.logout();

    expect(localStorageSpy).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
