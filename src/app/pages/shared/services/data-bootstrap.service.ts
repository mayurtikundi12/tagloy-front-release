import { Injectable } from '@angular/core';
import { ApisService } from '../../../commons/apis.service';
import { ApiData } from '../../../commons/data/apis.data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBootstrapService {

  private venueDataSrc = new BehaviorSubject<any>([]) ;
  subscribableVenues = this.venueDataSrc.asObservable();

  private activeCampSrc = new BehaviorSubject<any>([]) ;
  subscribableActiveCamps = this.activeCampSrc.asObservable();

  private completedCampSrc = new BehaviorSubject<any>([]) ;
  subscribableCompletedCamps = this.completedCampSrc.asObservable();
  

  constructor(private apiSrv:ApisService,private apiData:ApiData) {}

  getDataAtInit(){
    // if (this.checkLastSavedtime()) {
         const id = localStorage.getItem("id");
        this.apiSrv.postLocalApi(this.apiData.URL_GET_BOOTSTRAP_DATA,{"adbid":id}).subscribe(data=>{
          console.log("this is the boot data ",data);
          
        data["saveTime"] = Date.now();
        sessionStorage.setItem('bootData',JSON.stringify(data));
        this.organiseVenueData();
    });
    // }
  }


  checkLastSavedtime():boolean{
    let savedTime = JSON.parse(sessionStorage.getItem('bootData') )?JSON.parse(sessionStorage.getItem('bootData'))["saveTime"]:null ; 
    if(!savedTime) return true;
    else if (Date.now() - savedTime> 0) {
      return false
    }else return true ;
  }

  organiseVenueData(){

    let bootData = JSON.parse(sessionStorage.getItem('bootData') );
    let venues = new Map() ;
    let totalTvCount = 0 ;
    let activeCampaignsMap = new Map();
    let completedCampaignMap = new Map()
    for (let boot of bootData["data"]) {

      // getting the active or completed campaign and segregating it in respective maps
      if(boot["campaign"]["active"]){
        activeCampaignsMap.set(boot["campaign"]["id"],boot)
      }else{
        completedCampaignMap.set(boot["campaign"]["id"],boot)
      }

      for (let venue of boot["venues"]) {
        // for getting the screen counts
        // isThere = [isActive,isPresent]
        let isThere = this.checkIfVenueActive(venues,venue)
      console.log("isacrive ",isThere[0]," is present ",isThere[1]);
          if (!isThere[1]) {
                    let venueTvCount = 0 ;
                    for (let box of Object.values(venue["tvCount"])) {
                        venueTvCount += Number(box);
                      }
                      if(isThere[0]){
                        venue["live"] = true ;
                      }else{
                        venue["live"] = false ;
                      }

                      venue["tvCount"] = venueTvCount ;
                      venues.set(venue["venue_id"],venue);
                      totalTvCount = totalTvCount+ venueTvCount;
                      // console.log("venue-id",venue["venue_id"]," tvCount-process ",totalTvCount );
                      
          }

          if(isThere[1] && !isThere[0]){
              venue = venues.get(venue["venue_id"])
              boot["campaign"]["active"]?venue["live"] = true :venue["live"] = false ;
              venues.set(venue["venue_id"],venue)
          }
          //  for checking if the venue is active by checking if any campaign is running here or not
      }
    }
    sessionStorage.setItem("totalScreenCount",String(totalTvCount))
    console.log("this is total tv count ",totalTvCount);
    
    this.activeCampSrc.next(Array.from(activeCampaignsMap.values()))
    this.completedCampSrc.next(Array.from(completedCampaignMap.values()))
    this.venueDataSrc.next(Array.from(venues.values()))
  }




  checkIfVenueActive(mapObject:Map<any,any>,currentObj):[boolean,boolean]{
      let isPresent = mapObject.has(currentObj["venue_id"])
      console.log(isPresent,"log==> id ",currentObj);
      
       let isActive:boolean ;
       
       if (isPresent) {
        let venue =   mapObject.get(currentObj["venue_id"]);
        venue["live"]?isActive=true:isActive=false ;
       } else {
         isActive =false ;
       }

      return [isActive,isPresent]
  }


}
