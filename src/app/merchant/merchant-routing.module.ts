import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DishListComponent} from './dish-list/dish-list.component';
import {MerchantInfoDetailComponent} from './merchant-info-detail/merchant-info-detail.component';
import {MerchantInfoEditComponent} from './merchant-info-edit/merchant-info-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DishListComponent
  },
  {
    path: ':id',
    component: MerchantInfoDetailComponent
  },
  {
    path: ':id/edit',
    component: MerchantInfoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {
}
