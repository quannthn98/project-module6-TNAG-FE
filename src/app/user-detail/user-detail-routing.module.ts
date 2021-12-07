import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InfoComponent} from './info/info.component';
import {OrdersComponent} from './orders/orders.component';


const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: '',
    component: InfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailRoutingModule { }
