import {Component, OnInit} from '@angular/core';
import {Merchant} from '../../model/merchant';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-merchant-pending',
  templateUrl: './merchant-pending.component.html',
  styleUrls: ['./merchant-pending.component.css']
})
export class MerchantPendingComponent implements OnInit {
  id: number;
  merchants: Merchant[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getMerchantPending();
  }

  getMerchantPending() {
    this.userService.getPendingMerchant().subscribe((data: any) => {
      this.merchants = data.content;
      console.log(data.content);
    }, error => {
      console.log(error);
    });
  }
}
