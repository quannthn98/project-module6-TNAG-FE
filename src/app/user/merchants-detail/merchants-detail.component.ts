import {Component, OnInit} from '@angular/core';
import {Dish} from '../../model/dish';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-merchants-detail',
  templateUrl: './merchants-detail.component.html',
  styleUrls: ['./merchants-detail.component.css']
})
export class MerchantsDetailComponent implements OnInit {
  merchant;
  dishes: Dish[] = [];
  id: number;

  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(paraMap => {
      this.id = +paraMap.get('id');
      this.getMerchantById();
      this.getAllDishByMerchant();
    });
  }

  ngOnInit() {
  }

  getAllDishByMerchant() {
    this.userService.getAllDishByMerchant(this.id).subscribe((data: any) => {
        console.log(data.content);
        this.dishes = data.content;
      }, error => {
        console.log(error);
        alert(error);
      }
    );
  }

  private getMerchantById() {
    this.userService.getMerchantById(this.id).subscribe(data => {
        console.log(data.merchantProfile);
        this.merchant = data;
      }, error => {
        console.log(error);
        alert(error);
      }
    );
  }

}
