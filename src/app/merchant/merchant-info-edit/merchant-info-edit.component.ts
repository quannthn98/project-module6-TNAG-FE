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
    this.userService.getMerchantById(this.id).subscribe(data => {
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
    this.merchantService.updateMerchantProfile(this.user.merchantProfile.id, this.merchantInfo).subscribe(() => {
      this.router.navigate([`/merchant/${this.id}`]);
      this.alertSuccess();
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

  alertSuccess() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Cập nhật thành công',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
