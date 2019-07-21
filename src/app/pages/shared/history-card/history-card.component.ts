import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DialogueService } from '../services/dialogue.service';


@Component({
  selector: 'history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HistoryCardComponent implements OnInit,OnChanges {

  constructor(private dialogueSrv:DialogueService,private cd:ChangeDetectorRef) { }
  @Input() cardData:any = {};

  historyData = {
    // lifeTimeViews:0,
    // activeCampaignViews:0,
    lifeTimeHours:0,
    activeCampaignHours:0,
    lifeTimeCampaigns:0,
    activeCampaigns:0,
    lifeTimeImpressions:0,
    activeCampaignImpressions:0,
    mainDashboard:false,
    campaignDetail:false,
    totalWatchTimeMin:0,
    totalActiveWatchTimeMin:0, 
  }
  ngOnInit() {

  }

  ngOnChanges(changes:SimpleChanges){
    this.historyData =changes.cardData.currentValue ;
  }

  findInfo(component,index){
    this.dialogueSrv.generateDialogue(component,index);
  }

}
