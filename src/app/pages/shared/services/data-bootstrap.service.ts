import { Injectable } from '@angular/core';
import { ApisService } from '../../../commons/apis.service';
import { ApiData } from '../../../commons/data/apis.data';
import { BehaviorSubject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import {DialogComponent } from '../dialog/dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DataBootstrapService {

  private venueDataSrc = new BehaviorSubject<any>([]) ;
  subscribableVenues = this.venueDataSrc.asObservable();

  
  private dashboardHistorySrc= new BehaviorSubject<any>({}) ;
  subscrDashbHistData = this.dashboardHistorySrc.asObservable();

  private campaignDetailSrc= new BehaviorSubject<any>({}) ;
  campaignDetailData = this.campaignDetailSrc.asObservable();

  passCampaignDetailData(data){
    this.campaignDetailSrc.next(data);
  }

  constructor(private apiSrv:ApisService,private apiData:ApiData,private dialogService: NbDialogService) {}

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
    let activeScreenCount = 0 ;
    let activeCampaignsMap = new Map();
    let completedCampaignMap = new Map();
    let totalImpressionCount = 0 ;
    let totalWatchTime:any = 0 ;
    let totalActiveImpressions:number = 0;
    let totalActiveWatchTime:any = 0
    let tempCampMap= new Map();

    for (let boot of bootData["data"]) {

      let campaignId = Number(boot["campaign"]["id"]);

      for (let venue of boot["venues"]) {
        // for getting the screen counts
        // isThere = [isActive,isPresent]
        let isThere = this.checkIfVenueActive(venues,venue)
      // console.log("isacrive ",isThere[0]," is present ",isThere[1]);
      let venueTvCount = 0 ;
      venueTvCount = this.countScreens( Object.values(venue["tvCount"]));
      // getting the total impressions and watch hours
      let currentCampImpression = ( Number(boot["campaign"]["slot"].split(".")[1])*venueTvCount);
      let  currentCampLength =Number(boot["campaign"]["duration"]) ; 

          venue["tvCount"] = venueTvCount ;
          venues.set(venue["venue_id"],venue);
          
      if (!tempCampMap.has(campaignId)) {
        tempCampMap.set(campaignId,[venue["venue_id"]]);
        totalImpressionCount +=currentCampImpression ;
        let currentCampWatchTime = currentCampLength*currentCampImpression ;
        totalWatchTime += currentCampWatchTime;
        if (boot["campaign"]["active"]) {
          totalActiveImpressions = totalActiveImpressions+currentCampImpression ;
          totalActiveWatchTime+= currentCampWatchTime;
        }

      }else{
        if (!tempCampMap.get(campaignId).includes(venue["venue_id"])) {
          // console.log("campid=> ",campaignId," venueId==>",venue["venue_id"]);
          totalImpressionCount +=currentCampImpression ;
          let currentCampWatchTime = currentCampLength*currentCampImpression ;
          totalWatchTime += currentCampWatchTime;
          tempCampMap.set(campaignId,tempCampMap.get(campaignId).push(venue["venue_id"]));
          if (boot["campaign"]["active"]) {
            totalActiveImpressions = totalActiveImpressions+currentCampImpression ;
            totalActiveWatchTime+= currentCampWatchTime;
          }
        }
      }
           
      // *****
          if (!isThere[1]) {
                      if(boot["campaign"]["active"]){
                        venue["live"] = true ;
                        activeScreenCount=activeScreenCount+venueTvCount;
                        venue["activeCampaignsCount"]=1;
                        venue["completedCampaignsCount"]=0;
                      }else{
                        venue["live"] = false ;
                        venue["completedCampaignsCount"]=1;
                        venue["activeCampaignsCount"]=0;
                      }
                      venue["tvCount"] = venueTvCount ;
                      venues.set(venue["venue_id"],venue);
                      totalTvCount = totalTvCount+ venueTvCount;
          }else{
            let newVenue = venues.get(venue["venue_id"]);
            if(boot["campaign"]["active"]){
              newVenue["activeCampaignsCount"]? newVenue["activeCampaignsCount"] = newVenue["activeCampaignsCount"] + 1:newVenue["activeCampaignsCount"]=1 ;
            }
            else{
              newVenue["completedCampaignsCount"]? newVenue["completedCampaignsCount"] = newVenue["completedCampaignsCount"] + 1:newVenue["completedCampaignsCount"] =1 ;
            }
            venues.set(venue["venue_id"],newVenue);
          }

          if(isThere[1] && !isThere[0]){
             let newVenue = venues.get(venue["venue_id"]);
              if(boot["campaign"]["active"]){
                activeScreenCount = activeScreenCount+venueTvCount;
                newVenue["live"] = true;
              }
              else{
                newVenue["live"] = false ;
              }
              venues.set(venue["venue_id"],newVenue);
          }
          
   // getting the active or completed campaign and segregating it in respective maps
   if(boot["campaign"]["active"] && !activeCampaignsMap.has(boot["campaign"]["id"])){
    activeCampaignsMap.set(boot["campaign"]["id"],boot);
    
  }else if(!completedCampaignMap.has(boot["campaign"]["id"])){
    completedCampaignMap.set(boot["campaign"]["id"],boot);
  }

        }
    }
    sessionStorage.setItem("totalScreenCount",String(totalTvCount));
    sessionStorage.setItem("totalActiveScreenCount",String(activeScreenCount));
    sessionStorage.setItem("activeCamps",JSON.stringify(Array.from(activeCampaignsMap.values())));
    sessionStorage.setItem("completedCamps",JSON.stringify(Array.from(completedCampaignMap.values())));
    
    this.venueDataSrc.next(Array.from(venues.values()));
    
    totalWatchTime= Math.round((totalWatchTime/3600)*10)/10+" hrs";
    totalActiveWatchTime =  Math.round((totalActiveWatchTime/3600)*10)/10+" hrs"
   
        // ****sending the main dashboard history data
        let dashboardHistoryObj = {
              lifeTimeViews : Math.round(totalImpressionCount*2.5),
              activeCampaignViews  :  Math.round(totalActiveImpressions*2.5),
              lifeTimeHours  :  totalWatchTime,
              activeCampaignHours  :  totalActiveWatchTime,
              lifeTimeCampaigns  :  Array.from(activeCampaignsMap.values()).length+Array.from(completedCampaignMap.values()).length,
              activeCampaigns  :  Array.from(activeCampaignsMap.values()).length,
              lifeTimeImpressions  :  totalImpressionCount,
              activeCampaignImpressions  :  totalActiveImpressions,
              mainDashboard:true
        }
        this.dashboardHistorySrc.next(dashboardHistoryObj);
        // ******

  }




  checkIfVenueActive(mapObject:Map<any,any>,currentObj):[boolean,boolean]{
      let isPresent = mapObject.has(currentObj["venue_id"])
      // console.log(isPresent,"log==> id ",currentObj);
       let isActive:boolean ;
       
       if (isPresent) {
        let venue =   mapObject.get(currentObj["venue_id"]);
        venue["live"]?isActive=true:isActive=false ;
       } else {
         isActive =false ;
       }

      return [isActive,isPresent]
  }

  countScreens(tvData):number{
    let venueTvCount = 0 ;
    for (let box of Object.values(tvData)) {
      venueTvCount += Number(box);
    }
    return venueTvCount ;
  }


  showDialog(component,index){
    this.dialogService.open(DialogComponent, {closeOnEsc: false });
  }


}
