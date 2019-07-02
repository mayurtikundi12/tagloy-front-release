import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {

  constructor() { }
  durationLeft = 70
  ngOnInit() {
  }

}
