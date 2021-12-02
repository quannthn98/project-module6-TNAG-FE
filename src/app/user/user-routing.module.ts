import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MerchantsComponent} from './merchant-list/merchants.component';
import {MerchantsDetailComponent} from "./merchants-detail/merchants-detail.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'merchant/register',
    component: MerchantsComponent
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
