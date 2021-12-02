import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DishListComponent} from './dish-list/dish-list.component';
import {AddDishComponent} from './add-dish/add-dish.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import * as path from 'path';
import {EditDishComponent} from './edit-dish/edit-dish.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {
}
