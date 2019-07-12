import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  takeWhile
} from 'rxjs/operators';
import {
  NbThemeService
} from '@nebular/theme';
import {
  DataBootstrapService
} from '../pages/shared/services/data-bootstrap.service';


@Component({
  selector: 'ngx-ecommerce-visitors-analytics',
  styleUrls: ['./visitors-analytics.component.scss'],
  templateUrl: './visitors-analytics.component.html',
})
export class ECommerceVisitorsAnalyticsComponent implements OnInit, OnDestroy {
  private alive = true;

  pieChartValue: number;
  isDashboard: boolean = false;
  chartLegend: {
    iconColor: string;title: string
  } [];
  // innerLine: number[];  can be used in visitorsAnalyticsData
  visitorsAnalyticsData: {
    outerLine;
  };

  constructor(private themeService: NbThemeService,
    private bootDataSrv: DataBootstrapService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.setLegendItems(theme.variables.visitorsLegend);
      })
  };

 

  ngOnInit() {
    this.bootDataSrv.graphDetailData
      .pipe(takeWhile(() => this.alive))
      .subscribe(data => {
        this.createGraph(data);
        // logic for setting pie chart data
        let totalActiveScreens = Number(sessionStorage.getItem("totalActiveScreenCount"));
        let totalScreens = Number(sessionStorage.getItem("totalScreenCount"));
        if ((totalActiveScreens || totalActiveScreens == 0) && (totalScreens || totalScreens == 0)) {
          let totalActScrnPercent = Math.round((totalActiveScreens / totalScreens) * 100)
          if (totalScreens == 0) {
            this.pieChartValue = 0;
          } else {
            this.pieChartValue = totalActScrnPercent;
          }
        }
        // end of logic for pie chart data

      });
  }

  createGraph(data){
    if (Object.keys(data).length > 0) {
      this.isDashboard = data["isDashboard"]
      let outerLine: any = data["graph"];
      outerLine.sort(this.compare)
      let newOuterLine = []
      for (let point of outerLine) {
        newOuterLine.push({
          "label": point[0],
          "value": point[1]
        })
      }
      this.visitorsAnalyticsData = {
        outerLine: newOuterLine
      };

    }
  }

  compare(a, b) {
    const yearA = Number(a[0].split("-")[0]);
    const yearB = Number(b[0].split("-")[0]);
    const monthA = Number(a[0].split("-")[1]);
    const monthB = Number(b[0].split("-")[1]);


    let comparison = 0;
    if (yearA == yearB) {
      // if both years are same check the months and remember months cannot be same hihaha

      if (monthA > monthB) {
        comparison = 1;
      } else {
        comparison = -1
      }

    } else if (yearA > yearB) {
      comparison = 1;
    } else {
      comparison = -1;
    }


    return comparison;
  }


  setLegendItems(visitorsLegend): void {
    this.chartLegend = [{
      iconColor: visitorsLegend.secondIcon,
      title: 'Ad impressions',
    }, ];
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
