import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDetails:any;

  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {
  }

  /**
   * @description to set user details in session Storage
   */
  setUser(){
    this.userDetails=JSON.parse(sessionStorage.getItem("user"));
  }

  /**
   * @description to get the stored details from session Storage
   */
  getUser(){
    // console.log(this.userDetails);
    return sessionStorage.getItem('user');
  }

  /**
   * @description to get services user can register, basic and advance
   */
  getService(){
    let url= "/user/service";
    return this.httpService.get(url);
  }

  /**
   * @description to get user registered service with user Id
   */
  getUserDetailsById(){
    let url= "/user/"+JSON.parse(sessionStorage.getItem('user'))['userId'];
    return this.httpService.getUserDetailsById(url,JSON.parse(sessionStorage.getItem('user'))['id']);
  }

  /**
   * to get all reistered users data
   */
  getAllUsers() {
    let url= "/user";
    return this.httpService.get(url);
  }
  /**
   * @description to login with user email and password
   * @param data data is object with email and password details
   */
  login(data) {
    let url= "/user/login";
    
    return this.httpService.post(url,data);
  }

  /**
   * @description to register to fundooNotes 
   * @param data data is user details firstname, lastname, email and password details
   */
  register(data) {
    let url= "/user/userSignUp";
    return this.httpService.post(url,data);
  }

  /**
   * @description sends a request to send email to registerd mail in case of forgotpassword 
   * @param data contains email id 
   */
  forgotPassword(data) {
    let url= "/user/reset";
    return this.httpService.post(url,data);
  }

  /**
   * @description to reset password with autherization token 
   * @param passwordData new password details
   * @param token jwt token for authentication 
   */
  resetPassword(passwordData, token) {
    let url= "/user/reset-password"
    return this.httpService.postWithToken(url,passwordData, token);
  }

  /**
   * @description to check whether user is registered user or not
   * @param data searchWord data
   */
  searchUser(data){
    let url="/user/searchUserList";
    return this.httpService.postWithToken(url,data);
  }
  
}
