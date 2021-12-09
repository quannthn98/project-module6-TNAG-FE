import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Notification} from '../model/notification';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  getAllNotificationByUser(id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${API_URL}/notify/${id}`);
  }
}
