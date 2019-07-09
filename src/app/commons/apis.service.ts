import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {ApiData} from './data/apis.data' ;
@Injectable({
  providedIn: 'root'
})
export class ApisService {

   BASE_URL: string = 'https://preprod.tagloy.com/v1/';
   BASE_LOCAL_URL:string = "http://localhost:3000/"
  //  BASE_URL: string = 'https://biz.tagloy.com/v1/';

  constructor(private http:HttpClient) { }

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

  postLocalApi(endPoint,body){
    return this.http.post(this.BASE_LOCAL_URL+endPoint,body) ;
  }

}
