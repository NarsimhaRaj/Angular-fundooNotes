import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService:HttpService) { 
    
  }
  getData() {
    return this.httpService.getData();
  }
  login(data) {
    return this.httpService.login(data);
  }
  register(data) {
    return this.httpService.register(data);
  }
  forgotPassword(data) {
    return this.httpService.forgotPassword(data);
  }
  resetPassword(passwordData, token) {
    return this.httpService.resetPassword(passwordData,token);
  }
}
