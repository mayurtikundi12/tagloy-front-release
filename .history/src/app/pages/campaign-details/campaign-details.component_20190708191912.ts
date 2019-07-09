import { Component, OnInit, QueryList, ViewChildren, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { OutletDetails } from '../../commons/outlet-details';

@Component({
  selector: 'ngx-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
})
export class CampaignDetailsComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute,
    private apiSrv:ApisService,private apiData:ApiData) {
     }

  campaignId:number ;
  campaignDetails:Object ;
  outletDetails:[] = []

  ngOnInit() {
   console.log( "*****",this._activatedRoute.snapshot.paramMap.get('campaignId'));
   this.campaignId = Number(this._activatedRoute.snapshot.paramMap.get('campaignId')) ;
   this.apiSrv.postApi(this.apiData.URL_DETAILS_CAMPAIGNS,{id:this.campaignId}).subscribe(data=>{
     this.campaignDetails = data["result"][0] ;
     this.outletDetails = this.campaignDetails["Venue_Details"] ;
     console.log("outlet details", this.outletDetails);
   })
  }

}
