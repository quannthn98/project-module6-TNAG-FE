import {Component, OnInit} from '@angular/core';
import {Dish} from '../../model/dish';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {DishService} from '../../service/dish.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {MerchantProfile} from '../../model/merchant-profile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dish-create',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.css']
})
export class DishCreateComponent implements OnInit {
  dish: Dish = {};
  categories: Category[] = [];
  image;
  id;
  merchant: MerchantProfile = {};

  constructor(private categoryService: CategoryService,
              private dishService: DishService,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.id = this.authenticationService.currentUserValue.id;
  }

  ngOnInit() {
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data.content;
    });
  }

  submitCreateDish(formCreateDish) {
    const formData = new FormData();
    formData.append('name', formCreateDish.value.name);
    formData.append('description', formCreateDish.value.description);
    formData.append('price', formCreateDish.value.price);
    formData.append('image', this.image);
    this.dishService.create(formData).subscribe(() => {
      this.router.navigate(['/merchant']);
      this.alertSuccess();
    });
  }

  handleFileInput(event) {
    this.image = (event.target).files[0];
  }

  alertSuccess() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Thêm mới thành công',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
