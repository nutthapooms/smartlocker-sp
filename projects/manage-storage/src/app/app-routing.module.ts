import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryFormComponent } from './country/country-form/country-form.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { ContainerListComponent } from './container/container-list/container-list.component';
import { LockerListComponent } from './locker/locker-list/locker-list.component';
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { SubcategoryListComponent } from './subcategory/subcategory-list/subcategory-list.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { DeleteConfirmationComponent } from './shared/delete-confirmation/delete-confirmation.component';
import { SiteDetailComponent } from './site/site-detail/site-detail.component';
import { SiteFormComponent } from './site/site-form/site-form.component';
import { ContainerFormComponent } from './container/container-form/container-form.component';
import { ItemFormComponent } from './item/item-form/item-form.component';
import { LockerFormComponent } from './locker/locker-form/locker-form.component';
import { UnitFormComponent } from './unit/unit-form/unit-form.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { SubcategoryFormComponent } from './subcategory/subcategory-form/subcategory-form.component';
import { ItemUnitListComponent } from './item-unit/item-unit-list/item-unit-list.component';
import { ItemUnitFormComponent } from './item-unit/item-unit-form/item-unit-form.component';
import { EventLogComponent } from './eventlog/eventlog.component';
import { EmailComponent } from './Email/email.component';

const routes: Routes = [
  { path: 'countries', component: CountryListComponent },
  { path: 'countries/add', component: CountryFormComponent },
  { path: 'countries/:countryId', component: CountryDetailComponent },
  { path: 'countries/:countryId/edit', component: CountryFormComponent },
  { path: 'countries/:countryId/delete', component: DeleteConfirmationComponent },

  { path: 'countries/:countryId/sites', component: SiteListComponent },
  { path: 'countries/:countryId/sites/add', component: SiteFormComponent },
  { path: 'countries/:countryId/sites/:siteId', component: SiteDetailComponent },
  { path: 'countries/:countryId/sites/:siteId/edit', component: SiteFormComponent },
  { path: 'countries/:countryId/sites/:siteId/delete', component: DeleteConfirmationComponent },

  { path: 'countries/:countryId/sites/:siteId/containers', component: ContainerListComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/add', component: ContainerFormComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/edit', component: ContainerFormComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/delete', component: DeleteConfirmationComponent },



  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers', component: LockerListComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers/add', component: LockerFormComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers/:lockerId/edit', component: LockerFormComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers/:lockerId/delete', component: DeleteConfirmationComponent },


  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers/:lockerId/units', component: UnitListComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers/:lockerId/units/add', component: UnitFormComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers/:lockerId/units/:barcode/lost', component: DeleteConfirmationComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers/:lockerId/units/:unitId/unassign', component: DeleteConfirmationComponent },


  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/add', component: CategoryFormComponent },
  { path: 'categories/:categoryId/edit', component: CategoryFormComponent },
  { path: 'categories/:categoryId/delete', component: DeleteConfirmationComponent },


  { path: 'categories/:categoryId/subcategories', component: SubcategoryListComponent },
  { path: 'categories/:categoryId/subcategories/add', component: SubcategoryFormComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/edit', component: SubcategoryFormComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/delete', component: DeleteConfirmationComponent },



  { path: 'categories/:categoryId/subcategories/:subcategoryId/items', component: ItemListComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/items/add', component: ItemFormComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/items/:itemId/edit', component: ItemFormComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/items/:itemId/delete', component: DeleteConfirmationComponent },

  { path: 'categories/:categoryId/subcategories/:subcategoryId/items/:itemId/units', component: ItemUnitListComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/items/:itemId/units/add', component: ItemUnitFormComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/items/:itemId/units/:unitId/edit', component: ItemUnitFormComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/items/:itemId/units/:unitId/delete', component: DeleteConfirmationComponent },

  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/eventlog', component: EventLogComponent },

  { path: 'email', component:EmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
