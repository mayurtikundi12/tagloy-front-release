import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'reveal-card',
  templateUrl: './reveal-card.component.html',
  styleUrls: ['./reveal-card.component.scss']
})
export class RevealCardComponent implements OnInit,OnChanges {

  @Input() campaignDetails:any =[] ;

  campaigns:any = []

  constructor(private router:Router,private sanitizer:DomSanitizer) { }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    console.log("this is the changes obj ",changes);
    this.getCampaignDetail() ;
  }

  getCampaignDetail(){
    if(this.campaignDetails.length >0){
     for (const campaign of this.campaignDetails) {
       let campObj = {} ;
       campObj["startDate"] = campaign["start_datetime"];
       campObj["campName"] = campaign["title"];
       campObj["endDate"] = campaign["end_datetime"];
       campObj["mediaUrl"] = campaign["media_url"];
       
       campObj["impressionCount"] = campaign["Total_impression"];
       campObj["adUptime"] = campaign["Total_play_hours"];
       campObj["views"] = Math.round(campaign["Total_impression"]*2.5);
       campObj["id"] = campaign["id"];
       campObj["type"] = campaign["type"];
       this.campaigns.push(campObj)
     }
     console.log("after for loop ",this.campaigns);
     
    }else{
      setTimeout(()=>{
        this.getCampaignDetail() ;
      },500)
    }
  }

  showCampaignDetails(campId){
    this.router.navigate(['/campaign-details',campId])
  }

}
