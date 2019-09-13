import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdleComponent } from './idle/idle.component';
import { BrowseOptionComponent } from './browse-option/browse-option.component';
import { CategoryOptionComponent } from './category-option/category-option.component';
import { SubcategoryOptionComponent } from './subcategory-option/subcategory-option.component';
import { ItemOptionComponent } from './item-option/item-option.component';
import { UnitOptionComponent } from './unit-option/unit-option.component';
import { LockerOptionComponent } from './locker-option/locker-option.component';
import { ReturnItemsComponent } from './return-items/return-items.component';
import { ReportIssueComponent } from './report-issue/report-issue.compoenent';
import { EmergencyReturnComponent } from './emergency-return/emergency-return.component';
import { AllItemComponent} from './all-item/all-item.component'
import { from } from 'rxjs';



const routes: Routes = [
  { path: 'browse-option', component: BrowseOptionComponent, data: {animation: 'BrowseOption'} },
  { path: 'category-option', component: CategoryOptionComponent , data: {animation: 'CategoryOption'} },
  { path: 'subcategory-option', component: SubcategoryOptionComponent , data: {animation: 'SubcategoryOption'} },
  { path: 'item-option', component: ItemOptionComponent , data: {animation: 'ItemOption'} },
  { path: 'unit-option', component: UnitOptionComponent , data: {animation: 'UnitOption'} },
  { path: 'locker-option', component: LockerOptionComponent , data: {animation: 'LockerOption'} },
  { path: 'return-items', component: ReturnItemsComponent , data: {animation: 'ReturnItems'} },
  { path: 'report-issue', component: ReportIssueComponent , data: {animation: 'ReportIssue'} },
  { path: 'emergency-return', component: EmergencyReturnComponent , data: {animation: 'EmergencyReturn'} },
  { path: 'all-item', component: AllItemComponent , data: {animation: 'AllItem'} },
  { path: '**', component: IdleComponent, data: {animation: 'Home'} },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
