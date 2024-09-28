import { CrudProduct } from './crud-product';

describe('CrudProduct', () => {
  let product: CrudProduct;

  beforeEach(() => {
    product = new CrudProduct();
  });

  it('should create an instance of CrudProduct', () => {
    expect(product).toBeTruthy();
  });

  it('should have a default id of type number or any', () => {
    expect(product.id).toBeUndefined();
  });

  it('should have a default productName of type string or any', () => {
    expect(product.productName).toBeUndefined();
  });

  it('should have a default productDesc of type string or any', () => {
    expect(product.productDesc).toBeUndefined();
  });

  it('should have a default price of type number or any', () => {
    expect(product.price).toBeUndefined();
  });

  it('should have a default features of type string or any', () => {
    expect(product.features).toBeUndefined();
  });

  it('should have a default quantity of type number or any', () => {
    expect(product.quantity).toBeUndefined();
  });

  it('should have a default imageUrl of type string or any', () => {
    expect(product.imageUrl).toBeUndefined();
  });

  it('should have a default productStatus of type string or any', () => {
    expect(product.productStatus).toBeUndefined();
  });
});
