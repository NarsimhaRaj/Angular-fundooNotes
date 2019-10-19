import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route:Router) {
   }
 /**
  * @description canAtivate is a AuthGuard function which allows route if condition gets true
  * @param next Contains the information about a route associated with a component loaded in an outlet at a 
  * particular moment in time.
  * @param state Represents the state of the router at a moment in time.
  */
  canActivate(): boolean {
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
