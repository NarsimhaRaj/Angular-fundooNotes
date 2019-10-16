import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  loginUserDetails:Subject<Object> = new Subject<Object>();
  userDetails:any;

  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {
    this.loginUserDetails.subscribe((user:any)=>{
      this.userDetails=user;
    });
  }

  getUserDetailsById(){
    let url= "/user/"+this.userDetails.userId;
    return this.httpService.getUserDetailsById(url,this.userDetails.id,this.userDetails.userId);
  }

  getData() {
    let url= "/user";
    this.httpService.get(url);
  }
  login(data) {
    let url= "/user/login";
    
    return this.httpService.post(url,data);
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
    return this.httpService.postWithToken(url,passwordData, token);
  }
  
}
