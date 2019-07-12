import {Component, OnDestroy, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { AgmMap } from '@agm/core';
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';
import { Subscription } from 'rxjs';


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
export class DashboardComponent implements OnDestroy,OnInit {

  private alive = true;
  subscriptions:Subscription[] = [];

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

coordinates:[any];

  constructor(private themeService: NbThemeService , private databootSrv: DataBootstrapService

    ) {
this.themeService.getJsTheme()
.pipe(takeWhile(() => this.alive))
.subscribe(theme => {
this.statusCards = this.statusCardsByThemes[theme.name];
});

}

ngOnInit(){
 this.databootSrv.getDataAtInit()

 let venueSubscription = this.databootSrv.subscribableVenues.subscribe(venueData=>{
   if (venueData.length > 0) {
     console.log("venue data arriving at dashboard ",venueData);

     this.coordinates = venueData ;
   }
 })

  this.databootSrv.subscrDashbHistData.subscribe(data=>{
      this.historyData =data ;
      console.log("getting history data in dashboard ",data);

  })

}


counterConfig ={auto:true,value:0,theme:'minima'}

ngOnDestroy() {
  this.alive = false;
  this.subscriptions.forEach(s=>s.unsubscribe);
  console.log("all subscriptions undone");

}

historyData:any = {}

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

}
}

