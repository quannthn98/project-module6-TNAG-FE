import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-merchant-info-edit',
  templateUrl: './merchant-info-detail.component.html',
  styleUrls: ['./merchant-info-detail.component.css']
})
export class MerchantInfoDetailComponent implements OnInit {
  id;
  user: User = {};

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
    });
  }

  ngOnInit() {
    this.getMerchant();
  }

  getMerchant() {
    this.userService.getMerchantByUserId(this.id).subscribe(data => {
      this.user = data;
    });
  }
}
