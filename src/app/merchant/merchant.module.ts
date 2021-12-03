import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { DishListComponent } from './dish-list/dish-list.component';
import { MerchantInfoDetailComponent } from './merchant-info-detail/merchant-info-detail.component';
import {FormsModule} from '@angular/forms';
import { MerchantInfoEditComponent } from './merchant-info-edit/merchant-info-edit.component';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


@NgModule({
  declarations: [DishListComponent, MerchantInfoDetailComponent, MerchantInfoEditComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    FormsModule,
    FilterPipeModule,
    Ng2SearchPipeModule
  ]
})
export class MerchantModule { }
