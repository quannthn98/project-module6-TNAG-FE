import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantHomeComponent } from './merchant-home/merchant-home.component';


@NgModule({
  declarations: [MerchantHomeComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule
  ]
})
export class MerchantModule { }
