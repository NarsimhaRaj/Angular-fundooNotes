import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  hidePassword = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService,private snackBar:MatSnackBar) {
  
    this.loginFormGroup = this.formBuilder.group({
      "email": new FormControl('', [
        Validators.email
      ]),
      "password": new FormControl('', [
        Validators.minLength(8)
      ])
    })
    
  }

  login() {

    var loginData = { email: this.loginFormGroup.get("email").value, password: this.loginFormGroup.get("password").value }
    this.userService.login(loginData)
    .subscribe((response:any) => { 
      this.snackBar.open("SuccessFully Logged In",undefined,{duration:2000});  
    },(error:any)=>{
      this.snackBar.open(error.message,undefined,{duration:2000})
    });

  }

  registerPage(): void {
    this.router.navigateByUrl("/register");
  }

  forgotPassword() {
    this.router.navigateByUrl("/forgotPassword")
  }

  ngOnInit() {

  }
}
