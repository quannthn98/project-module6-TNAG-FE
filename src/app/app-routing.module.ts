import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {LayoutMerchantComponent} from './layout/layout-merchant/layout-merchant.component';
import {LayoutAdminComponent} from './layout/layout-admin/layout-admin.component';
import {AuthGuard} from './auth/helper/auth-guard';
import {RegisterMerchantComponent} from './auth/register-merchant/register-merchant.component';
import {MerchantGuard} from './auth/helper/merchant-guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register/merchant',
    component: RegisterMerchantComponent
  },
  {
    path: 'merchant',
    component: LayoutMerchantComponent,
    canActivate: [MerchantGuard],
    loadChildren: () => import('./merchant/merchant.module').then(module => module.MerchantModule)
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
