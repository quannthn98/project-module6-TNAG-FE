import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../../service/cart.service';
import {UserService} from '../../service/user.service';
import {Cart} from '../../model/cart';
import {CartDetail} from '../../model/cart-detail';
import {UserAddress} from '../../model/user-address';
import {NgForm} from '@angular/forms';
import {OrderService} from '../../service/order.service';
import {AlertService} from '../../service/alert.service';
import {SocketService} from '../../service/socket/socket.service';
import {AuthenticationService} from '../../service/authentication.service';
import {Coupon} from '../../model/coupon';
import {CouponService} from '../../service/coupon.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  id: number;
  cart: Cart;
  cartDetails: CartDetail[] = [];
  estimatePayment = 0;
  merchant;
  merchantProfile;
  addresses: UserAddress[] = [];
  rowLoop: number[] = [];
  code: string;
  coupon: Coupon;
  totalPayment;
  shippingCost = 15000;
  orderForm: any;
  selectedAddressId: number;
  coupons: Coupon[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private userService: UserService,
              private orderService: OrderService,
              private alertService: AlertService,
              private router: Router,
              private socketService: SocketService,
              private authenticationService: AuthenticationService,
              private couponService: CouponService) {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      this.id = +paraMap.get('id');
      this.getMerchantById();
      this.getCartByMerchant();
      this.getUserDeliverAddress();
      this.getAllCoupon();
    });
  }

  ngOnInit() {
    this.socketService.connectToNotify();
  }

  getAllCoupon() {

  }

  getCoupon() {
    this.couponService.findByInputCode(this.code).subscribe(data => {
      if (data.merchantProfile.id !== this.merchantProfile.id) {
        this.alertService.alertError('M?? gi???m gi?? kh??ng h???p l???');
      } else if (this.estimatePayment > data.discountCondition) {
        this.coupon = data;
        this.totalPayment = this.estimatePayment + this.shippingCost - this.coupon.discount;
        this.alertService.alertSuccess('???? ??p d???ng m?? gi???m g?? cho ????n h??ng n??y');
      } else {
        this.alertService.alertError('????n h??ng c???a b???n kh??ng ????? ??i???u ki???n s??? d???ng m?? gi???m gi?? n??y');
      }
    });
  }

  getCartByMerchant() {
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

  getMerchantById() {
    this.userService.getMerchantByUserId(this.id).subscribe(data => {
        console.log(data.merchantProfile);
        this.merchant = data;
        this.merchantProfile = data.merchantProfile;
        this.couponService.getAllByMerchant(this.merchantProfile.id).subscribe((data) => {
          this.coupons = data;
        });
      }, error => {
        console.log(error);
        alert(error);
      }
    );
  }

  addDishToCart(dishId: number, direction: string) {
    this.cartService.addToCart(dishId, direction).subscribe(data => {
      this.getCartByMerchant();
    });
  }

  getUserDeliverAddress() {
    this.userService.getAllDeliverAddressByUser().subscribe((data: any) => {
      this.addresses = data;
      this.selectedAddressId = this.addresses[0].id;
    });
  }

  createNewOrder(checkoutForm: NgForm) {
    if (this.coupon === undefined) {
      this.orderForm = {
        address: {
          id: this.selectedAddressId
        },
        paymentMethod: {
          id: checkoutForm.value.paymentMethod
        },
        totalPayment: this.estimatePayment + this.shippingCost,
        note: checkoutForm.value.note
      };
    } else {
      this.orderForm = {
        address: {
          id: this.selectedAddressId
        },
        paymentMethod: {
          id: checkoutForm.value.paymentMethod
        },
        coupon: {
          id: this.coupon.id
        },
        totalPayment: this.totalPayment,
        note: checkoutForm.value.note
      };
    }
    this.orderService.createNewOrder(this.orderForm, this.id).subscribe(data => {
      console.log(data);
      this.socketService.sendNotification('????n h??ng m???i', this.authenticationService.currentUserValue.id, this.id);
      this.alertService.alertSuccess('?????t h??ng th??nh c??ng, ????n h??ng c???a b???n s??? s???m ???????c shipper ti???p nh???n');
      this.router.navigateByUrl(`/track/order/${data.id}`);
    });
  }

  setSelectedAddress(id: number) {
    this.selectedAddressId = id;
  }
}

