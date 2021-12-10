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
  avatar: any;
  cover: any;
  thumbnail: any;

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
    const array = [];
    this.categoryList.forEach(x => array.push({id: x}));
    this.merchantInfo.categories = array;
    const formData = new FormData();
    formData.append('name', this.merchantInfo.name);
    formData.append('address', this.merchantInfo.address);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.merchantInfo.categories.length; i++) {
      formData.append('categories', this.merchantInfo.categories[i].id);
    }
    formData.append('hotline', this.merchantInfo.hotline);
    formData.append('description', this.merchantInfo.description);
    formData.append('openHours', this.merchantInfo.openHours);
    formData.append('avatar', this.avatar);
    formData.append('cover', this.cover);
    formData.append('thumbnail', this.thumbnail);
    this.merchantService.register(this.user.id, formData).subscribe(() => {
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

  handleAvatarInput(event) {
    this.avatar = (event.target).files[0];
  }

  handleCoverInput(event) {
    this.cover = (event.target).files[0];
  }

  handleThumbnailInput(event) {
    this.thumbnail = (event.target).files[0];
  }
}
