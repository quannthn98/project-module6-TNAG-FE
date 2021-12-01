import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MerchantsDetailComponent} from "./merchants-detail/merchants-detail.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'merchant/:id',
    component: MerchantsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
