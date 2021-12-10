import {Component, OnInit} from '@angular/core';
import {Coupon} from '../../model/coupon';
import {CouponService} from '../../service/coupon.service';
import {User} from '../../model/user';
import {AuthenticationService} from '../../service/authentication.service';
import {UserToken} from '../../model/userToken';
import {MerchantService} from '../../service/merchant.service';
import {UserService} from '../../service/user.service';
import {MerchantProfile} from '../../model/merchant-profile';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {
  coupons: Coupon[] = [];
  currentUser: UserToken = {};
  merchant: User;
  id;

  constructor(private couponService: CouponService,
              private authentication: AuthenticationService,
              private userService: UserService,
              private alertService: AlertService) {
    this.currentUser = this.authentication.currentUserValue;
  }

  ngOnInit() {
    this.getMerchant();
  }

  getMerchant() {
    this.userService.getMerchantByUserId(this.currentUser.id).subscribe(data => {
      this.merchant = data;
      this.getAllCoupons();
    });
  }

  getAllCoupons() {
    this.couponService.getAllByMerchant(this.merchant.merchantProfile.id).subscribe(data => {
      this.coupons = data;
    });
  }

  submitDeleteCoupon() {
    this.couponService.delete(this.id).subscribe(() => {
      this.getAllCoupons();
      this.alertService.alertSuccess('Xóa thành công');
    });
  }

  findCouponById(id) {
    this.id = id;
  }
}
