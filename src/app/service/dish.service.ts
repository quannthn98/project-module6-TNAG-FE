import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dish} from '../model/dish';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) {
  }

  create(formData: FormData): Observable<Dish> {
    return this.http.post<Dish>(`${API_URL}/dishes`, formData);
  }

  delete(id: number) {
    return this.http.delete(`${API_URL}/dishes/${id}`);
  }

  getAllDish(id: number, name?: string): Observable<Dish[]> {
    if (name == null || name === '') {
      return this.http.get<Dish[]>(`${API_URL}/dishes/${id}/merchant`);
    } else {
      return this.http.get<Dish[]>(`${API_URL}/dishes/${id}/merchant?q=${name}`);
    }
  }

  getDishById(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${API_URL}/dishes/${id}`);
  }
}
