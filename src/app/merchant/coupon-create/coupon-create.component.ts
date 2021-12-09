import {Component, OnInit} from '@angular/core';
import {CouponType} from '../../model/coupon-type';
import {CouponTypeService} from '../../service/coupon-type.service';
import {Coupon} from '../../model/coupon';
import {CouponService} from '../../service/coupon.service';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';
import {error} from 'protractor';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.css']
})
export class CouponCreateComponent implements OnInit {
  couponType: CouponType[] = [];
  coupon: Coupon = {};

  constructor(private couponTypeService: CouponTypeService,
              private couponService: CouponService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getAllCouponTpe();
  }

  getAllCouponTpe() {
    this.couponTypeService.getAll().subscribe(data => {
      this.couponType = data;
    });
  }

  submitCreateCoupon(formCreateDish) {
    this.coupon = formCreateDish.value;
    this.coupon.type = {
      id: this.coupon.type
    };
    this.couponService.create(this.coupon).subscribe(() => {
      this.router.navigate(['/merchant/coupon']);
      this.alertService.alertSuccess('Thêm mới coupon thành công');
    }, error => {
      this.alertService.alertError('Thêm mới coupon thất bại');
    });
  }
}
