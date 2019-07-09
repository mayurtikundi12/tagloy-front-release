import {Component, OnDestroy, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { AgmMap } from '@agm/core';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';


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

  constructor(private themeService: NbThemeService ,
    private apiSrv:ApisService , private apiData:ApiData,
    private databootSrv:DataBootstrapService,
    ) {
this.themeService.getJsTheme()
.pipe(takeWhile(() => this.alive))
.subscribe(theme => {
this.statusCards = this.statusCardsByThemes[theme.name];
});

}

ngOnInit(){

//  this.databootSrv.getDataAtInit()
this.databootSrv.getDataAtInit();

 this.databootSrv.subscribableVenues.subscribe(venueData=>{
   if (venueData.length > 0) {
     console.log("venue data arriving at dashboard ",venueData);

     this.coordinates = venueData ;
   }
 })

  // getting the needed data on initialization
  let body = {
    id:localStorage.getItem('id')
  }
  console.log("this is the dashboard url",this.apiData.URL_DASHBOARD);

  // console.log("this is the dashboard url",this.apiData.URL_DASHBOARD);

  // this.apiSrv.postApi(this.apiData.URL_DASHBOARD,body).subscribe(data=>{
  //   if(data ){
  //     this.historyData = data["result"];
  //     console.log("data", data)
  //   }
  //   // console.log("this is the dashboard data",data);
  // },error=>{
  //   throw new Error("error in retrieving dashboard data")
  // })
}


counterConfig ={auto:true,value:0,theme:'minima'}

ngOnDestroy() {
  this.alive = false;
}

historyData:any = {}

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

}
}

