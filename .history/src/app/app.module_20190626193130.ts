/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ECommerceVisitorsAnalyticsChartComponent } from './visitors-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import { ECommerceVisitorsAnalyticsComponent } from './visitors-analytics/visitors-analytics.component';
import { ECommerceVisitorsStatisticsComponent } from './visitors-analytics/visitors-statistics/visitors-statistics.component';
import { ECommerceLegendChartComponent } from './legend-chart/legend-chart.component';
import { SlideOutComponent } from './slide-out/slide-out.component';
import { PeriodsService } from './@core/mock/periods.service';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    ECommerceVisitorsAnalyticsChartComponent,
    ECommerceVisitorsAnalyticsComponent,
    ECommerceVisitorsStatisticsComponent,
    ECommerceLegendChartComponent,
    SlideOutComponent,
    DashboardComponent,
    LoginComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NgxChartsModule,
    NgxEchartsModule,
    ChartModule,
    LeafletModule,
  ],
  bootstrap: [AppComponent],
  providers: [

    { provide: APP_BASE_HREF, useValue: '/' },
    PeriodsService
  ],
})
export class AppModule {
}
