import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DataBootstrapService } from '../services/data-bootstrap.service';

@Component({
  selector: 'reveal-card',
  templateUrl: './reveal-card.component.html',
  styleUrls: ['./reveal-card.component.scss']
})
export class RevealCardComponent implements OnInit,OnChanges {

  @Input() campaignDetails:any =[] ;

  campaigns:any = []

  constructor(private router:Router,private sanitizer:DomSanitizer,private bootDataSrv:DataBootstrapService) { }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    this.getCampaignDetail() ;
  }

  getCampaignDetail(){

    if(this.campaignDetails.length >0){
      
     for (let campaign of this.campaignDetails) {
       let campaignObj = {} ;
       campaignObj = campaign["campaign"] ;
        let screenCount = countScreens(campaign["venues"])
       campaignObj["screenCount"] =screenCount ;
        let   totalImrpessions = 0 ;
        for (const venue of campaign["venues"]) {
          totalImrpessions+=venue["impressions"] ;
        }
        let rawWatchTime = totalImrpessions*Number(campaign["campaign"]["duration"])
       campaignObj["Total_impression"] = totalImrpessions ;
       campaignObj["Total_play_hours"] = this.createTime(rawWatchTime)[0]+" hrs "+this.createTime(rawWatchTime)[1]+" mins";
       campaignObj["views"] = totalImrpessions*2.5 ;
       this.campaigns.push(campaignObj)
     }

    }else{
      setTimeout(()=>{
        this.getCampaignDetail() ;
      },500)
    }

    function countScreens(venues):number{
      let screenCount = 0 ;
        for (let venue of venues) {
          screenCount+=venue["tvCount"]
        }
        return screenCount ;
    }    
  }

  createTime(time):[Number,Number]{
    let rawTime =((time/3600)*10)/10 ;
    let hour = Math.floor(rawTime);
    let min = Number((rawTime % 1).toFixed(2))*60
    return [hour,min]
  }


  showCampaignDetails(campId,index){
    let data = {"campaign":this.campaignDetails[index],"campId":campId} ;
    this.bootDataSrv.passCampaignDetailData(data)
    this.router.navigate(['campaign-details',campId]);

    sessionStorage.setItem("curentCampaignDetail",JSON.stringify(data))
  }

  trackByFn(index,item){
    return item["id"]
  }

}
