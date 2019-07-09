import { Component, OnInit, QueryList, ViewChildren, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import {NgbdSortableHeader, SortEvent} from '../../commons/sortable.directive';
import { Observable } from 'rxjs';
import { CountryService } from '../../commons/country.service';
import { Country } from '../../commons/countries';
import { DecimalPipe } from '@angular/common';
import { OutletDetails } from '../../commons/outlet-details';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
  providers: [CountryService, DecimalPipe]
})
export class CampaignDetailsComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute,
    private apiSrv:ApisService,private apiData:ApiData, public service: CountryService, pipe: DecimalPipe) {
      this.outletDetails = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text, pipe))
      );
     }

  campaignId:number ;
  campaignDetails:Object ;
  outletDetails: Observable<OutletDetails[]>;
  filter = new FormControl('');

  ngOnInit() {
   console.log( "*****",this._activatedRoute.snapshot.paramMap.get('campaignId'));
   this.campaignId = Number(this._activatedRoute.snapshot.paramMap.get('campaignId')) ;
   this.apiSrv.postApi(this.apiData.URL_DETAILS_CAMPAIGNS,{id:this.campaignId}).subscribe(data=>{
     this.campaignDetails = data["result"][0] ;
     this.outletDetails = this.campaignDetails["Venue_Details"] ;
     console.log("outlet details", this.outletDetails);
   })
  }

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }



 search(text: string, pipe: PipeTransform) {
    return this.outletDetails.filter(outletDetail => {
      const term = text.toLowerCase();
      return outletDetail.name.toLowerCase().includes(term)
          || pipe.transform(outletDetail.hash_tag).includes(term)
          || pipe.transform(outletDetail.Total_play_hours).includes(term);
    });
  }

}
