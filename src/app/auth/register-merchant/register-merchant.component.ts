import {Component, OnInit} from '@angular/core';
import {MerchantProfile} from '../../model/merchant-profile';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {MerchantService} from '../../service/merchant.service';
import {AuthenticationService} from '../../service/authentication.service';
import {User} from '../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-merchant',
  templateUrl: './register-merchant.component.html',
  styleUrls: ['./register-merchant.component.css']
})
export class RegisterMerchantComponent implements OnInit {
  merchantProfile: MerchantProfile = {};
  searchText;
  categories: Category[] = [];
  categoryArray: any[] = [];
  categoryList: any[] = [];
  merchantInfo: MerchantProfile = {};
  user: User = {};

  constructor(private categoryService: CategoryService,
              private merchantService: MerchantService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.user = authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data.content;
    });
  }

  submitRegisterMerchant(formRegisterMerchant) {
    this.merchantInfo = formRegisterMerchant.value;
    let array = [];
    this.categoryList.forEach(x => array.push({id: x}));
    this.merchantInfo.categories = array;
    this.merchantService.register(this.user.id, formRegisterMerchant.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  inputIdCategory(id) {
    if (this.categoryList.includes(id)) {
      this.categoryList = this.categoryList.filter(x => x !== id);
    } else {
      this.categoryList.push(id);
    }
    this.merchantInfo.categories = this.categoryList;
  }
}
