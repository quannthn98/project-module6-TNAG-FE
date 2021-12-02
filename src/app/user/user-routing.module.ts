import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MerchantsComponent} from './merchant-list/merchants.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'merchant',
    component: MerchantsComponent
  },
  {
    path: 'merchant/register',
    component: MerchantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
