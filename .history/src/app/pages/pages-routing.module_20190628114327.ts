import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';
import { CampaignsComponent } from './campaigns/campaigns.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children:[
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'outlet-details', component: OutletDetailsComponent },
      {path:'active-campaigns',component:CampaignsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
