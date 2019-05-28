import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { MainComponent } from './main/main.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryFormComponent } from './country/country-form/country-form.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { SiteFormComponent } from './site/site-form/site-form.component';
import { SiteDetailComponent } from './site/site-detail/site-detail.component';
import { ContainerListComponent } from './container/container-list/container-list.component';
import { ContainerDetailComponent } from './container/container-detail/container-detail.component';
import { ContainerFormComponent } from './container/container-form/container-form.component';
import { LockerFormComponent } from './locker/locker-form/locker-form.component';
import { LockerListComponent } from './locker/locker-list/locker-list.component';
import { LockerDetailComponent } from './locker/locker-detail/locker-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    CountryListComponent,
    CountryFormComponent,
    CountryDetailComponent,
    BreadcrumbComponent,
    SiteListComponent,
    SiteFormComponent,
    SiteDetailComponent,
    ContainerListComponent,
    ContainerDetailComponent,
    ContainerFormComponent,
    LockerFormComponent,
    LockerListComponent,
    LockerDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
