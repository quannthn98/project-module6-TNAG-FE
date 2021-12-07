import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Order} from '../model/order';

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

  getOrderByIdMerchant(merchantId: number, orderId: number,phoneCustomer:string,nameCustomer: string): Observable<Order> {
    if ((orderId && phoneCustomer && nameCustomer) == null || (( phoneCustomer==''&& nameCustomer=='') && orderId == null)){
      return this.http.get<Order>(`${API_URL}/orders/merchant/${merchantId}`);
    }else if(  !(orderId== null) &&( (phoneCustomer && nameCustomer)==null || (phoneCustomer && nameCustomer)==='' )   ) {
      return this.http.get<Order>(`${API_URL}/orders/merchant/${merchantId}/${orderId}`);
    }else {
      alert("Vui lòng chỉ nhập 1 trường tìm kiếm");
    }

  }
}
