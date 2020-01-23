import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { AdvancedWijmoGridDemoComponent } from "./wijmo-grid/advanced-wrapper-wijmo-grid-demo/advanced-wijmo-grid-demo.component";

const routes: Routes = [
  { path: 'advanced-wijmo-grid-demo', component: AdvancedWijmoGridDemoComponent },
  { path: '**', component: AdvancedWijmoGridDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
