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

  ngOnInit() {
    this.campaignId = Number(this._activatedRoute.snapshot.paramMap.get('campaignId')) ;
    this.bootDataSrv.campaignDetailData.subscribe(data=>{

      console.log("this is the campaign data in details compoennet ",data);
    })
    
  //  this.apiSrv.postApi(this.apiData.URL_DETAILS_CAMPAIGNS,{id:this.campaignId}).subscribe(data=>{
  //    this.campaignDetails = data["result"][0] ; 
  //    this.outletDetails = this.campaignDetails["Venue_Details"] ;
  //  })
  }

}
