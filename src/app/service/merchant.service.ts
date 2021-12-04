import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {MerchantProfile} from '../model/merchant-profile';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http: HttpClient) {
  }

  updateMerchantProfile(id: number, merchantProfile: MerchantProfile): Observable<MerchantProfile> {
    return this.http.put<MerchantProfile>(`${API_URL}/merchants/${id}`, merchantProfile);
  }

  register(id: number, merchantProfile: MerchantProfile): Observable<MerchantProfile> {
    return this.http.post(`${API_URL}/merchants/${id}/register`, merchantProfile);
  }
}
