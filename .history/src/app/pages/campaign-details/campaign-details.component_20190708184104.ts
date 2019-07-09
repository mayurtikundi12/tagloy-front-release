import { Component, OnInit, QueryList, ViewChildren, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import {NgbdSortableHeader, SortEvent, SortDirection} from '../../commons/sortable.directive';
import { Observable, of } from 'rxjs';
import { CountryService } from '../../commons/country.service';
import { Country } from '../../commons/countries';
import { DecimalPipe } from '@angular/common';
import { OutletDetails } from '../../commons/outlet-details';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(countries: Country[], column: string, direction: string): Country[] {
  if (direction === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: Country, term: string, pipe: PipeTransform) {
  return country.name.toLowerCase().includes(term)
    || pipe.transform(country.area).includes(term)
    || pipe.transform(country.population).includes(term);
}

@Component({
  selector: 'ngx-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
  providers: [CountryService, DecimalPipe]
})

export class CampaignDetailsComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute,
    private apiSrv:ApisService,private apiData:ApiData, public service: CountryService, private pipe: PipeTransform) {
      this.countries$ = service.countries$;
      this.total$ = service.total$;
     }

  campaignId:number ;
  campaignDetails:Object ;
  outletDetails:[] = []

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

  // @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

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

  private _state = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };


  private _search() {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let countries = sort(this.outletDetails, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    const total = countries.length;

    // 3. paginate
    countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({countries, total});
  }
}
