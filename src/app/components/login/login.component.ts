import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/httpServices/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //login details
  email:String;
  password:any;

  emailFormController: FormControl;
  forgotButton:Boolean=false;
  hidePassword=true;
  
  constructor(private router:Router,private svc:HttpService) {
    this.emailFormController = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
  }
  login(){
    var loginData={email:this.email,password:this.password}
    this.svc.login(loginData).subscribe((response)=>{console.log(response)});
  }
  registerPage():void {
    this.router.navigateByUrl("/register");
  };
  forgotPassword(){
    this.router.navigateByUrl("/forgotPassword")
  }
  forgotEmailToggle(){
    this.forgotButton=!this.forgotButton;
  }
  ngOnInit() {

  }
}
