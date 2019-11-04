import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import { Subject } from 'rxjs';
import { LabelsDialogComponent } from '../labels-dialog/labels-dialog.component';
import { LabelService } from 'src/app/services/label/label.service';
import { environment } from 'src/environments/environment.prod';
import { ImageCropDialogComponent } from '../image-crop-dialog/image-crop-dialog.component';


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

  profileImageUrl:any;

  // to emit a an event on selecting grid or list view 
  emitView=new Subject();

  // list and gird view variables
  view:boolean=false;
  data={
    viewLayoutType:"row wrap",
    viewStyling:true
  }

  emitLablesEvent=new Subject();

  emitSearchEvent=new Subject();

  openSearhBar:boolean=false;

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

  ngOnInit(){
    this.userDetails=JSON.parse(this.userServices.getUser());
    // to get userService using userId on first initialization
    this.getUserService();

    sessionStorage.setItem("fundooProfileimage",this.userDetails.imageUrl);

    this.getProfilemage();
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
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.emitLablesEvent.next();
    });
  }

 /**
  * @description clears session storage and redirects to login page
  */
  logout(){
    sessionStorage.removeItem('user');
    this.route.navigateByUrl("card");
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

  searchBox(event){
    this.emitSearchEvent.next(event.target.value);
  }

  /**
   * @description gets userProfile image after login
   */
  getProfilemage(){
    let profileImage=sessionStorage.getItem("fundooProfileimage");
    this.profileImageUrl = `url(http://fundoonotes.incubation.bridgelabz.com/${profileImage})`;
  }

  /**
   * @description it opens a imagecrop dialog component with selected image as cropped input, saves profileimages on upload
   * @param event input file event 
   */
  fileChangeEvent(event){
    const dialogRef = this.dialog.open(ImageCropDialogComponent, {
      width: 'auto',
      height:"auto",
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      let fd=new FormData();
      fd.append('file',result);
      // console.log(result);
      this.userServices.uploadProfileImage(fd).subscribe((response:any)=>{
        sessionStorage.setItem("fundooProfileimage",response.status.imageUrl);
        this.getProfilemage();
        console.log(response)
      });
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
