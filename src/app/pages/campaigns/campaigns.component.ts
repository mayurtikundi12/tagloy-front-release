import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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

  constructor(private apiSrv:ApisService,private apidata:ApiData,private _activeRouter:ActivatedRoute) { }


   campaignQueryObj = {
    "id": parseInt(localStorage.getItem('id')),
    // "id": Number(localStorage.getItem('id')),
    "f":"",
    "page":0
  }

  ngOnInit() {
   this._activeRouter.url.subscribe(params=>{
    this.getCampaignData(params[1]["path"]) ;
  }) ;
  }

 

  getCampaignData(state){
      if(state == 'active'){
        this.campaignQueryObj.f = "A";
        this.campaignsState = state
      }else{
        this.campaignQueryObj.f = "C" ;
        this.campaignsState = state
      } 

      // depending on A=active and C=completed we are getting the data
      this.apiSrv.postApi(this.apidata.URL_ACTIVE_CAMPAIGNS,this.campaignQueryObj).subscribe(data=>{
        if(data['result'].length > 0 ){
          this.hasCampaignData = true ;
          data['result'].length == 4?this.hasNextCampaignData = true:this.hasNextCampaignData=false ;   
        }else{
          this.hasCampaignData = false ;
          this.hasNextCampaignData = false ;
        }
        console.log("this is the data for active campaigns ",data);
        this.campaignDetails = data["result"]
      },error=>{
        throw new Error("failed to fetch campaigns data")
      })
    
  } 

  getMoreCampData(){
    this.campaignQueryObj["page"]+=1 ;
    this.getCampaignData(this.campaignsState) ;
  }


  ngOnDestroy(){
  }

}
