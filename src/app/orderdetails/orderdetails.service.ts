import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orderdetails } from './orderdetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderdetailsService {
  order: Orderdetails = new Orderdetails();
  constructor(private http: HttpClient) {}

  public dbUrl = 'http://ec2-54-146-125-133.compute-1.amazonaws.com/api/v1.0/shopping/';

  placeOrder(order: Orderdetails): Observable<Orderdetails> {
    return this.http.post<Orderdetails>(this.dbUrl + 'order', order);
  }

  getAllOrdersByUser(): Observable<Array<Orderdetails>> {
    return this.http.get<Array<Orderdetails>>(
      `${this.dbUrl}orders/${localStorage.getItem('loginId')}`
    );
  }
}
