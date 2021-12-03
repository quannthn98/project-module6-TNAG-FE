import { Component, OnInit } from '@angular/core';
import {Merchant} from '../../model/merchant';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.css']
})
export class MerchantDetailComponent implements OnInit {
  merchant: Merchant = {};
  id: number;
  detailMerchantForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    address: new FormControl(),
    hotline: new FormControl(),
    openHours: new FormControl(),
  });

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getMerchant(this.id);
    });
  }

  ngOnInit() {
  }

  getMerchant(id) {
    this.userService.getMerchantById(id).subscribe((merchant: any) => {
      this.detailMerchantForm = new FormGroup({
        id: new FormControl(merchant.id),
        name: new FormControl(merchant.name),
        address: new FormControl(merchant.address),
        hotline: new FormControl(merchant.hotline),
        openHours: new FormControl(merchant.openHours),
      });
    });
  }
}
