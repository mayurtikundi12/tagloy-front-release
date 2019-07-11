import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiData } from '../commons/data/apis.data';
import { ApisService } from '../commons/apis.service';
import Swal from 'sweetalert2' ;


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {

  loginForm = new FormGroup({
    Email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })


  constructor(private apiSrv:ApisService
    ,private apiData:ApiData
    ,private _router:Router) {
    
   }

   

  ngOnInit() {
  }

  login(){
   
    if (this.loginForm.valid) {
      this.apiSrv.postApi(this.apiData.URL_LOGIN,this.loginForm.value).subscribe((data)=>{
        // console.log("this is the auth data",data);
        localStorage.setItem('token',data["result"]["token"])
        localStorage.setItem('username',data["result"]["username"])
        localStorage.setItem('name',data["result"]["Name"])
        localStorage.setItem('id',data["result"]["adbid"])
        Swal.fire({
          title:'Login Successful',
          type:"success"
        }
        )
        setTimeout(() => {
          this._router.navigate(['/dashboard'])
        }, 300);
      },error=>{
              if(error.status == 401){
                // console.log("unauthorized user");
                Swal.fire({
                  title:'Unautorized User !',
                  text:"please try again with correct credentials",
                  type:"error"
                }
                )
              }
             
        })
    } else {
      // console.log("form is not valid");
    }
  }


}
