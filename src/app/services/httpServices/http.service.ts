import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * @description: executes http get request with given url
   * @param url : restAPI service for getting data from
   */
  get(url) {
    return this.http.get(environment.baseDomainUrl + url);
  }

  /**
   * @description: executes http get request with header token for validation
   * @param url : restAPI service for getting data from
   */
  getWithToken(url,token){
    let headersOptions = new HttpHeaders({
      "Authorization": token
    });
    return this.http.get(environment.baseDomainUrl + url, { headers : headersOptions });
  }

  getUserDetailsById(url,token,userId){
    let headersOptions = new HttpHeaders({
      "Authorization": token
    });
    let idParam=new HttpParams().set('id',userId);
    return this.http.get(environment.baseDomainUrl + url , { headers : headersOptions,params:idParam });
  }
  /**
   * @description: executes http post request 
   * @param url : restAPI post service to post data
   * @param data : object containing details to post
   */
  post(url,data) {
    return this.http.post(environment.baseDomainUrl + url, data);
  }

  /**
   * @description: executes http post request with header token 
   * @param url : restAPI post service to post data
   * @param data : object containing details to post
   * @param token : token for validaiton
   */

  postWithToken(url, passwordData, token) {
    let headersOptions = new HttpHeaders({
      "Authorization": token
    });
    return this.http.post(environment.baseDomainUrl + url, passwordData, { headers:headersOptions});
  }
}
