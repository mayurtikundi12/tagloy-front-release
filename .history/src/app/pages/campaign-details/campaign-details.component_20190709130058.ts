import { Component, OnInit, QueryList, ViewChildren, PipeTransform, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { OutletDetails } from '../../commons/outlet-details';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

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
     this.dataSource.data = this.outletDetails;
   })
  }

  displayedColumns: string[] = ['Total_impression', 'Total_play_hours', 'hash_tag', 'name'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

}
