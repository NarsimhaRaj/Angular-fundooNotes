import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  getData(){
    return this.http.get("http://fundoonotes.incubation.bridgelabz.com/api/user");
  }
  login(data){
    return this.http.post("http://fundoonotes.incubation.bridgelabz.com/api/user/login",data);
  }
  register(data){
    return this.http.post("http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",data);
  }
}
