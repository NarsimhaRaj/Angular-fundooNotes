import { Component, NgZone, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-components/dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  search_button: Boolean = false;
  clickOutside: Boolean = false;
  panelOpenState: Boolean = false;
  openNotes: Boolean = false;

  pin: Boolean = false;
  unpin: Boolean = false;
  checkbox: Boolean = false;

  title = new FormControl('', [
    Validators.required
  ]);
  description = new FormControl('', [
    Validators.required
  ]);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private userServices: UserService) {

  }
  // pinned(){
  //   this.pin=!this.pin;
  // }

  onClickedOutside(e: Event) {
    this.panelOpenState = !this.panelOpenState;
  }
  save() {
    if (this.title.valid && this.description.valid) {
      var notes = { title: this.title.value, description: this.description.value }
      this.userServices.addNotes(notes);
      this.title.setValue("");
      this.description.setValue("");
    }
  }
}
