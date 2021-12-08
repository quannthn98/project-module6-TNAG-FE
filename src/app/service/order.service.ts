import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Order} from '../model/order';
import {Dish} from "../model/dish";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createNewOrder(checkoutForm, merchantId: number): Observable<Order> {
    return this.http.post(`${API_URL}/orders/${merchantId}`, checkoutForm);
  }

  getAllOrdersByUser(): Observable<Order> {
    return this.http.get<Order>(`${API_URL}/orders/user`);
  }

  getOrderByIdMerchant(merchantId: number,name? : any): Observable<Order[]> {
    if (name == null || name === '') {
      return this.http.get<Order[]>(`${API_URL}/orders/merchant/${merchantId}`)
    } else {
      return this.http.get<Order[]>(`${API_URL}/orders/merchant/${merchantId}?q=${name}`);
    }
  }
}
