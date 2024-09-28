import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from './register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  public dbUrl = 'http://ec2-54-146-125-133.compute-1.amazonaws.com/api/v1.0/shopping/';

  registerForm(p: Register): Observable<any> {
    return this.http.post(this.dbUrl + 'register', p);
  }
}
