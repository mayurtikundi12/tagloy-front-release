import {Component, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { AgmMap } from '@agm/core';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy,AfterViewInit {

  private alive = true;

  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];



  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'secondary',
      },
    ],
  };
  constructor(private themeService: NbThemeService) {
this.themeService.getJsTheme()
.pipe(takeWhile(() => this.alive))
.subscribe(theme => {
this.statusCards = this.statusCardsByThemes[theme.name];
});

}


counterConfig ={auto:true,value:0,theme:'minima'}

ngOnDestroy() {
  this.alive = false;
}

historyData:Array<HistoryData> = [{topic:"Lifetime Hours",value:2500,icon:"../../../assets/images/neelk.png"},
{topic:"Total Impressions",value:300050,icon:"../../../assets/images/neelk.png"},
{topic:"Total Campaigns",value:3200,icon:"../../../assets/images/neelk.png"},
{topic:"Active Campaigns",value:5220,icon:"../../../assets/images/neelk.png"}]


cordinates = [
  {lat:51.67,lng:7.809007},
  {lat:52.67,lng:7.309007},
  {lat:52.07,lng:7.709007},
  {lat:51.87,lng:7.609007},
  {lat:51.17,lng:7.009007},
  {lat:51.77,lng:7.409007},
]

lat = 51.678418;
lng = 7.809007;

labelOptions = {
  color: 'blue',
  fontFamily: 'roboto',
  fontSize: '14px',
  fontWeight: 'bold',
  text: 'some other text'
}

@ViewChild(AgmMap)
public agmMap: AgmMap

ngAfterViewInit(): void {
  setTimeout(() => {
    console.log('Resizing');
    this.agmMap.triggerResize();
  }, 100);
}

}




 interface HistoryData{
  topic:string,
  value:number,
  icon:string
}
