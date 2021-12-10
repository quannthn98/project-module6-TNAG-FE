import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MerchantsDetailComponent} from './merchants-detail/merchants-detail.component';
import {MerchantRegisterComponent} from './merchant-register/merchant-register.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {ShipperRegisterComponent} from './shipper-register/shipper-register.component';
import {TrackOrderComponent} from './track-order/track-order.component';
import {SearchcategoryComponent} from './searchcategory/searchcategory.component';


const routes: Routes = [
  {
    path: 'register/merchant',
    component: MerchantRegisterComponent
  },
  {
    path: 'user/merchant/:id',
    component: MerchantsDetailComponent
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent
  },
  {
    path: 'track/order/:id',
    component: TrackOrderComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'searchCategory',
    component: SearchcategoryComponent
  },
  {
    path: 'shipperRegister',
    component: ShipperRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
