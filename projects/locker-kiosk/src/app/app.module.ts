import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdleComponent } from './idle/idle.component';
import { BrowseOptionComponent } from './browse-option/browse-option.component';
import { CategoryOptionComponent } from './category-option/category-option.component';
import { SubcategoryOptionComponent } from './subcategory-option/subcategory-option.component';
import { ItemOptionComponent} from './item-option/item-option.component';
import { UnitOptionComponent } from './unit-option/unit-option.component';
import { LockerOptionComponent } from './locker-option/locker-option.component';
import { ReturnItemsComponent } from './return-items/return-items.component';
import { NavigationComponent } from './navigation/navigation.component';
import { EmergencyReturnComponent } from './emergency-return/emergency-return.component';
import { ReportIssueComponent } from './report-issue/report-issue.compoenent';
import { AllItemComponent} from './all-item/all-item.component'
import {AddUserComponent} from './add-User/addUser.component'
import { HttpClientModule} from '@angular/common/http';
import { DataService} from './data.service';
import { AlertService } from './alert.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService} from './interceptor.service';

// import{BehaviorSubject} from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    IdleComponent,
    BrowseOptionComponent,
    CategoryOptionComponent,
    SubcategoryOptionComponent,
    ItemOptionComponent,
    UnitOptionComponent,
    LockerOptionComponent,
    NavigationComponent,
    ReturnItemsComponent,
    ReportIssueComponent,
    EmergencyReturnComponent,
    AddUserComponent,
    AllItemComponent

    // DataService,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // DataService,
    // BehaviorSubject
  ],
  exports:[
    // DataService,    
  ],
  providers: [
    DataService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
