import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate,CanActivateChild {


  canActivate():boolean{
    return true  ;
  }

  canActivateChild():boolean{
    return true ;
  }
  constructor(private _router:Router) {

   }

}
