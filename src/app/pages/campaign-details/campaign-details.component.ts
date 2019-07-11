
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';
import { Component, OnInit, QueryList, ViewChildren, PipeTransform, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { OutletDetails } from '../../commons/outlet-details';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as XLSX from 'xlsx';
import { DataSource } from 'ng2-smart-table/lib/data-source/data-source';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
})
export class CampaignDetailsComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute,private _router:Router,
    private apiSrv:ApisService,private apiData:ApiData,
    private bootDataSrv:DataBootstrapService, private sanitizer:DomSanitizer) { }
    // dataSource ;

  campaignId:number ;
  campaignDetails:Object ;
  outletDetails:[] = []
  historyCardData = {}

  displayedColumns: string[] = ['Venue','Name','Hashtag','Screens','Info'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    this.campaignId = Number(this._activatedRoute.snapshot.paramMap.get('campaignId')) ;
    this.bootDataSrv.campaignDetailData.subscribe(data=>{

   if (Object.keys(data).length>0) {
    this.generateData(data);
    this.bootDataSrv.generateGraphData([data["campaign"]],false);
    this.dataSource = new MatTableDataSource(data["campaign"]["venues"]);
    this.campaignDetails = data["campaign"]["campaign"] ;

   }else if(sessionStorage.getItem("curentCampaignDetail")){

     let dataFromSession = JSON.parse(sessionStorage.getItem("curentCampaignDetail"))
     this.campaignDetails = dataFromSession["campaign"]["campaign"] ;
     this.generateData(dataFromSession) ;
     this.bootDataSrv.generateGraphData([dataFromSession["campaign"]],false) ;
     this.dataSource = new MatTableDataSource(dataFromSession["campaign"]["venues"]);

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



  gotoVenueDetail(venueId){
    console.log("this is the venueid ",venueId);

      this._router.navigate(['outlet-details',venueId])
  }

  ExportTOExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
}
