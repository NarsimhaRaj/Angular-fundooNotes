import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/httpServices/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  hidePassword = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private svc: HttpService) {
  
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
    this.svc.login(loginData).subscribe((response) => { console.log("successfully loggedin");console.log(response) });
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
