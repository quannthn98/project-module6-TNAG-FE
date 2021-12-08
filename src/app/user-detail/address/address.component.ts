import {Component, OnInit} from '@angular/core';
import {UserAddress} from '../../model/user-address';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addresses: UserAddress[] = [];
  address: UserAddress = {};

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUserDeliverAddress();
  }

  getUserDeliverAddress() {
    this.userService.getAllDeliverAddressByUser().subscribe((data: any) => {
      this.addresses = data;
      console.log(data);
    });
  }


}
