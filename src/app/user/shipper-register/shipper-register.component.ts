import { Component, OnInit } from '@angular/core';
import {ShipperProfile} from '../../model/shipper-profile';

@Component({
  selector: 'app-shipper-register',
  templateUrl: './shipper-register.component.html',
  styleUrls: ['./shipper-register.component.css']
})
export class ShipperRegisterComponent implements OnInit {
  shipperProfile: ShipperProfile = {};

  constructor() { }

  ngOnInit() {
  }

}
