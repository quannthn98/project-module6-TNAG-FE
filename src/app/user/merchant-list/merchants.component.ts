import {Component, OnInit} from '@angular/core';
import {Merchant} from '../../model/merchant';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})
export class MerchantsComponent implements OnInit {
  merchants: Merchant[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }
}
