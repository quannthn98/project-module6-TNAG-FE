import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DishListComponent} from './dish-list/dish-list.component';
<<<<<<< HEAD
import {MerchantInfoDetailComponent} from './merchant-info-detail/merchant-info-detail.component';
import {MerchantInfoEditComponent} from './merchant-info-edit/merchant-info-edit.component';
=======
import {AddDishComponent} from './add-dish/add-dish.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import * as path from 'path';
import {EditDishComponent} from './edit-dish/edit-dish.component';

>>>>>>> 044337d9c025201775446313ed9f2df1003117c8

const routes: Routes = [
  {
    path: 'add',
    component: AddDishComponent
  },
  {
    path: 'dish/edit',
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
