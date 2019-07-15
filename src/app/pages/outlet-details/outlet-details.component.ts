import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import { ActivatedRoute } from '@angular/router';
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';

@Component({
  selector: 'ngx-outlet-details',
  templateUrl: './outlet-details.component.html',
  styleUrls: ['./outlet-details.component.scss']
})
export class OutletDetailsComponent implements OnInit {
  options: boolean = true;
  postId:number ;
  venueId:number ;
  chosenDate:String = (new Date(Date.now())).toDateString() ;
  hourData ;
  hourKeys ;
  impression= 0 ;
  constructor(private apiSrv:ApisService,
       private apiData:ApiData ,
       private _activeRoute:ActivatedRoute,
       private bootSrv:DataBootstrapService){

  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 55, 40, 55, 40, 55, 40, 55, 40], label: 'Screen A' },
    { data: [28, 48, 40, 19, 86, 27, 90, 27, 90, 27, 90, 27, 90, 27, 90], label: 'Screen B' }
  ];


  ngOnInit() {
    this.venueId = Number(this._activeRoute.snapshot.paramMap.get('venueId'));
    this.postId = Number(this._activeRoute.snapshot.paramMap.get('postId'));
    console.log("this is the cvenueid ",this.venueId," and the post id is ",this.postId);
    let showtime = new Date(Date.now());
    let body = {
      year : showtime.getFullYear(),
      month:showtime.getMonth()+1,
      day :showtime.getDate()
    }
    this.getDayLog(body);
  }


  getDayLog(data){
    this.hourKeys = null ;
    data.postId = this.postId ;
    data.venueId = this.venueId ;
    this.apiSrv.postLocalApi(this.apiData.URL_GET_VENUE_LOG,data).subscribe(data=>{
      console.log("getting this data for the given date ",data);
      let newData = data["data"] ;
      delete newData["postId"] ;
      delete newData["id"] ;
      delete newData["venueId"] ;
      this.impression = newData["impression_count"]
      delete newData["impression_count"] ;
      delete newData["year"] ;
      delete newData["month"] ;
      delete newData["day"] ;

      this.hourData = newData;
      this.hourKeys = Object.keys(newData);
      let outlineArray= []
      for (const key of this.hourKeys) {
        let rawValue = key.split("_")[1]
        rawValue<10?rawValue="0"+rawValue+":00":rawValue=rawValue+":00"
        outlineArray.push({label:rawValue,value:newData[key]})
      }
      this.bootSrv.graphDetailSrc.next({
        "isDashboard": false,
        "venueLog":outlineArray
      });
      console.log({
        "isDashboard": false,
        "venueLog":outlineArray
      });
      
    },error=>{
      console.log("error in fetching the file ",error);
      
    });
  }

  gotDate(event){
    this.hourKeys = null ;
    let date = new Date(event) ;
    this.chosenDate = date.toDateString() ;
    let body = {
       year : date.getFullYear(),
       month : date.getMonth()+1,
       day : date.getDate(),
    }
    this.getDayLog(body)
    // console.log("year",year," month ",month," day ",day);


  }




}
