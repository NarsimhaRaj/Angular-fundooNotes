import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import { Subject } from 'rxjs';
import { LabelsDialogComponent } from '../labels-dialog/labels-dialog.component';
import { LabelService } from 'src/app/services/label/label.service';


@Component({
  selector: 'app-components/dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {

  mobileQuery: MediaQueryList;

  
  userDetails:any;
  isAdvancedUser:boolean=true;

  // to store a list of labels 
  labels:any;

  // to change backround color of selected sidenav list 
  onNoteListSelected:Boolean=false;
  onArchiveListSelected:Boolean=false;
  onReminderListSelected:Boolean=false;
  onTrashListSelected:Boolean=false;

  // to emit a an event on selecting grid or list view 
  emitView=new Subject();

  // list and gird view variables
  view:boolean=false;
  data={
    viewLayoutType:"row wrap",
    viewStyling:true
  }

  emitLablesEvent=new Subject();
  // changes mode of sidenav on max width 600px
  private _mobileQueryListener: () => void;

  /**
   * @description : changes mode of sidenave to over on small screnes and side on large screens, and also injects services 
   * @param changeDetectorRef  Detects when screen size reduces
   * @param media 
   * @param userServices to get UserServices 
   * @param route provides route navigation 
   */
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private userServices: UserService, private route:Router,
    private dialog:MatDialog, private labelServices:LabelService) {
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
    // to get userService using userId on first initialization
    this.getUserService();
    // to get all labels created by user
    this.getAllLabels();

    this.emitLablesEvent.subscribe(()=>{
      // to get all labels created by user
      this.getAllLabels();
    });

  }

  /**
   * @description shows list/grid view on clicking view icon
   * @param type type of list to show 
   */
  listOrGridview(type){
    this.view=!this.view;
    this.data.viewStyling=!this.data.viewStyling;
    this.data.viewLayoutType = ((type=="grid")? "row wrap":"column");
    this.data={viewLayoutType:this.data.viewLayoutType,viewStyling:this.data.viewStyling};
    
    this.emitView.next();
  }

  getData(){
    return this.data;
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
   * @description opens a dialog box for label creation or edit or delete
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(LabelsDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.emitLablesEvent.next();
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

 /**
  * @description clears session storage and redirects to login page
  */
  logout(){
    sessionStorage.removeItem('user');
    this.route.navigateByUrl("login");
  }

  /**
   * @description to display all the created labels in sidenav list 
   */
  getAllLabels(){

    this.labelServices.getNoteLabelList().subscribe((response:any)=>{
      this.labels=response.data.details;
      // console.log(this.labels)
    });

  }

  /**
   * @description redirect to labelnotes with lablename
   * @param labelName name of the label on notes
   */
  getNoteListByLabel(labelName){
    this.route.navigate(["dashboard/labelNotes",labelName]);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
