import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MerchantListComponent} from './merchant-list/merchant-list.component';
import {MerchantEditComponent} from './merchant-edit/merchant-edit.component';
import {MerchantDetailComponent} from './merchant-detail/merchant-detail.component';
import {MerchantPendingComponent} from './merchant-pending/merchant-pending.component';
import {HomeComponent} from './home/home.component';
import {DishListByMerchantComponent} from './dish-list-by-merchant/dish-list-by-merchant.component';
import {ShipperPendingComponent} from './shipper-pending/shipper-pending.component';


const routes: Routes = [
  {
    path: 'merchant',
    component: MerchantListComponent
  },
  {
    path: 'merchant/edit/:id',
    component: MerchantEditComponent
  },
  {
    path: 'merchant/detail/:id',
    component: MerchantDetailComponent
  },
  {
    path: 'merchant/pending',
    component: MerchantPendingComponent
  },
  {
    path: '',
    component: MerchantListComponent
  },
  {
    path: 'merchant/:id/dish',
    component: DishListByMerchantComponent
  },
  {
    path: 'shipper/pending',
    component: ShipperPendingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
