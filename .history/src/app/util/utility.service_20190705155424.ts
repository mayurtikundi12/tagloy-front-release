import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { CommonURL } from '../commons/common';
import { ApiData } from '../commons/data/apis.data'
// import {DialogResultCustomDialog} from "../dialogs/custom-dialog/custom-dialog-component";
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  mutex:boolean = false;
  dialogRef:any;
  constructor(private http: Http, private router: Router) {
    this.mutex = false;
   }


   callGetApi(apiurl: string, params?: URLSearchParams) {
    return this.http.get(apiurl, {
        search: params
      })
      .pipe( map(
        (response: Response) => {
          return this.handleResponse(response, apiurl);
        }
      )
      ,catchError(
        //(error: Response) => {
        //  return this.handleErrorResponse(error.json());
        //}
        (error: Response) => (error.status == 401) ? this.handleErrorResponse(error.json()) : Observable.throw(error.json())
      ));
  }

  callPostApi(apiurl: string, body: any, options?) {

    if(this.isInValidSession()){
     this.router.navigate(["/login"])
    }else{
      return this.http.post(apiurl, body, options).pipe( map(
        (response: Response) => {
          const json = response.json() as any;
            return this.handleResponse(response.json(), apiurl);
        }
      ),
      catchError(
        (error: Response) => ((error.status == 401 || error.status == 404) && apiurl != (ApiData.BASE_URL + ApiData.URL_LOGIN)) ? this.handleErrorResponse(error.json()) : Observable.throw(error.json())

      ));
    }

  }

  callPutApi(apiurl: string, body: any, params?: URLSearchParams) {
    return this.http.post(apiurl, body, {
      search: params
    }).pipe(map(
      (response: Response) => {
        return this.handleResponse(response.json(), apiurl);
      }
    ),catchError(
      (error: Response) => (error.status == 401) ? this.handleErrorResponse(error.json()) : Observable.throw(error.json())
    ));
  }

  callDeleteApi(apiurl: string, params?: URLSearchParams) {
    return this.http.post(apiurl, {
      search: params
    }).pipe(map(
      (response: Response) => {
        return this.handleResponse(response.json(), apiurl);
      }
    ),catchError(
      (error: Response) => (error.status == 401) ? this.handleErrorResponse(error.json()) : Observable.throw(error.json())
    ));
  }

  prepareRequestParams(params): URLSearchParams {
    let searchParam: URLSearchParams = new URLSearchParams();
    if (typeof params == 'object') {
      for (var i in params) {
        searchParam.set(i, params[i]);
      }
      return searchParam;
    }
    return null;
  }

  handleResponse(response, apiurl) {
    // if(apiurl == Commons.BASE_URL + Commons.GET_VENUE_PERK_REPORT_EXCEL)
    //   return response;
    // else{
      // if (response.status_code == 200 || response.status_code == 201) {
        return response;
      // } else {
      //   return null;
      // }
    // }
  }

  handleErrorResponse(error){
    if(error.status_code == 401){
          this.router.navigate(["/login"]);
    }else if(error.status_code == 403){
      console.log('error 403');
    }else{
      return error;
    }


  }

  setLocalstorageKey(key, val) {
    localStorage.setItem(key, val);
  }

  getLocalStorageKey(key) {
    return localStorage.getItem(key);
  }

  removeLocalStorageKey(key) {
    localStorage.removeItem(key);
  }

  isInValidSession(){

    if(this.getLocalStorageKey(CommonURL.LOCAL_STORAGE_SESSION_TIMESTAMP) == null &&
    this.getLocalStorageKey(CommonURL.LOCAL_STORAGE_USER_KEY) == null &&
    this.getLocalStorageKey(CommonURL.LOCAL_STORAGE_USER_LIST) == null)
      return false;
    else{
      let lastTimeStamp:any = JSON.parse(this.getLocalStorageKey(CommonURL.LOCAL_STORAGE_SESSION_TIMESTAMP));

      let currentTimeStamp = Date.now();

      // console.log("currentTimeStamp - lastTimeStamp",currentTimeStamp - lastTimeStamp)
      // console.log("CommonURL.SESSION_TIMEOUT",12 * 60 * 60 * 1000)
      if((currentTimeStamp - lastTimeStamp) > CommonURL.SESSION_TIMEOUT)
      {
        this.removeLocalStorageKey(CommonURL.LOCAL_STORAGE_USER_KEY);
        this.removeLocalStorageKey(CommonURL.LOCAL_STORAGE_USER_LIST);
        this.removeLocalStorageKey(CommonURL.LOCAL_STORAGE_SESSION_TIMESTAMP);
        return true;
      }
      else
        return false;
    }
  }

  // redirectToLogin(){
  //   this.sharedService.updateIsRequestOn(false);
  //   this.sharedService.dialogText = {
  //     title : CommonUIStrings.FAILURE,
  //     description : CommonUIStrings.SESSION_EXPIRED,
  //     isInfoDialog : true,
  //     headerBgClass : CommonUIStrings.REJECT_POPUP_BG_CLASS,
  //     headerIcon : CommonUIStrings.REJECT_POPUP_ICON_CLASS
  //   };
  //   this.dialogRef.afterClosed().subscribe(result => {
  //     if(result == 1)
  //     {
  //       this.router.navigate(["/" + CommonURL.URL_LOGIN ]);
  //     }
  //   });
  // }

}

