import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coupon} from '../model/coupon';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) {
  }

  getAllByMerchant(id: number): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${API_URL}/coupons/merchants/${id}`);
  }

  findById(id: number): Observable<Coupon> {
    return this.http.get<Coupon>(`${API_URL}/coupons/${id}`);
  }

  findByInputCode(code: string): Observable<Coupon> {
    return this.http.get<Coupon>(`${API_URL}/coupons?code=${code}`);
  }
}
