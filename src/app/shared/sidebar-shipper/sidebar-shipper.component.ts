import { Component, OnInit } from '@angular/core';
import {UserToken} from '../../model/userToken';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-sidebar-shipper',
  templateUrl: './sidebar-shipper.component.html',
  styleUrls: ['./sidebar-shipper.component.css']
})
export class SidebarShipperComponent implements OnInit {
  currentShipper: UserToken = {};

  constructor() {
    this.currentShipper = JSON.parse(localStorage.getItem('user'));
  }
  ngOnInit() {
  }

}
