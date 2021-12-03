import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { MerchantPendingComponent } from './merchant-pending/merchant-pending.component';
import { MerchantEditComponent } from './merchant-edit/merchant-edit.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [MerchantListComponent, MerchantDetailComponent, MerchantPendingComponent, MerchantEditComponent, HomeComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
