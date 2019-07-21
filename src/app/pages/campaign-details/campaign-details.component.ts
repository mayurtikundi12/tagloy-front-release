
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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

  displayedColumns: string[] = ['Venue','Name','Hashtag','Screens','Impressions','Duration','Info'];
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
        let rawTime = Number( this.campaignDetails["Total_play_hours"].split(" ")[0]);
        this.campaignDetails["watchHour"] = this.createTime(rawTime)[0] ;
        this.campaignDetails["watchMin"] = this.createTime(rawTime)[1] ;
      }else if(sessionStorage.getItem("curentCampaignDetail")){
        let dataFromSession = JSON.parse(sessionStorage.getItem("curentCampaignDetail"))
        this.campaignDetails = dataFromSession["campaign"]["campaign"] ;
        let rawTime = Number( this.campaignDetails["Total_play_hours"].split(" ")[0]);
        this.campaignDetails["watchHour"] = this.createTime(rawTime)[0]
        this.campaignDetails["watchMin"] = this.createTime(rawTime)[1]
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
        let rawTime =Number(data["campaign"]["campaign"]["duration"])*impressions ;
        let watchTimeMin = this.createTimeForHistoryCard(rawTime)[1] ;
        let watchtime = this.createTimeForHistoryCard(rawTime)[0] ;

        this.historyCardData= {
      lifeTimeViews:impressions*2.5,
      lifeTimeHours:watchtime,
      lifeTimeImpressions:impressions,
      totalWatchTimeMin:watchTimeMin,
      mainDashboard :false ,
      campaignDetail:true ,
    }
  }

  
  
  createTime(rawTime):[Number,Number]{    
    let hour = Math.floor(rawTime);
    let min = Number((rawTime % 1).toFixed(2))*60 ;
    console.log("hour ",hour," min ",min);
    
    return [hour,min]
  }

  createTimeForHistoryCard(time):[Number,Number]{
    let rawTime =((time/3600)*10)/10 ;
    let hour = Math.floor(rawTime);
    let min = Number((rawTime % 1).toFixed(2))*60
    return [hour,min]
  }


  gotoVenueDetail(venueId){
    // console.log("this is the venueid ",venueId);
      this._router.navigate(['outlet-details',venueId,this.campaignId])
  }

  ExportTOExcel(){
      const doc = new jsPDF();
    
      doc.text(15, 10, 'Ad Analytics Data');
      doc.setFontSize(10)
      doc.text(15, 20, `Start Date : ${new Date(this.campaignDetails["start_datetime"]).toDateString()}      End Date : ${new Date(this.campaignDetails["end_datetime"]).toDateString()}`);
      doc.text(15, 30, `Total Impressions : ${this.campaignDetails["Total_impression"]}`);
      doc.text(15, 40, `Total Play Duration : ${this.campaignDetails["watchHour"]} hrs ${this.campaignDetails["watchMin"]} mins`);
    
      doc.autoTable({
          head:[['Name','Hashtag','Screens','Impressions','Duration']],
          body:this.generateTableData(),
          margin: {top: 45},
        });
        doc.save('table.pdf');
  }

  generateTableData(){
    console.log(this.dataSource.data);
    let finalArray = [] ;
    for (const o of this.dataSource.data) {
      finalArray.push([o["name"],o["hash_tag"],o["tvCount"],5,5])
    }
    return finalArray;
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
    Total_play_hours:any,
    watchMin:any,
    watchHour:any
  
}