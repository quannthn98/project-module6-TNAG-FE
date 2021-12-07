import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {MerchantProfile} from '../model/merchant-profile';
import {UserAddress} from '../model/user-address';
import {UserProfile} from '../model/user-profile';
import {UserForm} from '../model/user-form';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  merchants: MerchantProfile[] = [];

  constructor(private http: HttpClient) {
  }

  getAllMerchant(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/merchants');
  }

  getPendingMerchant(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/merchants/pending');
  }

  updateStatusMerchant(id: number, statusName: string): Observable<MerchantProfile> {
    return this.http.put<MerchantProfile>(`${API_URL}/merchants/updateStatus/${id}/${statusName}`, null);
  }

  approvalMerchant(id: number): Observable<User> {
    return this.http.put<User>(`${API_URL}/merchants/updateStatus/${id}/approved`, null);
  }

  blockMerchant(id: number): Observable<User> {
    return this.http.put<User>(`${API_URL}/merchants/updateStatus/${id}/blocked`, null);
  }

  getMerchantById(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/merchants/${id}`);
  }

  registerMerchant(id: number, merchantProfile: MerchantProfile): Observable<User> {
    return this.http.post<User>(`${API_URL}/merchants/${id}`, merchantProfile);
  }

  getAllStatus(): Observable<any> {
    return this.http.get<any>(API_URL + '/status');
  }

  findAllMerchantByName(searchValue: string): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/merchants/search/' + searchValue);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(API_URL + '/users/' + id);
  }

  updateUserProfile(profile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${API_URL}/users/profile`, profile);
  }

  updateAvatar(avatar: FormData): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${API_URL}/users/profile/avatar`, avatar);
  }

  createUser(formData: FormData): Observable<UserForm> {
    return this.http.post<UserForm>(API_URL + '/register', formData);
  }

  getAllDeliverAddressByUser(): Observable<UserAddress> {
    return this.http.get<UserAddress>(`${API_URL}/users/address`);
  }
}
