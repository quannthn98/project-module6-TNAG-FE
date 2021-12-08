import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../model/cart';
import {environment} from '../../environments/environment';
import {CartDetail} from '../model/cart-detail';
import {User} from '../model/user';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  getCartByMerchant(merchantId: number): Observable<Cart> {
    return this.http.get<Cart>(`${API_URL}/carts/${merchantId}`);
  }

  addToCart(dishId: number, direction: string): Observable<CartDetail> {
    return this.http.post<CartDetail>(`${API_URL}/carts/${dishId}/${direction}`, null);
  }

  getCartByUser(): Observable<CartDetail> {
    return this.http.get<CartDetail>(`${API_URL}/carts`);
  }
}
