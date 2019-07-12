import { Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';

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

  constructor(private dataBootSrv:DataBootstrapService,
              private _activeRouter:ActivatedRoute) { }


  ngOnInit() {
   this._activeRouter.url.subscribe(params=>{
     let  state = params[1]["path"]
     this.campaignsState  = state ;
        this.getCampaignDataAtInit(state);
  }) ;

  }


  getCampaignDataAtInit(state){
    if(state == 'active'){
      let activeCampaignData = JSON.parse(sessionStorage.getItem("activeCamps"));
      if (activeCampaignData) {
        this.hasCampaignData = true ;
        this.generateHistoryCardData(activeCampaignData);
        this.dataBootSrv.generateGraphData(activeCampaignData,false)
      }else{
        this.dataBootSrv.getDataAtInit();
        this.getCampaignDataAtInit(this.campaignsState);
      }
    }else{
      let completedCampaignData = JSON.parse(sessionStorage.getItem("completedCamps"));
      if (completedCampaignData) {
        this.hasCampaignData =true ;
        this.generateHistoryCardData(completedCampaignData);
        this.dataBootSrv.generateGraphData(completedCampaignData,false)
      }else{
        this.dataBootSrv.getDataAtInit();
        this.getCampaignDataAtInit(this.campaignsState);
      }
    }
  }


  ngOnDestroy(){
    this.hasCampaignData = false ;
  }

  generateHistoryCardData(campaigns){
    let campaignImpressions = 0 ;
    let activeCampaignHours:any = 0
    this.campaignDetails = campaigns ;
      for (let camp of campaigns) {
        let rawImpressions = Number(camp["campaign"]["slot"].split(".")[1]) ;
        let rawWatchTime = Number(camp["campaign"]["duration"]) ;


        let campTvCount = 0
        for (const venue of camp["venues"]) {
          campTvCount+= venue["tvCount"];
        }
        campaignImpressions += rawImpressions*campTvCount ;
        activeCampaignHours += (rawWatchTime * rawImpressions*campTvCount) ;
        // console.log("campid",camp["id"]," currImpr==>",rawImpressions," tvC==>",campTvCount," totImpr=>",campaignImpressions);
      }

      activeCampaignHours = Math.floor((activeCampaignHours/3600)) + "hrs";
      this.historyCardData= {
        lifeTimeViews:campaignImpressions*2.5,
        lifeTimeHours:activeCampaignHours,
        lifeTimeCampaigns:campaigns.length,
        lifeTimeImpressions:campaignImpressions,
        mainDashboard :false
      }
  }

}
