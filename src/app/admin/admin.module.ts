import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListComponent } from './merchant/list/list.component';
import { PendingMerchantComponent } from './merchant/pending-merchant/pending-merchant.component';
import { UpdateComponent } from './merchant/edit/update.component';
import { DetailComponent } from './merchant/detail/detail.component';
import { EditComponent } from './merchant/edit/edit.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { MerchantPendingComponent } from './merchant-pending/merchant-pending.component';
import { MerchantEditComponent } from './merchant-edit/merchant-edit.component';


@NgModule({
  declarations: [ListComponent, PendingMerchantComponent, UpdateComponent, DetailComponent, EditComponent, MerchantListComponent, MerchantDetailComponent, MerchantPendingComponent, MerchantEditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
