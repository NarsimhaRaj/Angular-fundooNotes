import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public emailFormController: FormControl;
  forgotButton:Boolean=false;
  constructor(private router:Router) {
    this.emailFormController = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
  }
  btnClick():void {
    this.router.navigateByUrl("/register");
  };
  forgotEmailToggle(){
    this.forgotButton=!this.forgotButton;
  }
  ngOnInit() {

  }
}
