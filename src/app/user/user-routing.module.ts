import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MerchantsDetailComponent} from './merchants-detail/merchants-detail.component';
import {MerchantRegisterComponent} from './merchant-register/merchant-register.component';


const routes: Routes = [
  {
    path: 'merchant/register',
    component: MerchantRegisterComponent
  },
  {
    path: 'merchant/:id',
    component: MerchantsDetailComponent
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
