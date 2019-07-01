import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletDetailsRoutingModule } from './outlet-details-routing.module';
import { OutletDetailsComponent } from './outlet-details.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [OutletDetailsComponent],
  imports: [
    CommonModule,
    OutletDetailsRoutingModule,
    ChartsModule
  ]
})
export class OutletDetailsModule { }
