import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutletDetailsComponent } from './outlet-details.component';

const routes: Routes = [{
  path:'',
  component: OutletDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutletDetailsRoutingModule { }
