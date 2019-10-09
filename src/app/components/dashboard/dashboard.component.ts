import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-components/dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  search_button:Boolean=false;

  pin:Boolean=false;
  checkbox:Boolean=false;
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  panelOpenState:Boolean = false;
  
  constructor(private breakpointObserver: BreakpointObserver) {
    // console.log(this.pin);
  }
  pinned(){
    this.pin=!this.pin;
  }
}
