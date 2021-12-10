import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {MerchantProfile} from '../../model/merchant-profile';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {DishService} from '../../service/dish.service';
import {Dish} from '../../model/dish';

@Component({
  selector: 'app-dish-list-by-merchant',
  templateUrl: './dish-list-by-merchant.component.html',
  styleUrls: ['./dish-list-by-merchant.component.css']
})
export class DishListByMerchantComponent implements OnInit {
  merchants: MerchantProfile[] = [];
  dishes: Dish[] = [];
  dish: Dish = {};
  id;
  merchant: MerchantProfile = {};

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private dishService: DishService) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
    });
  }

  ngOnInit() {
    this.getAllMerchant();
    this.getAllDishByMerchant();
    this.getMerchantById();
  }

  getAllMerchant() {
    this.userService.getAllMerchant().subscribe((data: any) => {
      this.merchants = data.merchantProfile;
    });
  }

  getMerchantById() {
    this.userService.getMerchantByUserId(this.id).subscribe(data => {
      this.merchant = data.merchantProfile;
    });
  }

  getAllDishByMerchant() {
    this.dishService.getAllDish(this.id).subscribe((data: any) => {
      this.dishes = data.content;
    });
  }

  findDishById(id) {
    this.dishService.getDishById(id).subscribe(data => {
      this.dish = data;
    });
  }
}
