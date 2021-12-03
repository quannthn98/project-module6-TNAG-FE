import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Merchant} from '../model/merchant';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish} from '../model/dish';
import {User} from '../model/user';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  merchants: Merchant[] = [];
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }
  getAllMerchant(): Observable<Merchant[]> {
    return this.http.get<Merchant[]>(API_URL + '/merchants');
  }

  getPendingMerchant(): Observable<Merchant[]> {
    return this.http.get<Merchant[]>(API_URL + '/merchants/pending');
  }

  updateStatusMerchant(id: number, statusName: string): Observable<Merchant> {
    return this.http.get<Merchant>(`${API_URL}/updateStatus/${id}/${statusName}`);
  }
  approvalMerchant(id: number): Observable<Merchant> {
    return this.http.get<Merchant>(`${API_URL}/merchants/updateStatus/${id}/approved`);
  }
  blockMerchant(id: number): Observable<Merchant> {
    return this.http.get<Merchant>(`${API_URL}/merchants/updateStatus/${id}/block`);
  }


  getAllDishByMerchant(id: number, name?: string): Observable<Dish[]> {
    if(name==null || name == "" ){
      return this.http.get<Dish[]>(`${this.baseUrl}/dishes/merchant/${id}`);
    }else {
      return this.http.get<Dish[]>(`${this.baseUrl}/dishes/merchant/${id}/?q=${name}` );
    }

  }
  getMerchantById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/merchants/${id}`);
  }

}
