import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { DishListComponent } from './dish-list/dish-list.component';
<<<<<<< HEAD
import { MerchantInfoDetailComponent } from './merchant-info-detail/merchant-info-detail.component';
import {FormsModule} from '@angular/forms';
import { MerchantInfoEditComponent } from './merchant-info-edit/merchant-info-edit.component';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


@NgModule({
  declarations: [DishListComponent, MerchantInfoDetailComponent, MerchantInfoEditComponent],
=======
import { AddDishComponent } from './add-dish/add-dish.component';
import { EditDishComponent } from './edit-dish/edit-dish.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [DishListComponent, AddDishComponent, EditDishComponent, EditProfileComponent],
>>>>>>> 044337d9c025201775446313ed9f2df1003117c8
  imports: [
    CommonModule,
    MerchantRoutingModule,
    FormsModule,
<<<<<<< HEAD
    FilterPipeModule,
=======
    ReactiveFormsModule,
>>>>>>> 044337d9c025201775446313ed9f2df1003117c8
    Ng2SearchPipeModule
  ]
})
export class MerchantModule { }
