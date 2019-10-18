import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loginId:boolean;

  constructor(private route:Router) {
   }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let user=JSON.parse(sessionStorage.getItem('user'));
      if(user!=null && user.id)
      {
        return true;
      }
      else
      {
        this.route.navigateByUrl('login');
      }
  }
}
