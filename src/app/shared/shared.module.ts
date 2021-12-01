import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [NavbarHomeComponent, FooterComponent, NavbarComponent],
  exports: [
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
