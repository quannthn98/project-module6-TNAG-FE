import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish} from '../model/dish';
import {User} from '../model/user';
import {MerchantProfile} from '../model/merchant-profile';
import {UserAddress} from '../model/user-address';
import {UserProfile} from '../model/user-profile';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  merchants: MerchantProfile[] = [];
  private baseUrl = 'http://localhost:8080';

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
    return this.http.get<User>(`${API_URL}/merchants/updateStatus/${id}/block`);
  }

  getAllDishByMerchant(id: number, name?: string): Observable<Dish[]> {
    if (name == null || name === '') {
      return this.http.get<Dish[]>(`${this.baseUrl}/dishes/${id}/merchant`);
    } else {
      return this.http.get<Dish[]>(`${this.baseUrl}/dishes/${id}/merchant?q=${name}`);
    }
  }

  getMerchantById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/merchants/${id}`);
  }

  registerMerchant(id: number, merchantProfile: MerchantProfile): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/merchants/${id}`, merchantProfile);
  }

  getAllStatus(): Observable<any> {
    return this.http.get<any>(API_URL + '/status');
  }

  findAllMerchantByName(searchValue: string): Observable<User> {
    return this.http.get(API_URL + '/merchants/search/' + searchValue);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get(API_URL + '/users/' + id);
  }

  getAllDeliverAddressByUser(): Observable<UserAddress[]> {
    return this.http.get<UserAddress[]>(`${API_URL}/users/address`);
  }

  getDishById(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${API_URL}/dishes/${id}`);
  }

  updateUserProfile(profile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${API_URL}/users/profile`, profile);
  }

  updateAvatar(avatar: FormData): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${API_URL}/users/profile/avatar`, avatar);
  }
}
