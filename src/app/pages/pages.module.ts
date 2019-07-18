import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../@theme/theme.module';
import { ECommerceLegendChartComponent } from '../legend-chart/legend-chart.component';
import { ECommerceVisitorsStatisticsComponent } from '../visitors-analytics/visitors-statistics/visitors-statistics.component';
import { ECommerceVisitorsAnalyticsComponent } from '../visitors-analytics/visitors-analytics.component';
import { ECommerceVisitorsAnalyticsChartComponent } from '../visitors-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import { SlideOutComponent } from '../slide-out/slide-out.component';
import { Ng2OdometerModule } from 'ng2-odometer';
import { AgmCoreModule } from '@agm/core';
import { OutletDetailsComponent } from './outlet-details/outlet-details.component';
import { NbCardModule, NbProgressBarModule} from '@nebular/theme';
import { CampaignsComponent } from './campaigns/campaigns.component';


import { GmapsComponent } from './gmaps/gmaps.component';
import { RevealCardComponent } from './shared/reveal-card/reveal-card.component';
import { HistoryCardComponent } from './shared/history-card/history-card.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { DataBootstrapService } from './shared/services/data-bootstrap.service';
import { MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { DialogueService } from './shared/services/dialogue.service';
import { HourPipe } from './shared/pipes/hour.pipe';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ECommerceVisitorsAnalyticsChartComponent,
    ECommerceVisitorsAnalyticsComponent,
    ECommerceVisitorsStatisticsComponent,
    ECommerceLegendChartComponent,
    SlideOutComponent,
    OutletDetailsComponent,
    CampaignsComponent,
    GmapsComponent,
    RevealCardComponent,
    HistoryCardComponent,
    CampaignDetailsComponent,
    HourPipe,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxChartsModule,
    NgxEchartsModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    Ng2OdometerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByMZrm3oE7aJOHK7sqXrJwN3KmRHYjn98'
    }),
    NbCardModule,
    NbProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule
  ],
  providers:[DataBootstrapService , DialogueService]
})
export class PagesModule { }
