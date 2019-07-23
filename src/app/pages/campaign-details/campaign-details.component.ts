
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
// import * as jsPDF from 'jspdf'
import jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import 'jspdf-autotable';


@Component({
  selector: 'ngx-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
})
export class CampaignDetailsComponent implements OnInit,OnDestroy {

  subscriptions=[];

  constructor(private _activatedRoute:ActivatedRoute,private _router:Router,
    private bootDataSrv:DataBootstrapService, private sanitizer:DomSanitizer,private el:ElementRef) { }
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
    // this.subscriptions.push(this.bootDataSrv.campaignDetailData.subscribe(data=>{

    //   if (Object.keys(data).length>0) {
    //     console.log("///////////////////",data);
        
    //    this.generateData(data);
    //    this.bootDataSrv.generateGraphData([data["campaign"]],false) ;
    //     for (let venue of data["campaign"]["venues"]) {
    //       let impressions = venue["impressions"];
    //       let duration = this.campaignDetails["duration"];
    //       let rawWatchtime = impressions*duration ;
    //       venue["watchTime"] = this.createTimeForHistoryCard(rawWatchtime)[0]+" hrs "+this.createTimeForHistoryCard(rawWatchtime)[1]+" mins"
    //     }
    //    this.dataSource = new MatTableDataSource(data["campaign"]["venues"]);
    //    this.campaignDetails = data["campaign"]["campaign"] ;
    //   }else if(sessionStorage.getItem("curentCampaignDetail")){
        let dataFromSession = JSON.parse(sessionStorage.getItem("curentCampaignDetail"))
        this.campaignDetails = dataFromSession["campaign"]["campaign"] ;
        this.generateData(dataFromSession) ;
        this.bootDataSrv.generateGraphData([dataFromSession["campaign"]],false) ; 
        for (let venue of dataFromSession["campaign"]["venues"]) {
          let impressions = venue["impressions"];
          let duration = this.campaignDetails["duration"];
          let rawWatchtime = impressions*duration ;
          venue["watchTime"] = this.createTimeForHistoryCard(rawWatchtime)[0]+" hrs "+this.createTimeForHistoryCard(rawWatchtime)[1]+" mins"
        } 
        this.dataSource = new MatTableDataSource(dataFromSession["campaign"]["venues"]);
      }
  //      }))
  // }

  generateData(data){
    let impressions= 0;

    for (const venue of data["campaign"]["venues"]) {
        impressions+= venue["impressions"] ;
    }
        let rawTime =Number(data["campaign"]["campaign"]["duration"])*impressions ;
        let watchTimeMin = this.createTimeForHistoryCard(rawTime)[1] ;
        let watchtime = this.createTimeForHistoryCard(rawTime)[0] ;

        this.historyCardData= {
      // lifeTimeViews:impressions*2.5,
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
      // const doc = new jsPDF();
      const elementToPrint = document.getElementById('main'); //The html element to become a pdf  
      let tableData = this.generateTableData() ;
      let url = this.campaignDetails["media_url"]
      html2canvas(elementToPrint).then(function(canvas) {
        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF();
        doc.textWithLink("Ad Analytics", 70, 10, {url})
        doc.addImage(img,'JPEG',10,20,190,290);
 
        doc.addPage();
        doc.autoTable({
          head:[['Name','Hashtag','Screens','Impressions','Duration']],
          body:tableData,
          margin: {top: 10},
        });
        doc.save('testCanvas.pdf');
        });
      
     
      // doc.text(15, 10, 'Ad Analytics Data');
      // doc.setFontSize(10)
      // doc.text(15, 20, `Start Date : ${new Date(this.campaignDetails["start_datetime"]).toDateString()}      End Date : ${new Date(this.campaignDetails["end_datetime"]).toDateString()}`);
      // doc.text(15, 30, `Total Impressions : ${this.campaignDetails["Total_impression"]}`);
      // doc.text(15, 40, `Total Play Duration : ${this.campaignDetails["Total_play_hours"]}`);
    
      // doc.autoTable({
      //     head:[['Name','Hashtag','Screens','Impressions','Duration']],
      //     body:this.generateTableData(),
      //     margin: {top: 45},
      //   });
      //    doc.save(this.campaignDetails["title"])
  }

  generateTableData(){
    let finalArray = [] ;
    for (const o of this.dataSource.data) {
      finalArray.push([o["name"],o["hash_tag"],o["tvCount"],o["impressions"],o["watchTime"]])
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