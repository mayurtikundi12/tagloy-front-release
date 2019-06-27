import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../@theme/theme.module';
import { CoreModule } from '../@core/core.module';
import { ECommerceLegendChartComponent } from '../legend-chart/legend-chart.component';
import { ECommerceVisitorsStatisticsComponent } from '../visitors-analytics/visitors-statistics/visitors-statistics.component';
import { ECommerceVisitorsAnalyticsComponent } from '../visitors-analytics/visitors-analytics.component';
import { ECommerceVisitorsAnalyticsChartComponent } from '../visitors-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import { SlideOutComponent } from '../slide-out/slide-out.component';
import { Ng2OdometerModule } from 'ng2-odometer';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ECommerceVisitorsAnalyticsChartComponent,
    ECommerceVisitorsAnalyticsComponent,
    ECommerceVisitorsStatisticsComponent,
    ECommerceLegendChartComponent,
    SlideOutComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxChartsModule,
    NgxEchartsModule,
    ChartModule,
    LeafletModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    Ng2OdometerModule.forRoot()
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkD_3L9QdqBtkq_aICKOyhwSsD98TDWrc&callback'
    }),
  ]
})
export class PagesModule { }
