import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })

  constructor() {
   }

   

  ngOnInit() {
  }

  login(){
    if (this.loginForm.valid) {
      console.log("this is the form data ",this.loginForm.value);
    } else {
      console.log("form is not valid");
    }
  }

}
