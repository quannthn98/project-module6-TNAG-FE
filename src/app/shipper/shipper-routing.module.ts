import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShipperOrderComponent} from './shipper-order/shipper-order.component';
import {ShipperDetailComponent} from './shipper-detail/shipper-detail.component';
import {ShippedHistoryComponent} from './shipped-history/shipped-history.component';


const routes: Routes = [
  {
    path: 'createdOrder',
    component: ShipperOrderComponent
  },
  {
    path: 'shippedHistory',
    component: ShippedHistoryComponent
  },
  {
    path: 'shipperDetail',
    component: ShipperDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipperRoutingModule { }
