import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailRoutingModule } from './user-detail-routing.module';
import { InfoComponent } from './info/info.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { OrdersComponent } from './orders/orders.component';
import { AddressComponent } from './address/address.component';


@NgModule({
  declarations: [InfoComponent, OrdersComponent, AddressComponent],
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class UserDetailModule { }
