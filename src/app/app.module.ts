import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
// import Wijmo modules
import { WjCoreModule } from 'wijmo/wijmo.angular2.core';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import * as wjcCore from 'wijmo/wijmo';

import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvancedWijmoGridDemoComponent } from './wijmo-grid/advanced-wrapper-wijmo-grid-demo/advanced-wijmo-grid-demo.component';

import { FFAdvancedWijmoGridComponent } from './wijmo-grid/ff-advanced-wijmo-grid/ff-advanced-wijmo-grid.component';
import { FFIdFormatterComponent } from './wijmo-grid/ff-advanced-wijmo-grid/ff-id-formatter.component';
import { FFCountryFormatterComponent } from './wijmo-grid/ff-advanced-wijmo-grid/ff-country-formatter.component';


@NgModule({
  declarations: [
    AppComponent,
    AdvancedWijmoGridDemoComponent,
    FFAdvancedWijmoGridComponent,
    FFIdFormatterComponent,
    FFCountryFormatterComponent
  ],
  imports: [
    WjCoreModule,
    WjGridModule,
    WjInputModule,
    WjGridFilterModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,    
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [FFIdFormatterComponent, FFCountryFormatterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
