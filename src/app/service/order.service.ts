import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Order} from '../model/order';
import {Dish} from "../model/dish";
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

  getOrderByMerchant(statusName: string, merchantId: number, name?: any): Observable<Order[]> {
    if (name == null || name === '') {
      if (statusName == null || statusName === '') {
        return this.http.get<Order[]>(API_URL + '/orders/merchant');
      } else {
        return this.http.get<Order[]>(`${API_URL}/orders/merchant?q=${statusName}`);
      }
    } else {
      return this.http.get<Order[]>(`${API_URL}/orders/merchant/${merchantId}?q=${name}`)
    }

  }

  getOrderByMerchantAndStatus(statusName: string, page: number): Observable<Order[]> {
    if (statusName == null || statusName === '') {
      return this.http.get<Order[]>(API_URL + '/orders/merchant?page=' + page);
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

  getCreatedOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(API_URL + '/orders/createdOrders');
  }

  deliveryConfirmOrder(orderStatus: OrderStatus, orderId: number): Observable<OrderStatus> {
    return this.http.put<OrderStatus>(`${API_URL}/orderStatus/confirmShipping/${orderId}`, orderStatus);
  }
  getOrderByShipper(): Observable<Order[]> {
    return this.http.get<Order[]>(API_URL + '/orders/shipper');
  }
  getOrderByIdMerchant(merchantId: number,name? : any): Observable<Order[]> {
    if (name == null || name === '') {
      return this.http.get<Order[]>(`${API_URL}/orders/merchant/${merchantId}`)
    } else {
      return this.http.get<Order[]>(`${API_URL}/orders/merchant/${merchantId}?q=${name}`);
    }
  }
}
