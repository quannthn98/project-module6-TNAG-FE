import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Merchant} from '../model/merchant';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  merchants: Merchant[] = [];

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
  getMerchantById(id: number): Observable<Merchant> {
    return this.http.get<Merchant>(`${API_URL}/merchants/${id}`);
  }
  approvalMerchant(id: number): Observable<Merchant> {
    return this.http.get<Merchant>(`${API_URL}/merchants/updateStatus/${id}/approved`);
  }
  blockMerchant(id: number): Observable<Merchant> {
    return this.http.get<Merchant>(`${API_URL}/merchants/updateStatus/${id}/block`);
  }

}
