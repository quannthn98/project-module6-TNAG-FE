import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipperRoutingModule } from './shipper-routing.module';
import { ShipperDetailComponent } from './shipper-detail/shipper-detail.component';
import { ShipperOrderComponent } from './shipper-order/shipper-order.component';
import {SharedModule} from '../shared/shared.module';
import { ShippedHistoryComponent } from './shipped-history/shipped-history.component';


@NgModule({
  declarations: [ShipperDetailComponent, ShipperOrderComponent, ShippedHistoryComponent],
  imports: [
    CommonModule,
    ShipperRoutingModule,
    SharedModule
  ]
})
export class ShipperModule { }
