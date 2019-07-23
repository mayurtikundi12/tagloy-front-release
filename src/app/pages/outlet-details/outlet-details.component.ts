import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../commons/apis.service';
import { ApiData } from '../../commons/data/apis.data';
import { ActivatedRoute } from '@angular/router';
import { DataBootstrapService } from '../shared/services/data-bootstrap.service';

@Component({
  selector: 'ngx-outlet-details',
  templateUrl: './outlet-details.component.html',
  styleUrls: ['./outlet-details.component.scss']
})
export class OutletDetailsComponent implements OnInit {
  options: boolean = true;
  postId:number ;
  venueId:number ;
  chosenDate:String  ;
  hourData ;
  hourKeys ;
  impression= 0 ;
  wasCampaignClicked = true ;
  zomatoData ;
  datePickerType:string = 'single';
  months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  monthsDays = [31, 28,  31,   30,   31,    30,  31,   31,   30    ,31,   30,  31] ;
  constructor(private apiSrv:ApisService,
       private apiData:ApiData ,
       private _activeRoute:ActivatedRoute,
       private bootSrv:DataBootstrapService){

  }

  ngOnInit() {
    this.venueId = Number(this._activeRoute.snapshot.paramMap.get('venueId'));
    this.postId = Number(this._activeRoute.snapshot.paramMap.get('postId'));

    if(this.postId==0) this.wasCampaignClicked =false ;

    // console.log("this is the cvenueid ",this.venueId," and the post id is ",this.postId);

    if (this.venueId) {
      this.apiSrv.getLocalApiWithParam(this.apiData.URL_GET_ZOMATO_DATA,this.venueId).subscribe(data=>{
        // console.log("this is the zomato data ",data);
        this.zomatoData = data ;
      })
    }

    let showtime = new Date(Date.now());
    let body = {
      year : showtime.getFullYear(),
      month:showtime.getMonth()+1,
      day :showtime.getDate()
    }
    // this.getDayLog(body);
    this.getInitialDateRange();
  }


  getDayLog(data){
    this.hourKeys = null ;
    data.postId = this.postId ;
    data.venueId = this.venueId ;
    this.impression =0 ;
    this.apiSrv.postLocalApi(this.apiData.URL_GET_VENUE_LOG,data).subscribe(data=>{
      // console.log("getting this data for the given date ",data);
      let newData = data["data"] ;
      delete newData["postId"] ;
      delete newData["id"] ;
      delete newData["venueId"] ;
      delete newData["impression_count"] ;
      delete newData["year"] ;
      delete newData["month"] ;
      delete newData["day"] ;

      this.hourData = newData;
      this.hourKeys = Object.keys(newData);
      let outlineArray= []
      for (const key of this.hourKeys) {
        let rawValue = key.split("_")[1]
        rawValue<10?rawValue="0"+rawValue+":00":rawValue=rawValue+":00" ;
        this.impression +=newData[key] ;
        outlineArray.push({label:rawValue,value:newData[key]})
      }
      this.bootSrv.graphDetailSrc.next({
        "isDashboard": false,
        "venueLog":outlineArray
      });
      // console.log({
      //   "isDashboard": false,
      //   "venueLog":outlineArray
      // });
      
    },error=>{
      console.log("error in fetching the file ",error);
      
    });
  }

  gotDate(event){
    this.hourKeys = null ;
    let date = new Date(event) ;
    this.chosenDate = date.toDateString() ;
    let body = {
       year : date.getFullYear(),
       month : date.getMonth()+1,
       day : date.getDate(),
    }
    this.getDayLog(body)
    // console.log("year",year," month ",month," day ",day);
  }

  changeDataPicker(pickertype){
    this.datePickerType = pickertype;
  }

  gotDateRange(event){
    this.hourKeys = null ;
    if(event["start"] && event["end"]){
      let startDate = new Date(event["start"]) ;
      let endDate = new Date(event["end"]);
      this.chosenDate = startDate.toDateString()+" - "+endDate.toDateString();
          let body = {
            startYear : startDate.getFullYear(),
            startMonth : startDate.getMonth()+1,
            startDay : startDate.getDate(),
            endYear : endDate.getFullYear(),
            endMonth : endDate.getMonth()+1,
            endDay : endDate.getDate(),
            postId : this.postId ,
            venueId : this.venueId 
        }    
        // getting the days difference
        let dayDiff = this.findDaysDiff(event["start"],event["end"]);
        this.apiSrv.postLocalApi(this.apiData.URL_LOG_RANGE,body).subscribe(data=>{
          this.createRangeGraphData(data,startDate,dayDiff)
         
        },error=>{
          console.log("this is the error",error);
          
        })
    }
  } 

    createRangeGraphData(data,startDate,dayDiff){
      let outlineArray = [];
      this.impression = 0
      if(data["data"].length >0 ){
           
          let startDayObj =  {
            day : startDate.getDate(),
            month:startDate.getMonth()+1,
            year : startDate.getFullYear()
          }
         
        
          for(let x=0 ; x<= dayDiff ; x++){
            let isPrsntData =this.isDayPresent(data["data"], startDayObj);
              this.impression += isPrsntData[1];
              outlineArray.push({
                label:this.months[Number(startDayObj["month"])-1]+"/"+(Number(startDayObj["day"])) ,
                value: isPrsntData[1]
              })
            
              console.log("our date ", startDayObj["day"],"this is max day of month ",this.months[startDayObj["month"]],"==>",this.monthsDays[Number(startDayObj["month"])-1]);
              
            if (startDayObj["day"]>= (this.monthsDays[Number(startDayObj["month"])-1]) ) {
                startDayObj["day"] =1;
                 startDayObj["month"] = Number(startDayObj["month"])+1;
            } else {
              if (startDayObj["month"]==12) {
                startDayObj["day"] =1;
                startDayObj["month"] = Number(startDayObj["month"])+1;
                startDayObj["year"] = Number(startDayObj["year"])+1;
              } else {
                startDayObj["day"] =Number(startDayObj["day"])+1;
                // startDayObj["month"] = Number(startDayObj["month"]);
              }
            }
          }

        this.bootSrv.graphDetailSrc.next({
          "isDashboard": false,
          "venueLog":outlineArray
        });
        this.hourKeys = 1 ;
        }
    }

    isDayPresent(daysArray,currentDayObj):[boolean,number]{
      let flag = false ;
      let imp_count = 0
      for (let dayObj of daysArray) {
        if (dayObj["day"] == currentDayObj["day"] &&
        (Number(dayObj["month"])) == currentDayObj["month"] &&
        dayObj["year"] == currentDayObj["year"] ) {
        flag = true ;
        imp_count = dayObj["impression_count"];
        // console.log("day obj ",dayObj," cuurnt day obj ",currentDayObj);
        continue ;
        } 
      }
      if (flag) {
        return [true,imp_count]
      } else {
        return [false,imp_count]
      }
    }

    getInitialDateRange(){
  
      if( sessionStorage.getItem("curentCampaignDetail")){
        let currCamp = JSON.parse(sessionStorage.getItem("curentCampaignDetail"))
        let rawCampStartDate = new Date(currCamp["campaign"]["campaign"]["start_datetime"]); 
        let rawCampEndDate = new Date(currCamp["campaign"]["campaign"]["end_datetime"]);   
        let currDate =    Date.now();
        if(this.compareDates(currDate,rawCampEndDate)){
          // comparing end current date and end date
          this.chosenDate = rawCampStartDate.toDateString()+" - "+rawCampEndDate.toDateString();
          this.gotDateRange({start:rawCampStartDate,end: rawCampEndDate})
        }else{
          this.gotDateRange({start:rawCampStartDate,end: Date.now()})
        }
      }
  
    }

    findDaysDiff(date1,date2){
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }





    compareDates(date1,date2):boolean{
      // returns true if date1 is greater else false
      let dateA = new Date(date1) ;
      let dateB=  new Date(date2);
      if(dateA.getFullYear() > dateB.getFullYear()){
        return true ;
      }else if(dateA.getFullYear() == dateB.getFullYear()){
          // if years are equal compare for the months
          if(dateA.getMonth() > dateB.getMonth()){
            return true
          }else if(dateA.getMonth() == dateB.getMonth()){
            // if months are also same check for the dates
              if (dateA.getDate() > dateB.getDate()) {
                return true ;
              } else if(dateA.getDate() == dateB.getDate()) {
                return true;
                // since now it doesnt matter since day is same
              }else{
                return false ;
              }
          }else{
            return false ;
          }

      }else{
        return false;
      }
    }


}
