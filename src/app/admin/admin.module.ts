import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {MerchantListComponent} from './merchant-list/merchant-list.component';
import {MerchantDetailComponent} from './merchant-detail/merchant-detail.component';
import {MerchantPendingComponent} from './merchant-pending/merchant-pending.component';
import {MerchantEditComponent} from './merchant-edit/merchant-edit.component';
import {ApproveComponent} from './approve/approve.component';


@NgModule({
  declarations: [MerchantListComponent, MerchantDetailComponent, MerchantPendingComponent, MerchantEditComponent, ApproveComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
}
