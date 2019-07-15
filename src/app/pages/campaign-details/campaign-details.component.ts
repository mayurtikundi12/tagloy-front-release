
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import * as XLSX from 'xlsx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
})
export class CampaignDetailsComponent implements OnInit,OnDestroy {

  subscriptions=[];

  constructor(private _activatedRoute:ActivatedRoute,private _router:Router,
    private bootDataSrv:DataBootstrapService, private sanitizer:DomSanitizer) { }
    // dataSource ;
  campaignId:number ;
  campaignDetails:CampaignData;
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
    this.subscriptions.push(this.bootDataSrv.campaignDetailData.subscribe(data=>{

      if (Object.keys(data).length>0) {
       this.generateData(data);
       this.bootDataSrv.generateGraphData([data["campaign"]],false) ;
       this.dataSource = new MatTableDataSource(data["campaign"]["venues"]);
       this.campaignDetails = data["campaign"]["campaign"] ;
      }else if(sessionStorage.getItem("curentCampaignDetail")){
        let dataFromSession = JSON.parse(sessionStorage.getItem("curentCampaignDetail"))
        this.campaignDetails = dataFromSession["campaign"]["campaign"] ;
        this.generateData(dataFromSession) ;
        this.bootDataSrv.generateGraphData([dataFromSession["campaign"]],false) ;  
        this.dataSource = new MatTableDataSource(dataFromSession["campaign"]["venues"]);
      }
       }))
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
    // console.log("this is the venueid ",venueId);
      this._router.navigate(['outlet-details',venueId,this.campaignId])
  }

  ExportTOExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s=>s.unsubscribe());
  }
}

interface CampaignData {
  
    type:any,
    title:any,
    created_at:any,
    start_datetime:any,
    end_datetime:any,
    views:any,
    Total_play_hours:any
  
}