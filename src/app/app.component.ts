/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { DataBootstrapService } from './pages/shared/services/data-bootstrap.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    private dataBootSrv:DataBootstrapService
    ) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.dataBootSrv.getDataAtInit();
  }
}
