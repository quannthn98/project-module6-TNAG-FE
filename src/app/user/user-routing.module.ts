import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MerchantsDetailComponent} from './merchants-detail/merchants-detail.component';
import {MerchantRegisterComponent} from './merchant-register/merchant-register.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {UserDetailComponent} from './user-detail/user-detail.component';


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
    path: 'detail',
    component: UserDetailComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
