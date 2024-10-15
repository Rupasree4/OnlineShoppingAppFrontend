
import { TestBed } from '@angular/core/testing';
import { CrudProductService } from './crud-product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrudProduct } from './crud-product';

describe('CrudProductService', () => {
  let service: CrudProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8081/api/v1.0/shopping/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudProductService],
    });

    service = TestBed.inject(CrudProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no HTTP requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product via POST', () => {
    const newProduct: CrudProduct = { id: '1', productName: 'Product 1', productDesc: 'Good', price: 100,features: 'abcd',quantity: 10, imageUrl: 'abcd',productStatus: 'instock'}
    ;

    service.addProduct(newProduct).subscribe((response) => {
      expect(response).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);

    req.flush(newProduct); // Simulate the server response
  });

  it('should get all products via GET', () => {
    const mockProducts: CrudProduct[] = [
      { id: '1', productName: 'Product 1', productDesc: 'Good', price: 100,features: 'abcd',quantity: 10, imageUrl: 'abcd',productStatus: 'instock'},
      { id: '1', productName: 'Product 1', productDesc: 'Good', price: 100,features: 'abcd',quantity: 10, imageUrl: 'abcd',productStatus: 'instock'},
    ];

    service.getAllProducts().subscribe((response) => {
      expect(response.length).toBe(2);
      expect(response).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${apiUrl}all`);
    expect(req.request.method).toBe('GET');

    req.flush(mockProducts); // Simulate the server response
  });

  it('should delete a product via DELETE', () => {
    const productId = 1;

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toEqual('Product deleted successfully');
    });

    const req = httpMock.expectOne(`${apiUrl}delete/${productId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.responseType).toBe('text');

    req.flush('Product deleted successfully'); // Simulate the server response
  });

  it('should update a product via PUT', () => {
    const updatedProduct: CrudProduct = { id: '1', productName: 'Product 1', productDesc: 'Good', price: 100,features: 'abcd',quantity: 10, imageUrl: 'abcd',productStatus: 'instock'}
;

    service.updateProduct(updatedProduct.id, updatedProduct).subscribe((response) => {
      expect(response).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}update/${updatedProduct.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);

    req.flush(updatedProduct); // Simulate the server response
  });
});
