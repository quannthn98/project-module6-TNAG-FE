import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const openCage = 'https://api.opencagedata.com/geocode/v1/json?';
const API = 'ed6b4490e4ed4706a54cd7d07e2a7027';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  forwardConvert(address: string) {
    return this.http.get(`${openCage}q=${address}&key=${API}`);
  }

  calculateDistance(point1, point2) {
    const p1 = new google.maps.LatLng(
      point1.lat,
      point1.lng
    );
    const p2 = new google.maps.LatLng(
      point2.lat,
      point2.lng
    );
    return (
      google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
    ).toFixed(2);
  }
}
