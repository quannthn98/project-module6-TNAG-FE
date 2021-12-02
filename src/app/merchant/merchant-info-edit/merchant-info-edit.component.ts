import {Component, OnInit} from '@angular/core';
import {MerchantService} from '../../service/merchant.service';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {MerchantProfile} from '../../model/merchant-profile';

@Component({
  selector: 'app-merchant-info-edit',
  templateUrl: './merchant-info-edit.component.html',
  styleUrls: ['./merchant-info-edit.component.css']
})
export class MerchantInfoEditComponent implements OnInit {
  categories: Category[] = [];
  user: User = {};
  id;
  merchantInfo: MerchantProfile = {};

  constructor(private userService: UserService,
              private merchantService: MerchantService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
    });
  }

  getMerchant() {
    this.userService.getOneMerchant(this.id).subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit() {
    this.getAllCategories();
    this.getMerchant();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data.content;
    });
  }

  submitEditMerchantProfile(formEditMerchantProfile) {
    this.merchantInfo = formEditMerchantProfile.value;
    this.merchantInfo.categories = {
      id: this.merchantInfo.categories
    };
    this.merchantService.updateMerchantProfile(this.user.merchantProfile.id, this.merchantInfo).subscribe(() => {
      this.router.navigate(['/merchant']);
    });
  }
}
