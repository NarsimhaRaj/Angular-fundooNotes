import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-components/dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  userDetails:any;
  onNoteListSelected:Boolean=true;
  onArchiveListSelected:Boolean=false;
  onReminderListSelected:Boolean=false;
  onTrashListSelected:Boolean=false;

  isAdvancedUser:any=true;


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private userServices: UserService,private snackBar:MatSnackBar,private route:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  sideNavSelectedList(nList,rList,aList,tList){
    this.onNoteListSelected=nList;
    this.onReminderListSelected=rList;
    this.onArchiveListSelected=aList;
    this.onTrashListSelected=tList;
  }
  ngOnInit(){
    this.userDetails=this.userServices.userDetails;
    this.getUserService();
  }

  getUserService(){
    this.userServices.getUserDetailsById().subscribe((response:any)=>{
      if(response.service=="basic")
        this.isAdvancedUser=false;
    });
  }

  archiveNotes(archiveBooleanValue){
    return archiveBooleanValue;
  }

  /**
   * @description route will be changed to archive component  on clicking archive button on sidenav
   */
  goToArchiveComponent(){
    this.sideNavSelectedList(false,false,true,false);
    this.route.navigateByUrl("dashboard/archive");
  }

  /**
   * @description route will be chnaged to notes component on clicking note button on sidenav
   */
  goToNotesComponent(){
    this.sideNavSelectedList(true,false,false,false);
    this.route.navigateByUrl("dashboard");
  }
  /**
   * @description route changes to trash component on clicking trash button on sidenav
   */
  goToTrashComponent(){
    this.sideNavSelectedList(false,false,false,true);
    this.route.navigateByUrl("dashboard/trashNotes");
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
