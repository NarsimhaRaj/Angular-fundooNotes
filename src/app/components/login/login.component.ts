import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import { MatSnackBar } from '@angular/material'
import { HttpService } from 'src/app/services/httpServices/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  hidePassword = true;

  /**
   * @description  constructor injects these following dependencies on initialization
   * @param formBuilder : form buider for reactive forms
   * @param activateRoute : provides routing from one component to other component 
   * @param userService : provides user services for resetting password 
   * @param snackBar : snackbar to show resultent details
   */
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
  /**
   * @description: using reactive forms email and password are validated and passed to user services 
   * if user is valid returns successfully loged in message otherwise retunr error message accordingly
   */
  login() {

    var loginData = { email: this.loginFormGroup.get("email").value, password: this.loginFormGroup.get("password").value }
    this.userService.login(loginData).subscribe((response: any) => {

      this.snackBar.open("SuccessFully Logged In", undefined, { duration: 2000 });

      this.userService.setUser();
      
      //set userDetails to logged in user details
      sessionStorage.setItem('user',JSON.stringify(response));

      // storing token in localstorage
      this.router.navigateByUrl('/dashboard');
    }, (error: any) => {
      this.snackBar.open(error.message, undefined, { duration: 2000 })
    });;

  }
  /**
   * @description on clicking create account button provide path to register view component
   */
  registerPage(): void {
    this.router.navigateByUrl("/cart");
  }
  /**
   * @description provides path to forgotPassword on clicking forgot password button
   */
  forgotPassword() {
    this.router.navigateByUrl("/forgotPassword")
  }

  ngOnInit() {

  }
}
