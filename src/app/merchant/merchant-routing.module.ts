import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DishListComponent} from './dish-list/dish-list.component';
import {MerchantInfoDetailComponent} from './merchant-info-detail/merchant-info-detail.component';
import {MerchantInfoEditComponent} from './merchant-info-edit/merchant-info-edit.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {EditDishComponent} from './edit-dish/edit-dish.component';
import {DishCreateComponent} from './dish-create/dish-create.component';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {
}
