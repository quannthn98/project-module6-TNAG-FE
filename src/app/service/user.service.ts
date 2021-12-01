import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dish} from "../model/dish";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }
  getAllDishByMerchant(id: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.baseUrl}/dishes/merchant/${id}` );
  }
  getMerchantById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/merchants/${id}`);
  }
}
