import { Component, NgZone, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components/dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  search_button: Boolean = false;
  // clickOutside: Boolean = false;
  
  openNotes: Boolean = false;

  // pin: Boolean = false;
  // unpin: Boolean = false;
  // checkbox: Boolean = false;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private noteServices: NoteService,private snackBar:MatSnackBar,private route:Router) {

  }

  archiveNotes(archiveBooleanValue){
    return archiveBooleanValue;
  }

  /**
   * @description route will be changed to archive component  on clicking archive button on sidenav
   */
  goToArchiveComponent(){
    this.route.navigateByUrl("dashboard/archive");
  }

  /**
   * @description route will be chnaged to notes component on clicking note button on sidenav
   */
  goToNotesComponent(){
    this.route.navigateByUrl("dashboard");
  }
  /**
   * @description route changes to trash component on clicking trash button on sidenav
   */
  goToTrashComponent(){
    this.route.navigateByUrl("dashboard/trashNotes");
  }
}
