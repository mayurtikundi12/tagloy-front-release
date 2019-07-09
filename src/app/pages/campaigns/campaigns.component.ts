import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';
import { state } from '@angular/animations';

@Component({
  selector: 'ngx-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit,OnDestroy {

  campaignDetails:any = {}
  hasCampaignData:boolean = false ;
  hasNextCampaignData:boolean = true;
  campaignsState:string ;
  historyCardData:Object ;

  constructor(private apiSrv:ApisService,private apidata:ApiData,
      private dataBootSrv:DataBootstrapService
    ,private _activeRouter:ActivatedRoute) { }


   campaignQueryObj = {
    "id": parseInt(localStorage.getItem('id')),
    // "id": Number(localStorage.getItem('id')),
    "f":"",
    "page":0
  }

  ngOnInit() {
   this._activeRouter.url.subscribe(params=>{
     let  state = params[1]["path"]
     this.campaignsState  = state ;
        this.getCampaignDataAtInit(state);
  }) ;

  }





  getCampaignData(state){
      // if(state == 'active'){
      //   this.campaignQueryObj.f = "A";
      //   this.campaignsState = state;
      //   this.dataBootSrv.subscribableActiveCamps.subscribe(data=>{
      //     console.log("active data campaign ",data);
      //   })

      // }else{
      //   this.campaignQueryObj.f = "C" ;
      //   this.campaignsState = state ;
      //   this.dataBootSrv.subscribableCompletedCamps.subscribe(data=>{
      //     console.log("completed data campaign ",data);
      //   })
      // }

      // depending on A=active and C=completed we are getting the data




      // this.apiSrv.postApi(this.apidata.URL_ACTIVE_CAMPAIGNS,this.campaignQueryObj).subscribe(data=>{
      //   if(data['result'].length > 0 ){
      //     this.hasCampaignData = true ;
      //     data['result'].length == 4?this.hasNextCampaignData = true:this.hasNextCampaignData=false ;
      //   }else{
      //     this.hasCampaignData = false ;
      //     this.hasNextCampaignData = false ;
      //   }
      //   console.log("this is the data for active campaigns ",data);
      //   this.campaignDetails = data["result"]
      // },error=>{
      //   throw new Error("failed to fetch campaigns data")
      // })

  }

  getCampaignDataAtInit(state){
    if(state == 'active'){
      let activeCampaignData = JSON.parse(sessionStorage.getItem("activeCamps"));
      if (activeCampaignData) {
        this.hasCampaignData = true ;
        console.log("active camps from session ",JSON.parse(sessionStorage.getItem("activeCamps")));
        this.generateHistoryCardData(activeCampaignData);
      }else{
        console.log("do not have the active campaign data getting again ");
        this.dataBootSrv.getDataAtInit();
        this.getCampaignDataAtInit(this.campaignsState);
      }
    }else{
      let completedCampaignData = JSON.parse(sessionStorage.getItem("completedCamps"));
      if (completedCampaignData) {
        this.hasCampaignData =true ;
        console.log("completed camps from session ",completedCampaignData);
        this.generateHistoryCardData(completedCampaignData);
      }else{
        console.log("do not have the completed campaign data getting again ");
        this.dataBootSrv.getDataAtInit();
        this.getCampaignDataAtInit(this.campaignsState);
      }
    }
  }


  ngOnDestroy(){
    this.hasCampaignData = false ;
  }

  generateHistoryCardData(campaigns){
    let activeCampaignImpressions = 0 ;
    let activeCampaignHours:any = 0
    this.campaignDetails = campaigns ;
      for (let camp of campaigns) {
        let rawImpressions = Number(camp["campaign"]["slot"].split(".")[1]) ;
        let rawWatchTime = Number(camp["campaign"]["duration"]) ;


        let campTvCount = 0
        for (const venue of camp["venues"]) {
          campTvCount+= venue["tvCount"];
        }
        activeCampaignImpressions += rawImpressions*campTvCount ;
        activeCampaignHours += (rawWatchTime * rawImpressions) ;
      }

      activeCampaignHours = Math.round((activeCampaignHours/3600)*10)/10 + "hrs";
      this.historyCardData= {
        lifeTimeViews:activeCampaignImpressions*2.5,
        lifeTimeHours:activeCampaignHours,
        lifeTimeCampaigns:campaigns.length,
        lifeTimeImpressions:activeCampaignImpressions,
        mainDashboard :false
      }
  }

}
