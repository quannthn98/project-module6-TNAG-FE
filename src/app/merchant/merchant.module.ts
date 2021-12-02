import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { DishListComponent } from './dish-list/dish-list.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { EditDishComponent } from './edit-dish/edit-dish.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [DishListComponent, AddDishComponent, EditDishComponent, EditProfileComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule
  ]
})
export class MerchantModule { }
