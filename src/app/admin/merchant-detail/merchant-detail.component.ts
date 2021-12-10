import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MerchantProfile} from '../../model/merchant-profile';

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.css']
})
export class MerchantDetailComponent implements OnInit {
  merchant: MerchantProfile = {};
  id: number;
  detailMerchantForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
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
    this.userService.getMerchantByUserId(id).subscribe((user: any) => {
      this.detailMerchantForm = new FormGroup({
        id: new FormControl(user.id),
        name: new FormControl(user.name),
        email: new FormControl(user.email),
        hotline: new FormControl(user.hotline),
        openHours: new FormControl(user.openHours),
      });
      console.log(user);
    });
  }
}
