import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    .action-column{
      margin-top:5px ;
    }
    :host /deep/ ng2-st-tbody-edit-delete {display: flex !important;
      height: 0 !important;
    }
    
    :host /deep/ ng2-st-tbody-custom a.ng2-smart-action.ng2-smart-action-custom-custom {
      display: inline-block;
      width: 50px;
      text-align: center;
      font-size: 1.1em;
    }
    
    :host /deep/ ng2-st-tbody-custom a.ng2-smart-action.ng2-smart-action-custom-custom:hover {
      color: #5dcfe3;
    }
    ng2-smart-table {
      cursor:pointer;
    }
  `],
})
export class SmartTableComponent {

  settings = {
    actions:false,
    // actions: {
    //   add:false,
    //   edit:false,
    //   delete:false,
    //   columnTitle:"Details",
    //   class:"action-column",
    //   custom:[{
    //     // name:"open",
    //     title:'<i class="fas fa-arrow-right"></i>'
    //   }]
    // }  ,
    columns: {
      index: {
        title: 'Index',
        type: 'number',
        width: "70px"
      },
      outletName: {
        title: 'Outlet Name',
        type: 'string',
      },
      hashtag: {
        title: 'Hashtag',
        type: 'string',
      },
      // details: {
      //   title: 'Details',
      //   defaultValue: '<i class="fas fa-info"></i>'
      // },
      rating: {
        title: 'Rating',
        type: 'number',
      },
      Screens: {
        title: 'Screens',
        type: 'number',
      },
      impressions: {
        title: 'Impressions',
        type: 'number',
      },
      playDuration: {
        title: 'Play Duration',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data = [{ 
      index:1 , outletName:"funky kona",hashtag:"funkykona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky dona",hashtag:"funkydona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky mona",hashtag:"funkymona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky sona",hashtag:"funkykona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky hona",hashtag:"funkykona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky jona",hashtag:"funkykona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky dona",hashtag:"funkydona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky mona",hashtag:"funkymona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky sona",hashtag:"funkykona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky hona",hashtag:"funkykona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky jona",hashtag:"funkykona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky dona",hashtag:"funkydona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky mona",hashtag:"funkymona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky sona",hashtag:"funkykona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky hona",hashtag:"funkykona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
      {index:1 , outletName:"funky jona",hashtag:"funkykona" ,rating:4, Screens:2, impressions:455 , playDuration:3},
    ]

    onUserRowSelect(event){
      console.log("this is the row event",event)
    }
  constructor() {
    
    this.source.load(this.data);
  }
}
