import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';
import {CouponService} from '../../service/coupon.service';
import {Coupon} from '../../model/coupon';
import {CouponType} from '../../model/coupon-type';
import {CouponTypeService} from '../../service/coupon-type.service';

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.css']
})
export class CouponEditComponent implements OnInit {
  id;
  coupon: Coupon = {};
  couponType: CouponType[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private couponService: CouponService,
              private couponTypeService: CouponTypeService) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
    });
  }

  ngOnInit() {
    this.getCouponById();
    this.getAllCouponType();
  }

  getCouponById() {
    this.couponService.findById(this.id).subscribe(data => {
      this.coupon = data;
    });
  }

  getAllCouponType() {
    this.couponTypeService.getAll().subscribe(data => {
      this.couponType = data;
    });
  }

  submitEditCoupon(formCreateCoupon) {
    this.coupon = formCreateCoupon.value;
    this.coupon.type = {
      id: this.coupon.type
    };
    this.couponService.update(this.id, this.coupon).subscribe(() => {
      this.router.navigate(['merchant/coupon']);
      this.alertService.alertSuccess('Cập nhật coupon thành công');
    }, error => this.alertService.alertError('Cập nhật coupon thất bại'));
  }
}
