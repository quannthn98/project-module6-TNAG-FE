import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Order} from '../model/order';
import {OrderStatus} from '../model/order-status';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  createNewOrder(checkoutForm, merchantId: number): Observable<Order> {
    return this.http.post(`${API_URL}/orders/${merchantId}`, checkoutForm);
  }

  getOrderByMerchant(statusName: string): Observable<Order[]> {
    if (statusName == null || statusName === '') {
      return this.http.get<Order[]>(API_URL + '/orders/merchant');
    } else {
      return this.http.get<Order[]>(`${API_URL}/orders/merchant?q=${statusName}`);
    }
  }

  getAllOrdersByUser(): Observable<Order> {
    return this.http.get<Order>(`${API_URL}/orders/user`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(API_URL + '/orders/' + id);
  }

  getAllOrderStatus(): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(`${API_URL}/orderStatus`);
  }

  cancellationOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(API_URL + '/orderStatus', order);
  }
}
