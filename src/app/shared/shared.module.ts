import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavbarMerchantComponent} from './navbar-merchant/navbar-merchant.component';
import {FooterMerchantComponent} from './footer-merchant/footer-merchant.component';
import {SidebarAdminComponent} from './sidebar-admin/sidebar-admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidebarUserComponent} from './sidebar-user/sidebar-user.component';
import {SidebarShipperComponent} from './sidebar-shipper/sidebar-shipper.component';


@NgModule({
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, NavbarMerchantComponent, FooterMerchantComponent, SidebarAdminComponent, SidebarUserComponent, SidebarShipperComponent],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarMerchantComponent,
    FooterMerchantComponent,
    SidebarAdminComponent,
    SidebarUserComponent,
    SidebarShipperComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
