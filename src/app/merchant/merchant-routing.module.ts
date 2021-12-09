import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DishListComponent} from './dish-list/dish-list.component';
import {MerchantInfoDetailComponent} from './merchant-info-detail/merchant-info-detail.component';
import {MerchantInfoEditComponent} from './merchant-info-edit/merchant-info-edit.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {EditDishComponent} from './edit-dish/edit-dish.component';
import {DishCreateComponent} from './dish-create/dish-create.component';
import {OrderListComponent} from './order-list/order-list.component';
import {CouponListComponent} from './coupon-list/coupon-list.component';
import {CouponCreateComponent} from './coupon-create/coupon-create.component';
import {CouponEditComponent} from './coupon-edit/coupon-edit.component';

const routes: Routes = [
  {
    path: 'coupon/edit/:id',
    component: CouponEditComponent
  },
  {
    path: 'coupon-create',
    component: CouponCreateComponent
  },
  {
    path: 'coupon',
    component: CouponListComponent
  },
  {
    path: 'dish/create',
    component: DishCreateComponent
  },
  {
    path: 'dish/edit/:id',
    component: EditDishComponent
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent
  },
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
  },
  {
    path: ':id/order',
    component: OrderListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {
}
