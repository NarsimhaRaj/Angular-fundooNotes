import { Component, NgZone } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-components/dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  search_button:Boolean=false;
  clickOutside:Boolean=false;
  panelOpenState:Boolean = false;

  pin:Boolean=false;
  unpin:Boolean=false;
  checkbox:Boolean=false;
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  
  
  constructor(private breakpointObserver: BreakpointObserver) {
    // console.log(this.pin);
  }
  pinned(){
    this.pin=!this.pin;
  }

  onClickedOutside(e: Event) {
    this.panelOpenState=!this.panelOpenState;
  }
}
