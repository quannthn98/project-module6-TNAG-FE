import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CouponType} from '../model/coupon-type';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CouponTypeService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<CouponType[]> {
    return this.http.get<CouponType[]>(`${API_URL}/couponType`);
  }
}
