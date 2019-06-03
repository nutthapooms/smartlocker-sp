import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdleComponent } from './idle/idle.component';
import { BrowseOptionComponent } from './browse-option/browse-option.component';

const routes: Routes = [
  { path: 'browse-option', component: BrowseOptionComponent },
  { path: '**', component: IdleComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
