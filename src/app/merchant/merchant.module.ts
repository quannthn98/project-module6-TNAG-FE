import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { DishListComponent } from './dish-list/dish-list.component';


@NgModule({
  declarations: [DishListComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule
  ]
})
export class MerchantModule { }
