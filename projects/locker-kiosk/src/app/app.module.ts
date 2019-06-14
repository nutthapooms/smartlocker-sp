import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdleComponent } from './idle/idle.component';
import { BrowseOptionComponent } from './browse-option/browse-option.component';
import { CategoryOptionComponent } from './category-option/category-option.component';
import { SubcategoryOptionComponent } from './subcategory-option/subcategory-option.component';
import { LockerOptionComponent } from './locker-option/locker-option.component';
import { NavigationComponent } from './navigation/navigation.component';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './data.service';
import{BehaviorSubject} from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    IdleComponent,
    BrowseOptionComponent,
    CategoryOptionComponent,
    SubcategoryOptionComponent,
    LockerOptionComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // DataService,
    // BehaviorSubject
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
