import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {Order} from '../../model/order';
import {LocationService} from '../../service/location.service';


@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit, OnChanges {
  orderId: number;
  order: Order;
  merchantLocation: any;
  userLocation: any;
  distance: any;

  origin: any;
  destination: any;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private locationService: LocationService) {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      this.orderId = +paraMap.get('id');
      this.getOrderById();
    });
  }


  ngOnInit() {
    this.origin = {
      lat: 24.799448,
      lng: 120.979021
    };
    this.destination = {
      lat: 24.799524,
      lng: 120.975017
    };

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getOrderById() {
    this.orderService.getOrderById(this.orderId).subscribe(async data => {
      this.order = data;
      const location = await this.getUserGeoToPromise();
      this.userLocation = {
        lat: location.results[0].geometry.lat,
        lng: location.results[0].geometry.lng
      };
      const merchantLocation = await this.getMerchantGeoToPromise();
      this.merchantLocation = {
        lat: merchantLocation.results[0].geometry.lat,
        lng: merchantLocation.results[0].geometry.lng
      };
      this.distance = this.locationService.calculateDistance(this.origin, this.destination)
    });
  }

  getUserGeoToPromise(): any {
    return this.locationService.forwardConvert(this.order.address.address).toPromise();
  }

  getMerchantGeoToPromise(): any {
    return this.locationService.forwardConvert(this.order.merchant.merchantProfile.address).toPromise();
  }

}
