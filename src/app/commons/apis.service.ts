import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApisService {

   BASE_URL_OLD: string = 'https://preprod.tagloy.com/v1/';
   BASE_URL:string = "http://13.126.120.155:3000/"
  //  BASE_LOCAL_URL:string = 'http://13.126.120.155:3000/' ;
   BASE_LOCAL_URL:string = 'http://localhost:3000/' ;

  constructor(private http:HttpClient) { 
    
  }

  getApi(endPoint,query?){
    if(query){
     return  this.http.get( this.BASE_URL+ endPoint+"?"+query) ;
    }else{
      return this.http.get(endPoint) ;
    }
  }

  postApi(endPoint,body){
    return this.http.post(this.BASE_URL+endPoint,body) ;
  }
  postOldApi(endPoint,body){
    return this.http.post(this.BASE_URL_OLD+endPoint,body) ;
  }

 

  postLocalApi(endPoint,body){
    return this.http.post(this.BASE_LOCAL_URL+endPoint,body) ;
  }

  getLocalApiWithParam(endPoint,param){
    return this.http.get(this.BASE_LOCAL_URL+endPoint+param);
  }

}
