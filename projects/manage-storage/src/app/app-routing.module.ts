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
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers', component: LockerListComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers/:lockerId/units', component: UnitListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/:categoryId/subcategories', component: SubcategoryListComponent },
  { path: 'categories/:categoryId/subcategories/:subcategoryId/items', component: ItemListComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
