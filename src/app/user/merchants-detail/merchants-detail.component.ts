import {Component, OnInit} from '@angular/core';
import {Dish} from '../../model/dish';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Cart} from '../../model/cart';
import {CartDetail} from '../../model/cart-detail';
import {CartService} from '../../service/cart.service';
import {DishService} from '../../service/dish.service';
import {Coupon} from '../../model/coupon';
import {CouponService} from '../../service/coupon.service';
import {User} from '../../model/user';
import {AlertService} from '../../service/alert.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-merchants-detail',
  templateUrl: './merchants-detail.component.html',
  styleUrls: ['./merchants-detail.component.css']
})
export class MerchantsDetailComponent implements OnInit {
  merchant: User;
  cart: Cart;
  cartDetails: CartDetail[] = [];
  dishes: Dish[] = [];
  id: number;
  estimatePayment = 0;
  coupons: Coupon[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private cartService: CartService,
              private dishService: DishService,
              private couponService: CouponService,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) {
    this.activeRoute.paramMap.subscribe(paraMap => {
      this.id = +paraMap.get('id');
      this.getMerchantById();

    });
  }

  ngOnInit() {
  }

  getAllDishByMerchant() {
    this.dishService.getAllDish(this.id).subscribe((data: any) => {
        this.dishes = data.content;
      }, error => {
        console.log(error);
      }
    );
  }

  getCouponByMerchant() {
    this.couponService.getAllByMerchant(this.merchant.merchantProfile.id).subscribe(data => {
      this.coupons = data;
      for (let i = 0; i < this.coupons.length; i++) {
        console.log(this.coupons[i].type.name);
      }
    });
  }

  getCartByMerchant() {
    if (this.authenticationService.currentUserValue != null) {
      this.cartService.getCartByMerchant(this.id).subscribe(data => {
        this.cart = data;
        this.cartDetails = data.cartDetails;
        this.estimatePayment = 0;
        for (let i = 0; i < this.cartDetails.length; i++) {
          this.estimatePayment += this.cartDetails[i].price * this.cartDetails[i].quantity;
        }
        console.log('my Cart: ' + data.cartDetails[0].dish.name);
      });
    }
  }

  addDishToCart(dishId: number, direction: string) {
    this.cartService.addToCart(dishId, direction).subscribe(data => {
      this.getCartByMerchant();
    });
  }

  private getMerchantById() {
    this.userService.getMerchantById(this.id).subscribe(data => {
        this.merchant = data;
        this.getAllDishByMerchant();
        this.getCartByMerchant();
        this.getCouponByMerchant();
      }, error => {
        console.log(error);
      }
    );
  }

  goToCheckout() {
    if (this.cartDetails.length <= 0) {
      this.alertService.alertError('Bạn cần thêm món ăn vào giỏ hàng trước khi thanh toán');
    } else {
      this.router.navigateByUrl(`/checkout/${this.id}`);
    }
  }
}
