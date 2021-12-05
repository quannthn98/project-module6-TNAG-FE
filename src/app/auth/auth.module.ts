import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { RegisterMerchantComponent } from './register-merchant/register-merchant.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, RegisterMerchantComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        FormsModule,
        Ng2SearchPipeModule
    ]
})
export class AuthModule { }
