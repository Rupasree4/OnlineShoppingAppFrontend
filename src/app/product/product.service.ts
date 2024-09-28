import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public dbUrl = 'http://ec2-54-146-125-133.compute-1.amazonaws.com/api/v1.0/shopping/';

  getAllProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.dbUrl + 'all');
  }
}
