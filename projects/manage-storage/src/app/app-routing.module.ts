import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryFormComponent } from './country/country-form/country-form.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { ContainerListComponent } from './container/container-list/container-list.component';
import { LockerListComponent } from './locker/locker-list/locker-list.component';

const routes: Routes = [
  { path: 'countries', component: CountryListComponent },
  { path: 'countries/add', component: CountryFormComponent },
  { path: 'countries/:id', component: CountryDetailComponent },
  { path: 'countries/:id/edit', component: CountryFormComponent },
  { path: 'countries/:countryId/sites', component: SiteListComponent },
  { path: 'countries/:countryId/sites/:siteId/containers', component: ContainerListComponent },
  { path: 'countries/:countryId/sites/:siteId/containers/:containerId/lockers', component: LockerListComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
