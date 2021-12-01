import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
// import {MerchantModule} from './merchant/merchant.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'merchant',
    loadChildren: () => import('./merchant/merchant.module').then(module => module.MerchantModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
