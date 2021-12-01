import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { MerchantsComponent } from './merchant-list/merchants.component';
import { MerchantsDetailComponent } from './merchants-detail/merchants-detail.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import {SharedModule} from '../shared/shared.module';
import { UpdateStatusComponent } from './update-status/update-status.component';


@NgModule({
  declarations: [HomeComponent, MerchantsComponent, MerchantsDetailComponent, OrderHistoryComponent, CheckoutComponent, CartComponent, UpdateStatusComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule
    ]
})
export class UserModule { }
