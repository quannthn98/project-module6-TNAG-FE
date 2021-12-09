import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {HomeComponent} from './home/home.component';
import {MerchantsComponent} from './merchant-list/merchants.component';
import {MerchantsDetailComponent} from './merchants-detail/merchants-detail.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {CartComponent} from './cart/cart.component';
import {SharedModule} from '../shared/shared.module';
import {MerchantRegisterComponent} from './merchant-register/merchant-register.component';
import {FormsModule} from '@angular/forms';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {SearchcategoryComponent} from './searchcategory/searchcategory.component';
import {ShipperRegisterComponent} from './shipper-register/shipper-register.component';
import {TrackOrderComponent} from './track-order/track-order.component';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';


@NgModule({
  declarations: [HomeComponent, MerchantsComponent, MerchantsDetailComponent, CheckoutComponent, CartComponent, MerchantRegisterComponent, UserDetailComponent, ShipperRegisterComponent, TrackOrderComponent, SearchcategoryComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCP74ZUbCJ6zKeNqbh3LNej4nDX_VmtvNA'
    }),
    AgmDirectionModule
  ]
})
export class UserModule {
}
