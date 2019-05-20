import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowseItemsComponent } from './browse-items/browse-items.component';
import { CategoryBrowserComponent } from './browse-items/category-browser/category-browser.component';
import { ItemBrowserComponent } from './browse-items/item-browser/item-browser.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BrowseItemsComponent,
    CategoryBrowserComponent,
    ItemBrowserComponent,
    MyDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MomentModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
