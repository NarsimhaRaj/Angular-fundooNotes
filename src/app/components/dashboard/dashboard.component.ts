import { Component, NgZone, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userServices/user.service';
import { NoteService } from 'src/app/services/noteServices/note.service';

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

  private eventsSubject:Subject<any>=new Subject<any>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private noteServices: NoteService) {

  }
  
  onClickedOutside(e: Event) {
    this.panelOpenState = !this.panelOpenState;
  }

  // 
  save() {
    if (this.title.valid && this.description.valid) {
      var notes = { title: this.title.value, description: this.description.value }
      this.noteServices.addNotes(notes);

      // resetting title and description to empty
      this.title.setValue("");
      this.description.setValue("");

      // calling child event 
      this.eventsSubject.next();
    }
  }
}
