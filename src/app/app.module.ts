import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowseItemsComponent } from './browse-items/browse-items.component';
import { CategoryBrowserComponent } from './browse-items/category-browser/category-browser.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BrowseItemsComponent,
    CategoryBrowserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
