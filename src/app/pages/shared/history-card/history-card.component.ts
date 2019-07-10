import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataBootstrapService } from '../services/data-bootstrap.service';
import { DialogueService } from '../services/dialogue.service';


@Component({
  selector: 'history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss']
})
export class HistoryCardComponent implements OnInit,OnChanges {

  constructor(private dataBootSrv:DataBootstrapService,private dialogueSrv:DialogueService) { }
  @Input() cardData:any = {};

  historyData = {
    lifeTimeViews:0,
    activeCampaignViews:0,
    lifeTimeHours:0,
    activeCampaignHours:0,
    lifeTimeCampaigns:0,
    activeCampaigns:0,
    lifeTimeImpressions:0,
    activeCampaignImpressions:0
  }
  ngOnInit() {

  }

  ngOnChanges(changes:SimpleChanges){
    this.historyData =changes.cardData.currentValue ;

    // setTimeout(()=>{

    //   if(Object.keys(this.cardData).length>0){
    //     this.historyData.lifeTimeImpressions = this.cardData["Total_impression"];
    //   this.historyData.lifeTimeHours = this.cardData["Total_play_hours"];
    //   this.historyData.activeCampaigns = this.cardData["active_campaign"];
    //   this.historyData.lifeTimeCampaigns = this.cardData["completed_campaign"] + this.cardData["active_campaign"]  ;

    //   }else console.log("data not arrived ");

    // },2000)
  }

  findInfo(component,index){
    this.dialogueSrv.generateDialogue(component,index);
  }

}
