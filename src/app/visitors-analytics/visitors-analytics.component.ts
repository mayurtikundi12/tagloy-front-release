import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';
// import { OutlineData, VisitorsAnalyticsData } from '../../../@core/data/visitors-analytics';
import { OutlineData, VisitorsAnalyticsData } from '../@core/data/visitors-analytics';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'ngx-ecommerce-visitors-analytics',
  styleUrls: ['./visitors-analytics.component.scss'],
  templateUrl: './visitors-analytics.component.html',
})
export class ECommerceVisitorsAnalyticsComponent implements OnDestroy {
  private alive = true;

  pieChartValue: number;
  chartLegend: {iconColor: string; title: string}[];
  // innerLine: number[];  can be used in visitorsAnalyticsData
  visitorsAnalyticsData: { outerLine: OutlineData[]; };

  constructor(private themeService: NbThemeService,
              private visitorsAnalyticsChartService: VisitorsAnalyticsData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.setLegendItems(theme.variables.visitorsLegend);
      });

    forkJoin(
      this.visitorsAnalyticsChartService.getInnerLineChartData(),
      this.visitorsAnalyticsChartService.getOutlineLineChartData(),
      this.visitorsAnalyticsChartService.getPieChartData(),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(([innerLine, outerLine, pieChartValue]: [number[], OutlineData[], number]) => {
        console.log("pichartvalue", pieChartValue)
        // console.log("innerLine", innerLine)
        console.log("outerLine", outerLine)
        this.visitorsAnalyticsData = {
          // innerLine: innerLine,
          outerLine: outerLine,
        };
        let totalActiveScreens =Number( sessionStorage.getItem("totalActiveScreenCount"));
        let totalScreens = Number(sessionStorage.getItem("totalScreenCount"));
        console.log("this is totactiveScreens ",totalActiveScreens);
        console.log("this is totScreens ",totalScreens);
        
        if ((totalActiveScreens || totalActiveScreens==0) && (totalScreens || totalScreens==0)) {
          let totalActScrnPercent = Math.round((totalActiveScreens/totalScreens)*100)
        if (totalScreens==0) {
         this.pieChartValue = 0 ;
        }else{
          this.pieChartValue = totalActScrnPercent;
        }
        }
      });
  }

  setLegendItems(visitorsLegend): void {
    this.chartLegend = [
      {
        iconColor: visitorsLegend.firstIcon,
        title: 'Unique Visitors',
      },
      {
        iconColor: visitorsLegend.secondIcon,
        title: 'Page Views',
      },
    ];
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
