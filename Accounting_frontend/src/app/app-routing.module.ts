import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountEditorComponent } from 'src/account/account-editor/account-editor.component';
import { AccountListComponent } from 'src/account/account-list/account-list.component';
import { CategoryEditorComponent } from 'src/category/category-editor/category-editor.component';
import { CategoryListComponent } from 'src/category/category-list/category-list.component';
import { TemplateListComponent } from 'src/template/template-list/template-list.component';
import { AppComponent } from './app.component';
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
    path: 'templates',
    pathMatch: 'full',
    component: TemplateListComponent,
  },
  { path: '**', component: HomeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
