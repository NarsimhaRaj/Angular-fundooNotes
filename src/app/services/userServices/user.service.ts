import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private messageSource = new BehaviorSubject('');
  loginId = this.messageSource.asObservable();

  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {

  }
  getData() {
    let url= "/user";
    this.httpService.get(url);
  }
  login(data) {
    let url= "/user/login";
    
    this.httpService.post(url,data).subscribe((response: any) => {
      this.snackBar.open("SuccessFully Logged In", undefined, { duration: 2000 });
      this.loginId = response.id;
      this.router.navigateByUrl('/dashboard');
    }, (error: any) => {
      this.snackBar.open(error.message, undefined, { duration: 2000 })
    });

  }

  register(data) {
    let url= "/user/userSignUp";
    return this.httpService.post(url,data);
  }
  forgotPassword(data) {
    let url= "/user/reset";
    return this.httpService.post(url,data);
  }
  resetPassword(passwordData, token) {
    let url= "/user/reset-password"
    this.httpService.postWithToken(url,passwordData, token)
      .subscribe((response: any) => {
           this.snackBar.open("password has been changed", undefined, { duration: 2000 });
        }, (error: any) => {
          this.snackBar.open(error.message, undefined, { duration: 2000 });
       });

  }
  
}
