import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get(environment.baseDomainUrl + "/user");
  }
  login(data) {
    return this.http.post(environment.baseDomainUrl + "/user/login", data);
  }
  register(data) {
    return this.http.post(environment.baseDomainUrl + "/user/userSignUp", data);
  }
  forgotPassword(data) {
    return this.http.post(environment.baseDomainUrl + "/user/reset", data);
  }
  resetPassword(passwordData, token) {
    let headersOptions = new HttpHeaders({
      "Authorization": token
    });
    return this.http.post(environment.baseDomainUrl + "/user/reset-password", passwordData, { headers:headersOptions});
  }
  addNotes(notes,token){
    let headersOptions = new HttpHeaders({
      "Authorization": token
    });
    return this.http.post(environment.baseDomainUrl + "/notes/addNotes", notes,{ headers : headersOptions });
  }
  getNotesList(token){
    let headersOptions = new HttpHeaders({
      "Authorization": token
    });
    return this.http.get(environment.baseDomainUrl + "/notes/getNotesList", { headers : headersOptions });
  }
  deleteNotes(data,token){
    let headersOptions = new HttpHeaders({
      "Authorization": token
    });
    return this.http.post(environment.baseDomainUrl + "/notes/trashNotes", data,{ headers : headersOptions });
  }
}
