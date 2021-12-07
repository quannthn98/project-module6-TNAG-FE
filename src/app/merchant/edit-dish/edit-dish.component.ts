import {Component, OnInit} from '@angular/core';
import {Dish} from '../../model/dish';
import {ActivatedRoute, Router} from '@angular/router';
import {DishService} from '../../service/dish.service';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  dish: Dish = {};
  id;
  image;

  constructor(private activatedRoute: ActivatedRoute,
              private dishService: DishService,
              private router: Router,
              private alertService: AlertService) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
    });
  }

  ngOnInit() {
    this.getDish();
  }

  getDish() {
    this.dishService.getDishById(this.id).subscribe(data => {
      this.dish = data;
    });
  }

  submitEditDish(formEditDish) {
    const formData = new FormData();
    if (this.image != null) {
      formData.append('image', this.image);
    }
    formData.append('name', formEditDish.value.name);
    formData.append('price', formEditDish.value.price);
    formData.append('description', formEditDish.value.description);
    formData.append('status', formEditDish.value.status);
    this.dishService.updateDish(this.id, formData).subscribe(() => {
      this.router.navigate(['/merchant']);
      this.alertService.alertSuccess('Cập nhật thành công');
    });
  }

  handleFileInput(event) {
    if (event !== undefined) {
      this.image = (event.target).files[0];
    } else {
      this.image = null;
    }
  }
}
