import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ShipperRequest} from '../model/shipper-request';

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  constructor(private http: HttpClient) {
  }

  getPendingRequest(): Observable<ShipperRequest[]> {
    return this.http.get<ShipperRequest[]>(`${API_URL}/request`);
  }

  updateStatus(id: number, status: string): Observable<ShipperRequest> {
    const url = `${API_URL}/request/${id}/${status}`;
    return this.http.put<ShipperRequest>(`${API_URL}/request/${id}/${status}`, null);
  }
}
