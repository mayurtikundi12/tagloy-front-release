import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletDetailsRoutingModule } from './outlet-details-routing.module';
import { OutletDetailsComponent } from './outlet-details.component';

@NgModule({
  declarations: [OutletDetailsComponent],
  imports: [
    CommonModule,
    OutletDetailsRoutingModule
  ]
})
export class OutletDetailsModule { }
