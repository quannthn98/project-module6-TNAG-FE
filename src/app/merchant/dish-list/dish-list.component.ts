import {Component, OnInit} from '@angular/core';
import {Dish} from '../../model/dish';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MerchantProfile} from '../../model/merchant-profile';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  searchText: string;
  merchant: MerchantProfile = {};
  dishes: Dish[] = [];
  id: number;

  constructor(private userService: UserService, private router: Router) {
    this.id = JSON.parse(localStorage.user).id;
    this.getMerchantById();
    this.getAllDishByMerchant();
  }

  ngOnInit() {
  }

  getAllDishByMerchant() {
    this.userService.getAllDishByMerchant(this.id, this.searchText).subscribe((data: any) => {
        console.log(data.content);
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

}
