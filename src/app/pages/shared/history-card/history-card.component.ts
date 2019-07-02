import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss']
})
export class HistoryCardComponent implements OnInit {

  constructor() { }
  @Input() cardData:any;
  
  historyData = {
    lifeTimeViews:"",
    activeCampaignViews:"",
    lifeTimeHours:"",
    activeCampaignHours:"",
    lifeTimeCampaigns:"",
    activeCampaigns:"",
    lifeTimeImpressions:"",
    activeCampaignImpressions:""
  }
  ngOnInit() {
    
    setTimeout(()=>{
      console.log("this is the card data in history cards component ",this.cardData)
      this.historyData.lifeTimeImpressions = this.cardData["Total_impression"];
      this.historyData.lifeTimeHours = this.cardData["Total_play_hours"];
      this.historyData.activeCampaigns = this.cardData["active_campaign"];
      this.historyData.lifeTimeCampaigns = this.cardData["completed_campaign"] + this.cardData["active_campaign"]  ;
    },2000)    
  }

}
