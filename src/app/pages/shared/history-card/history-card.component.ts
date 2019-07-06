import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss']
})
export class HistoryCardComponent implements OnInit,OnChanges {

  constructor() { }
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
  }

}
