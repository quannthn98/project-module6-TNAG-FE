import {Component, OnInit} from '@angular/core';
import {Dish} from '../../model/dish';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Cart} from '../../model/cart';
import {CartDetail} from '../../model/cart-detail';
import {CartService} from '../../service/cart.service';
import {DishService} from '../../service/dish.service';

@Component({
  selector: 'app-merchants-detail',
  templateUrl: './merchants-detail.component.html',
  styleUrls: ['./merchants-detail.component.css']
})
export class MerchantsDetailComponent implements OnInit {
  merchant;
  cart: Cart;
  cartDetails: CartDetail[] = [];
  dishes: Dish[] = [];
  id: number;
  estimatePayment = 0;

  constructor(private userService: UserService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private cartService: CartService,
              private dishService: DishService) {
    this.activeRoute.paramMap.subscribe(paraMap => {
      this.id = +paraMap.get('id');
      this.getMerchantById();
      this.getAllDishByMerchant();
      this.getCartByMerchant();
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

  addDishToCart(dishId: number, direction: string) {
    this.cartService.addToCart(dishId, direction).subscribe(data => {
      this.getCartByMerchant();
    });
  }

  private getMerchantById() {
    this.userService.getMerchantById(this.id).subscribe(data => {
        console.log(data.merchantProfile);
        this.merchant = data;
      }, error => {
        console.log(error);
      }
    );
  }

}
