import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MerchantHomeComponent} from './merchant-home/merchant-home.component';


const routes: Routes = [
  {
    path: '',
    component: MerchantHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {
}
