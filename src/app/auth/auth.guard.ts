import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * @description authentication guard to dashboard component, allows only if user id is Present in sessionStorage 
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router) {
  }
  /**
   * @description canAtivate is a AuthGuard function which allows route if condition gets true.
   */
  canActivate(): boolean {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user != null && user.id) {
      return true;
    }
    else {
      this.route.navigateByUrl('cart');
    }
  }
}

/**
 * @description authentication guard for registration page, allows only if serviceId is Present in sessionStorage 
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {

  constructor(private route: Router) {
  }
  /**
   * @description canAtivate is a AuthGuard function which allows route if condition gets true
   */
  canActivate(): boolean {
    let serviceId = sessionStorage.getItem('serviceId');
    if (serviceId != null) {
      return true;
    }
    else {
      this.route.navigateByUrl('card');
    }
  }
}