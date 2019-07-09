import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';

@Component({
  selector: 'ngx-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute,private _router:Router,
    private apiSrv:ApisService,private apiData:ApiData,private bootDataSrv:DataBootstrapService) { }

  campaignId:number ;  
  campaignDetails:Object ;
  outletDetails:[] = []
  historyCardData = {}
  ngOnInit() {
    this.campaignId = Number(this._activatedRoute.snapshot.paramMap.get('campaignId')) ;
    this.bootDataSrv.campaignDetailData.subscribe(data=>{
   if (Object.keys(data).length>0) {
    console.log("this is the campaign data in details compoennet ",data);
    this.generateData(data)
   }else if(sessionStorage.getItem("curentCampaignDetail")){
     let dataFromSession = JSON.parse(sessionStorage.getItem("curentCampaignDetail"))
     console.log("getting data from the sesion storage",dataFromSession);
     this.generateData(dataFromSession) ;
   }else{
     console.log("coming to lasr else");
     
   }
     
    })
    
  //  this.apiSrv.postApi(this.apiData.URL_DETAILS_CAMPAIGNS,{id:this.campaignId}).subscribe(data=>{
  //    this.campaignDetails = data["result"][0] ; 
  //    this.outletDetails = this.campaignDetails["Venue_Details"] ;
  //  })
  }

  generateData(data){
    let campTvCount = 0
    for (const venue of data["campaign"]["venues"]) {
      campTvCount+= venue["tvCount"];
    }
        let impressions= Number( data["campaign"]["campaign"]["slot"].split(".")[1])*campTvCount;
        let watchtime = Math.round(((Number(data["campaign"]["campaign"]["duration"])*impressions)/3600)*10)/10 ; 
    
        this.historyCardData= {
      lifeTimeViews:impressions*2.5,
      lifeTimeHours:watchtime,
      lifeTimeImpressions:impressions,
      mainDashboard :false ,
      campaignDetail:true ,
    }
  }

}
