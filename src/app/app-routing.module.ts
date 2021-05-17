import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryReportsComponent } from './country-report/country-reports.component';
import { WorldReportsComponent } from './world-report/world-reports.component';


const routes: Routes = [
  { path: '', component: WorldReportsComponent },
  { path: 'wold-report', component: WorldReportsComponent },
  { path: 'country-report', component: CountryReportsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
