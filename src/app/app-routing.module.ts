import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseItemsComponent } from './browse-items/browse-items.component';

const routes: Routes = [
  { path: 'browse-items', component: BrowseItemsComponent },
  { path: 'my-dashboard', component: BrowseItemsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
