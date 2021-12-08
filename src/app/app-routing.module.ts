import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {LayoutMerchantComponent} from './layout/layout-merchant/layout-merchant.component';
import {LayoutAdminComponent} from './layout/layout-admin/layout-admin.component';
import {AuthGuard} from './auth/helper/auth-guard';
import {RegisterMerchantComponent} from './auth/register-merchant/register-merchant.component';
import {MerchantGuard} from './auth/helper/merchant-guard';
import {LayoutUserDetailComponent} from './layout/layout-user-detail/layout-user-detail.component';
import {RegisterShipperComponent} from './auth/register-shipper/register-shipper.component';

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
    path: 'register/shipper',
    component: RegisterShipperComponent
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
    path: 'detail',
    component: LayoutUserDetailComponent,
    loadChildren: () => import('./user-detail/user-detail.module').then(module => module.UserDetailModule)
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
