import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdleComponent } from './idle/idle.component';
import { BrowseOptionComponent } from './browse-option/browse-option.component';

@NgModule({
  declarations: [
    AppComponent,
    IdleComponent,
    BrowseOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
