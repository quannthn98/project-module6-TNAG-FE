import {Injectable} from '@angular/core';
import {Merchant} from '../model/merchant';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish} from '../model/dish';
import {User} from '../model/user';

const API_URL = `http://localhost:8080`;

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


  getAllDishByMerchant(id: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.baseUrl}/dishes/merchant/${id}` );
  }
  getMerchantById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/merchants/${id}`);
  }

}
