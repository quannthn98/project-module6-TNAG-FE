import {Component, OnInit} from '@angular/core';
import {Dish} from '../../model/dish';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MerchantProfile} from '../../model/merchant-profile';
import {DishService} from '../../service/dish.service';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  searchText: string;
  dish: Dish;
  merchant: MerchantProfile = {};
  dishes: Dish[] = [];
  id: number;
  deleteId: number;

  constructor(private userService: UserService,
              private router: Router,
              private dishService: DishService,
              private alertService: AlertService) {
    this.id = JSON.parse(localStorage.user).id;
    this.getMerchantById();
    this.getAllDishByMerchant();
  }

  ngOnInit() {
  }

  getAllDishByMerchant() {
    this.dishService.getAllDish(this.id, this.searchText).subscribe((data: any) => {
        this.dishes = data.content;
      }, error => {
        console.log(error);
      }
    );
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

  findDishById(id) {
    this.dishService.getDishById(id).subscribe((data: any) => {
      this.dish = data;
    }, error => {
      console.log(error);
    });
  }

  showConfirmDelete(id: number) {
    this.deleteId = id;
  }

  deleteDish() {
    this.dishService.delete(this.deleteId).subscribe( (data: any) => {
      this.getAllDishByMerchant();
      this.alertService.alertSuccess('Xoá món ăn thành công');
    });
  }
}
