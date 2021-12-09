import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MerchantRoutingModule} from './merchant-routing.module';
import {DishListComponent} from './dish-list/dish-list.component';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {EditDishComponent} from './edit-dish/edit-dish.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MerchantInfoDetailComponent} from './merchant-info-detail/merchant-info-detail.component';
import {MerchantInfoEditComponent} from './merchant-info-edit/merchant-info-edit.component';
import {DishCreateComponent} from './dish-create/dish-create.component';
import { MerchantOrderComponent } from './merchant-order/merchant-order.component';
import { OrderListComponent } from './order-list/order-list.component';


@NgModule({
  declarations: [
    DishListComponent,
    EditDishComponent,
    EditProfileComponent,
    MerchantInfoDetailComponent,
    MerchantInfoEditComponent,
    DishCreateComponent,
    MerchantOrderComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    FormsModule,
    FilterPipeModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})

export class MerchantModule {
}
