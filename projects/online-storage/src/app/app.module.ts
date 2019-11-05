import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MyItemComponent } from './my-dashboard/my-item/my-item.component';
import { MyWatchlistComponent } from './my-dashboard/my-watchlist/my-watchlist.component';
import { ItemFilterComponent } from './browse-items/item-filter/item-filter.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { AvailabilityComponent } from './item-detail/availability/availability.component';
import { LoanComponent } from './item-detail/loan/loan.component';
import { HttpRequestInterceptor } from 'src/app/shared/auth.token';
import { DataService} from './shared/data.service';
import { AddHeaderInterceptor} from './interceptor.service'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BrowseItemsComponent,
    CategoryBrowserComponent,
    ItemBrowserComponent,
    MyDashboardComponent,
    MyItemComponent,
    MyWatchlistComponent,
    ItemFilterComponent,
    ItemDetailComponent,
    AvailabilityComponent,
    LoanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MomentModule,
    FormsModule
  ],
  providers: [
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
