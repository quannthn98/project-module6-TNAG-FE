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

  constructor(private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private userService: UserService,
              private orderService: OrderService,
              private alertService: AlertService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      this.id = +paraMap.get('id');
      this.getMerchantById();
      this.getCartByMerchant();
      this.getUserDeliverAddress();
    });
  }

  ngOnInit() {
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
    this.userService.getMerchantById(this.id).subscribe(data => {
        console.log(data.merchantProfile);
        this.merchant = data;
        this.merchantProfile = data.merchantProfile;
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
      if (this.addresses.length < 3) {
        this.rowLoop.push(1);
      } else {
        for (let i = 0; i < this.addresses.length; i++) {
          if (i % 2 === 0) {
            this.rowLoop.push(1);
          }
        }
      }
      console.log(data);
    });
  }

  createNewOrder(checkoutForm: NgForm) {
    this.orderService.createNewOrder({
      address: {
        id: checkoutForm.value.address
      },
      paymentMethod: {
        id: checkoutForm.value.paymentMethod
      },
      note: checkoutForm.value.note
    }, this.id).subscribe(data => {
      console.log(data);
      this.alertService.alertSuccess('Đặt hàng thành công, đơn hàng của bạn sẽ sớm được shipper tiếp nhận');
      this.router.navigateByUrl('');
    });
  }

}
