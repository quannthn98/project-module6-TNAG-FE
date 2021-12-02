import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutMerchantComponent } from './layout-merchant/layout-merchant.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LayoutMerchantComponent, LayoutAdminComponent],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        SharedModule
    ]
})
export class LayoutModule { }
