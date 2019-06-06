import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdleComponent } from './idle/idle.component';
import { BrowseOptionComponent } from './browse-option/browse-option.component';
import { CategoryOptionComponent } from './category-option/category-option.component';
import { SubcategoryOptionComponent } from './subcategory-option/subcategory-option.component';
import { LockerOptionComponent } from './locker-option/locker-option.component';

const routes: Routes = [
  { path: 'browse-option', component: BrowseOptionComponent, data: {animation: 'BrowseOption'} },
  { path: 'category-option', component: CategoryOptionComponent , data: {animation: 'CategoryOption'} },
  { path: 'subcategory-option', component: SubcategoryOptionComponent , data: {animation: 'SubcategoryOption'} },
  { path: 'locker-option', component: LockerOptionComponent , data: {animation: 'LockerOption'} },
  { path: '**', component: IdleComponent, data: {animation: 'Home'} },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
