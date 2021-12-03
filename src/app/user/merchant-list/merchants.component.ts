import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {MerchantProfile} from '../../model/merchant-profile';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})
export class MerchantsComponent implements OnInit {
  merchants: MerchantProfile[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }
}
