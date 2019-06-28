import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'reveal-card',
  templateUrl: './reveal-card.component.html',
  styleUrls: ['./reveal-card.component.scss']
})
export class RevealCardComponent implements OnInit {

  campaigns:any = [{completedValue: 59 ,color:"red" , views :4500,adUptime: 23,impressionCount:4555,screenCount:240  , campName:"vivo v9+",startDate:"20 june 2019",endDate:"30 june 2019",desc:"this is the description of the ad"},
                  {completedValue: 90 ,color:"blue" , views :3652,adUptime: 25,impressionCount:4550,screenCount:240  , campName:"amazon aws",startDate:"15 june 2019",endDate:"30 june 2019",desc:"this is the description of the ad"}
]

  constructor(private router:Router) { }

  ngOnInit() {
  }

  showCampaignDetails(campId){
    this.router.navigate(['/campaign-details'])
  }

}
