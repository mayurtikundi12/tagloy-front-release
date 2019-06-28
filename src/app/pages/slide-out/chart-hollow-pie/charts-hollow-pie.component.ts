import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../@core/utils/layout.service';


@Component({
  selector: 'ngx-hollow-pie',
  styleUrls: ['./charts-hollow-pie.component.scss'],
  templateUrl: './charts-hollow-pie.component.html',
})
export class ChartsHollowPieComponent implements AfterViewInit, OnDestroy {

  private alive = true;

  @Input() value: number=20;

  option: any = {};
  chartLegend: { iconColor: string; title: string }[];
  echartsIntance: any;

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {
        const variables: any = config.variables;
        console.log("this is the complete config obj ==>",config);
        const visitorsPieLegend: any = config.variables.visitorsPieLegend;

        
        this.setOptions(variables);
        this.setLegendItems();
    });
  }

  setLegendItems() {
    this.chartLegend = [
      {
        iconColor: '#ff9900',
        title: 'New Visitors',
      },
      {
        iconColor: '#00ffff',
        title: 'Return Visitors',
      },
    ];
  }

  setOptions(variables) {
    const visitorsPie: any = variables.visitorsPie;

    this.option = {
      tooltip: {
        trigger: 'item',
        formatter: '',
      },
      series: [
        {
          name: ' ',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['50%', '50%'],
          radius: ["65%", "90%"],
          data: [
            {
              value: 100,
              name: ' ',
              label: {
                normal: {
                  position: 'center',
                  formatter: '',
                  textStyle: {
                    fontSize: '22',
                    fontFamily: variables.fontSecondary,
                    fontWeight: '600',
                    color: variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: true,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#ff9900",
                    },
                    {
                      offset: 1,
                      color: "#ff9900",
                    },
                  ]),
                  shadowColor: visitorsPie.firstPieShadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                },
              },
              hoverAnimation: false,
            },
            {
              value: 100 - this.value,
              name: ' ',
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  position: 'inner',
                },
              },
              itemStyle: {
                normal: {
                  color: variables.layoutBg,
                },
              },
            },
          ],
        },
        {
          name: ' ',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['50%', '50%'],
          radius: visitorsPie.secondPieRadius,
          data: [
            {
              value: this.value,
              name: ' ',
              label: {
                normal: {
                  position: 'center',
                  formatter: '',
                  textStyle: {
                    fontSize: '22',
                    fontFamily: variables.fontSecondary,
                    fontWeight: '600',
                    color: variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1),
                },
              },
              hoverAnimation: false,
            },
            {
              value: 100 - this.value,
              name: ' ',
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  position: 'inner',
                },
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: visitorsPie.secondPieGradientLeft,
                    },
                    {
                      offset: 1,
                      color: visitorsPie.secondPieGradientRight,
                    },
                  ]),
                  shadowColor: visitorsPie.secondPieShadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: visitorsPie.shadowOffsetX,
                  shadowOffsetY: visitorsPie.shadowOffsetY,
                },
              },
            },
          ],
        },
      ],
    };
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
