import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
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
export class SmartTableComponent implements OnChanges {


  @Input() outletDetails:[] ;

  ngOnChanges(changes:SimpleChanges){
    console.log("these are the smart table data",changes);
    this.source.load(changes["outletDetails"].currentValue);
  }

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
      name: {
        title: 'Outlet Name',
        type: 'string',
      },
      hash_tag: {
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
      Total_impression: {
        title: 'Impressions',
        type: 'number',
      },
      Total_play_hours: {
        title: 'Play Duration',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
 
    onUserRowSelect(event){
      console.log("this is the row event",event)
    }
  constructor() {
  }
}
