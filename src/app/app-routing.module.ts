import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseItemsComponent } from './browse-items/browse-items.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';

const routes: Routes = [
  { path: 'browse-items', component: BrowseItemsComponent },
  { path: 'my-dashboard', component: MyDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
