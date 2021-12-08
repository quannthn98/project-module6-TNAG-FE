import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InfoComponent} from './info/info.component';
import {OrdersComponent} from './orders/orders.component';
import {AddressComponent} from './address/address.component';


const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'address',
    component: AddressComponent
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
