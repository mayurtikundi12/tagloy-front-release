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
  count ;
  constructor(private dataBootSrv:DataBootstrapService,
              private _activeRouter:ActivatedRoute) { }


  ngOnInit() {
    this.count=0;
   this._activeRouter.url.subscribe(params=>{
     let  state = params[1]["path"]
     this.campaignsState  = state ;
     this.hasCampaignData = false ;
        this.getCampaignDataAtInit(state);
  }) ;

  }


  getCampaignDataAtInit(state){
    
    if(state == 'active'){
      let activeCampaignData = JSON.parse(sessionStorage.getItem("activeCamps"));
      if (activeCampaignData.length>0) {
        console.log("/////////****",activeCampaignData);
        this.hasCampaignData = true ;
        this.generateHistoryCardData(activeCampaignData);
        this.dataBootSrv.generateGraphData(activeCampaignData,false)
      }else if(this.count<2){
        this.count++
        this.hasCampaignData =false ;
        console.log("/////////",this.hasCampaignData);
        this.dataBootSrv.getDataAtInit();
        this.getCampaignDataAtInit(this.campaignsState);
      }
    }else{
      let completedCampaignData = JSON.parse(sessionStorage.getItem("completedCamps"));
      if (completedCampaignData.length>0) {
        this.hasCampaignData =true ;
        this.generateHistoryCardData(completedCampaignData);
        this.dataBootSrv.generateGraphData(completedCampaignData,false)
      }else if(this.count<2){
        this.hasCampaignData =false ;
        this.count++
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
        let currCampImprsns = 0;
        let rawWatchTime = Number(camp["campaign"]["duration"]) ;

        for (const venue of camp["venues"]) {
          currCampImprsns += venue["impressions"] ;
        }
        campaignImpressions += currCampImprsns ;
        activeCampaignHours +=  currCampImprsns*rawWatchTime;
      }

      let activeWatchtimeMin = this.createTime(activeCampaignHours)[1]+ "min";
      activeCampaignHours = this.createTime(activeCampaignHours)[0]+ "hrs";
      
      
      this.historyCardData= {
        // lifeTimeViews:campaignImpressions*2.5,
        lifeTimeHours:activeCampaignHours,
        lifeTimeCampaigns:campaigns.length,
        lifeTimeImpressions:campaignImpressions,
        totalWatchTimeMin:activeWatchtimeMin,
        mainDashboard :false
      }
  }

  createTime(time):[Number,Number]{
    
    let rawTime =((time/3600)*10)/10 ;
    let hour = Math.floor(rawTime);
    let min = Number((rawTime % 1).toFixed(2))*60
    return [hour,min]
  }

}
