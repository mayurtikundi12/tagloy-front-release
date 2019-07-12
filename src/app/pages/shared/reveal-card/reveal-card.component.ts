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
        let   totalImrpessions = (campaign["campaign"]["slot"].split(".")[1])*screenCount;
       campaignObj["Total_impression"] = totalImrpessions ;
       campaignObj["Total_play_hours"] =Math.round( ((totalImrpessions* campaign["campaign"]["duration"])/3600*10))/10 +" hrs"
       campaignObj["views"] = totalImrpessions*2.5 ;
       this.campaigns.push(campaignObj)
     }

   
     console.log("after for loop ",this.campaigns);


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
