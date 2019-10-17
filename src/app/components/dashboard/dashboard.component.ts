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

  view:boolean=false;
  userDetails:any;
  isAdvancedUser:any=true;

  onNoteListSelected:Boolean=true;
  onArchiveListSelected:Boolean=false;
  onReminderListSelected:Boolean=false;
  onTrashListSelected:Boolean=false;

  public emitViewType:Subject<string>=new Subject<string>();
  private _mobileQueryListener: () => void;

  /**
   * @description : changes mode of sidenave to over on small screnes and side on large screens, and also injects services 
   * @param changeDetectorRef  Detects when screen size reduces
   * @param media 
   * @param userServices to get UserServices 
   * @param route provides route navigation 
   */
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private userServices: UserService, private route:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  /**
   * @description sets on of the sidenav list value to true, css class with background color gets applied on whichever list return true 
   * @param nList notes sidenav list item
   * @param rList reminder sidenav list item
   * @param aList archive sidenav list item
   * @param tList trash sidenav list item
   */
  sideNavSelectedList(nList,rList,aList,tList){

    this.onNoteListSelected=nList;
    this.onReminderListSelected=rList;
    this.onArchiveListSelected=aList;
    this.onTrashListSelected=tList;
  }

  ngOnInit(){
    this.userDetails=JSON.parse(this.userServices.getUser());
    this.getUserService();
  }

  listOrGridview(type){
    this.view=!this.view;
    this.emitViewType.next(type);
  }

  /**
   * @description gets user selected service on userId which is set from session storage, depending on the selected service 
   * option are enabled or disabled
   */
  getUserService(){
    this.userServices.getUserDetailsById().subscribe((response:any)=>{
      if(response.service=="basic")
        this.isAdvancedUser=false;
    });
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

  logout(){
    sessionStorage.removeItem('user');
    this.route.navigateByUrl("login");
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
