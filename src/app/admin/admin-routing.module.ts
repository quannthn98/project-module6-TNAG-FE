import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MerchantListComponent} from './merchant-list/merchant-list.component';
import {MerchantEditComponent} from './merchant-edit/merchant-edit.component';
import {MerchantDetailComponent} from './merchant-detail/merchant-detail.component';
import {MerchantPendingComponent} from './merchant-pending/merchant-pending.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: MerchantListComponent
  },
  {
    path: 'edit/:id',
    component: MerchantEditComponent
  },
  {
    path: 'detail/:id',
    component: MerchantDetailComponent
  },
  {
    path: 'pending',
    component: MerchantPendingComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
