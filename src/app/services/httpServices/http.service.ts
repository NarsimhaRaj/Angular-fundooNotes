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
  getWithToken(url){
    let headersOptions = new HttpHeaders({
      "Authorization": JSON.parse(sessionStorage.getItem("user")).id
    });
    return this.http.get(environment.baseDomainUrl + url, { headers : headersOptions });
  }

  getUserDetailsById(url,userId){
    let headersOptions = new HttpHeaders({
      "Authorization": JSON.parse(sessionStorage.getItem("user")).id
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

  postWithToken(url, passwordData, token?) {
    let headersOptions:HttpHeaders;
    if(token){
      headersOptions = new HttpHeaders({
        "Authorization": token
      });  
    }
    else
    {
      headersOptions = new HttpHeaders({
        "Authorization": JSON.parse(sessionStorage.getItem("user")).id
      });
    }
    
    return this.http.post(environment.baseDomainUrl + url, passwordData, { headers:headersOptions});
  }

  /**
   * @description delete http service with parameter
   * @param url url of delete with param
   * @param param parameter to pass
   */
  delete(url,param){
    let headersOptions = new HttpHeaders({
      "Authorization": JSON.parse(sessionStorage.getItem("user")).id
    });
    return this.http.delete(environment.baseDomainUrl + url ,{ headers : headersOptions,params:param });
  }


  /**
   * @description post with parameters in URL 
   * @param url url for getting notes list
   * @param params userId and labelId
   */
  postWithParams(url,params,data?){
    let headersOptions = new HttpHeaders({
      "Authorization": JSON.parse(sessionStorage.getItem("user")).id
    });
    return this.http.post(environment.baseDomainUrl + url ,data,{ headers : headersOptions, params:params });
  }

  patch(url){
    let headersOptions = new HttpHeaders({
      "Authorization": JSON.parse(sessionStorage.getItem("user")).id
    });
    return this.http.patch(environment.baseDomainUrl + url ,null,{ headers : headersOptions });
  }
}
