import {Component, OnInit} from '@angular/core';
import {MerchantService} from '../../service/merchant.service';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {MerchantProfile} from '../../model/merchant-profile';
import Swal from 'sweetalert2';

import 'react-toastify/dist/ReactToastify.css';
import {AlertService} from '../../service/alert.service';

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
  categoryList: any[] = [];
  categoryArray: any[] = [];
  searchText;
  avatar;
  cover;
  thumbnail;

  constructor(private userService: UserService,
              private merchantService: MerchantService,
              private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService) {
    activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
    });
  }

  getMerchant() {
    this.userService.getMerchantByUserId(this.id).subscribe(data => {
      this.user = data;
      data.merchantProfile.categories.forEach(x => this.categoryArray.push(x.id));
      this.categoryList = this.categoryList.concat(this.categoryArray);
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
    let array = [];
    this.categoryList.forEach(x => array.push({id: x}));
    this.merchantInfo.categories = array;
    let formData = new FormData();
    formData.append('name', this.merchantInfo.name);
    formData.append('address', this.merchantInfo.address);
    for (let i = 0; i < this.merchantInfo.categories.length; i++) {
      formData.append('categories', this.merchantInfo.categories[i].id);
    }
    formData.append('hotline', this.merchantInfo.hotline);
    formData.append('description', this.merchantInfo.description);
    formData.append('openHours', this.merchantInfo.openHours);
    if (this.avatar != null) {
      formData.append('avatar', this.avatar);
    }
    if (this.cover != null) {
      formData.append('cover', this.cover);
    }
    if (this.thumbnail != null) {
      formData.append('thumbnail', this.thumbnail);
    }
    this.merchantService.updateMerchantProfile(this.user.merchantProfile.id, formData).subscribe(() => {
      this.router.navigate([`/merchant/${this.id}`]);
      this.alertService.alertSuccess('Cập nhật thành công');
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

  handleCoverInput(event) {
    this.cover = (event.target).files[0];
  }

  handleAvatarInput(event) {
    this.avatar = (event.target).files[0];
  }

  handleThumbnailInput(event) {
    this.thumbnail = (event.target).files[0];
  }
}
