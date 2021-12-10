import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {MerchantProfile} from '../model/merchant-profile';
import {UserAddress} from '../model/user-address';
import {UserProfile} from '../model/user-profile';
import {UserForm} from '../model/user-form';
import {ShipperProfile} from '../model/shipper-profile';
import {Userdto} from '../model/userdto';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  merchants: MerchantProfile[] = [];
  selectedCategoryId: number;

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

  getMerchantByUserId(id: number): Observable<User> {
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

  addNewDeliverAddress(userAddress: UserAddress): Observable<UserAddress> {
    return this.http.post(`${API_URL}/users/address`, userAddress);
  }

  deleteDeliverAddress(id: number): Observable<UserAddress> {
    return this.http.delete(`${API_URL}/users/address/${id}`);
  }

  shipperRegister(registerForm): Observable<any> {
    return this.http.post(`${API_URL}/usersư/register/shipper`, registerForm);
  }

  getUserByCategory(id: number): Observable<Userdto[]> {
    return this.http.get<Userdto[]>(`${API_URL}/users/findUserByCategory/${id}`);
  }
}
