import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutMerchantComponent } from './layout-merchant/layout-merchant.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import {SharedModule} from '../shared/shared.module';
import { LayoutUserDetailComponent } from './layout-user-detail/layout-user-detail.component';
import { LayoutShipperComponent } from './layout-shipper/layout-shipper.component';


@NgModule({
  declarations: [LayoutMerchantComponent, LayoutAdminComponent, LayoutUserDetailComponent, LayoutShipperComponent],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        SharedModule
    ]
})
export class LayoutModule { }
