import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseItemsComponent } from './browse-items/browse-items.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
  { path: 'browse-items', component: BrowseItemsComponent },
  { path: 'my-dashboard', component: MyDashboardComponent },
  { path: 'item/:itemId', component: ItemDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
