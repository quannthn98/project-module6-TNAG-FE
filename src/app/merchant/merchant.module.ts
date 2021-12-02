import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { DishListComponent } from './dish-list/dish-list.component';
import { MerchantInfoDetailComponent } from './merchant-info-detail/merchant-info-detail.component';
import {FormsModule} from '@angular/forms';
import { MerchantInfoEditComponent } from './merchant-info-edit/merchant-info-edit.component';


@NgModule({
  declarations: [DishListComponent, MerchantInfoDetailComponent, MerchantInfoEditComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    FormsModule
  ]
})
export class MerchantModule { }
