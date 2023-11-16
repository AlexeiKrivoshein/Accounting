import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from 'src/account/account-list/account-list.component';
import { CategoryListComponent } from 'src/category/category-list/category-list.component';
import { ContractorListComponent } from 'src/contractor/contractor-list/contractor-list.component';
import { MovementListComponent } from 'src/movement/movement-list/movement-list.component';
import { PlanListComponent } from 'src/plan/plan-list/plan-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'accounts',
    pathMatch: 'full',
    component: AccountListComponent,
  },
  {
    path: 'categories',
    pathMatch: 'full',
    component: CategoryListComponent,
  },
  {
    path: 'contractors',
    pathMatch: 'full',
    component: ContractorListComponent,
  },
  {
    path: 'operations',
    pathMatch: 'full',
    component: MovementListComponent,
  },
  {
    path: 'plans',
    pathMatch: 'full',
    component: PlanListComponent,
  },
  { path: '**', component: HomeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
