import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDetails:any;

  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {
  }

  setUser(){
    this.userDetails=JSON.parse(sessionStorage.getItem("user"));
  }

  getUser(){
    // console.log(this.userDetails);
    return sessionStorage.getItem('user');
  }

  getService(){
    let url= "/user/service";
    return this.httpService.get(url);
  }

  getUserDetailsById(){
    let url= "/user/"+JSON.parse(sessionStorage.getItem('user'))['userId'];
    return this.httpService.getUserDetailsById(url,JSON.parse(sessionStorage.getItem('user'))['id']);
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
