import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/userServices/user.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LabelService } from 'src/app/services/label/label.service';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  // notesList from server
  notesList: any;
  isPinned: boolean = false;
  isArchived: boolean = false;

  //mat cards expansion panel variables
  private getNotesObs: any;
  panelOpenState: Boolean = false;
  
  //checkList matcard open variable 
  checkListExpansionPanel: boolean=false;
  checkListArray=new Array();
  listDescription=new FormControl('');

  // mat card title and description formcontrol varibales
  title = new FormControl('', [
    Validators.required
  ]);
  description = new FormControl('', [
    Validators.required
  ]);

  // data from dashboard component
  data = {
    viewLayoutType: "row wrap",
    viewStyling: true
  }

  // user Service variable
  isAdvancedUser: boolean = true;//initially value set to advance

  // matcardColor
  matCardColor: string = "";

  // if pin count is zero then it should not show PINNED and OTHERS headings
  pinCountZero: boolean = false;

  // contians list of all labels
  labels: any

  // to store collaboartos to new notes which will be created
  collaboratorsArray=new Array();
  //  to store labels to new notes which will be created
  newNotesLabelsArray=new Array();

  // to emit an event after every modifications
  public emitObservable: Subject<void> = new Subject<void>();

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  searchWord:string;

  component:NotesComponent;

  constructor(private userService: UserService, private noteServices: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog, private dashBoard: DashboardComponent, private labelService: LabelService) {
    this.getUserService();

    this.data = this.dashBoard.getData();

    this.dashBoard.emitView.subscribe(() => {
      this.data = this.dashBoard.getData();
    })
    this.dashBoard.emitLablesEvent.subscribe(() => {
      this.getNotesList();
      // to get All labels of user 
      this.getAllLabels();
    })
  }


  ngOnInit() {
    // to get user registered Service
    this.userService.setUser();
    this.getNotesList();

    // to get All labels of user 
    this.getAllLabels();

    this.getNotesObs = this.emitObservable.subscribe(() => {
      this.getNotesList();
      // to get All labels of user 
      this.getAllLabels();
    });

    this.dashBoard.emitSearchEvent.subscribe((search:string)=>{
      this.searchWord=search;
    })

  }

  /**
   * @description refreshes notesList and labels list
   * @param event event name
   */
  refreshNotesList(event){
    this.getNotesList();
      // to get All labels of user 
    this.getAllLabels();
  }

  updateBackgroundColor(color){
    this.matCardColor=color;
  }

  /**
   * @description to get logged in user registered service we sent a rest api request
   */
  getUserService() {
    this.userService.getUserDetailsById().subscribe((response: any) => {
      if (response.service == "basic")
        this.isAdvancedUser = false;
    });
  }

  

  /**
   * @description to pin or unpin a notes
   * @param note notes which has to be pinned
   * @param isPinned if notes is pinned true or false value will be set 
   */
  pinUnpin(note, isPinned: boolean) {
    let data = { noteIdList: [note.id], isPined: isPinned };
    this.noteServices.pinUnpinNotes(data).subscribe((response) => {
      this.emitObservable.next();
    });
  }

  /**
   * @description counts number of notes are pinned 
   */
  pinned(notesList: any) {
    let note: any;
    for (note of notesList) {
      if (note.isPined) {
        return true;
      }
    }
    return false;
  }

  onClickedOutside(e: Event) {
    this.panelOpenState = !this.panelOpenState;
  }

  setPin() {
    this.isPinned = !this.isPinned;
  }
  setArchive() {
    this.isArchived = !this.isArchived;
  }
  /**
   *@description this will add a notes to user notes list 
   */
  save() {
    if (this.title.valid || this.description.valid) {
      var notes = { 
        title: this.title.value, 
        description: this.description.value, 
        color: this.matCardColor, 
        isPined: this.isPinned, isArchived: this.isArchived
       }
  
        this.noteServices.addNotes(notes).subscribe((response:any) => {
        this.isPinned = false;
        this.isArchived = false;
        let noteId=response.status.details.id;
        
        this.saveCollaboratorArray(noteId);
        this.saveLabelsArray(noteId);

        this.reloadAfterNoteCreation();

      }, (error: any) => {
        this.snackBar.open(error.message, undefined, { duration: 2000 });
      });;

      // resetting title and description to empty
      this.title.setValue("");
      this.description.setValue("");
      // calling child event 
    }
  }

  saveCollaboratorArray(noteId){
    while(this.collaboratorsArray.length>0){
      this.noteServices.addCollaborator(noteId,this.collaboratorsArray.shift()).subscribe((responce)=>{
        this.emitObservable.next();  
      });
    }
  }

  saveLabelsArray(noteId){
    while(this.newNotesLabelsArray.length>0){
      this.noteServices.addLabelToNote(noteId,this.newNotesLabelsArray.shift().id).subscribe((response)=>{
        this.emitObservable.next();
      });
    }
  }

  reloadAfterNoteCreation(){
    if(this.newNotesLabelsArray.length<=0 || this.collaboratorsArray.length<=0)
    {
      this.emitObservable.next();
    }
  }


  /**
   * @description to get all the notes list of user 
   */
  getNotesList() {
    this.noteServices.getNotesList().subscribe((response: any) => {
      this.notesList = response.data.data;
      this.pinCountZero = this.pinned(this.notesList);
    }, (error) => {
      this.snackBar.open(error.message, undefined, { duration: 2000 });
    })
  }

  

  /**
   * @description get all the labels created by user
   */
  getAllLabels() {
    this.labelService.getNoteLabelList().subscribe((response: any) => {
      this.labels = response.data.details;
    });
  }

  /**
   * @description : delete note and add to trash notes list
   * @param note: note to be deleted
   */
  delete() {

    this.title.setValue("");
    this.description.setValue("");
    this.collaboratorsArray=[];
    this.checkListArray=[];
    this.newNotesLabelsArray=[];
    this.matCardColor="";
    this.isArchived=false;
    this.isPinned=false;
    this.panelOpenState=!this.panelOpenState;
    this.matCardColor="";
  }

  /**
   * @description adds a label to notes
   * @param noteId note id of note to which label will be added 
   * @param label label details to add
   */
  addLable(label, event) {

    if (event.checked) {
      this.newNotesLabelsArray.push(label);
    }
    else {
      this.removeLabel(label);
    }

  }
  /**
   * @description removing a label with post request params 
   * @param noteId noteid to which label attached
   * @param labelId label id
   */
  removeLabel(label) {
    this.newNotesLabelsArray=this.newNotesLabelsArray.filter(note_label => note_label!=label);
  }

  /**
   * @description to show that label is already selected and checkbox is checked
   * @param note note to which check label is checked or not 
   * @param label label details 
   */
  isChecked(label) {

    for (let notelabel of this.newNotesLabelsArray) {
      if (notelabel.label == label.label)
        return true;
    }
    return false;

  }

  /**
   * @description opens a dialog box for adding collaborator to notes 
   * @param note note details  
   */
  addCollaborator() {
      let user=JSON.parse(sessionStorage.getItem('user'));
      const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
        width: '550px',
        data: {user:user,collaborators:this.collaboratorsArray},
        panelClass: "matDialogBox"
      });
      dialogRef.componentInstance.emitCollaboratorChanges.subscribe((result:any) => {
        if(result.newCollaborator)
        {
          this.collaboratorsArray.push(result.user)
        }
        else{
          this.collaboratorsArray=result;
        }
      });
  
  }


  /**
   * @description on pressing enter value gets added to checklistArray
   * @param event enter key event trggered
   */
  EnterCheckList(event){
    if(event.keyCode==13 && this.listDescription.value!="")
    {
      let data={itemName:this.listDescription.value,status:"open"};
      this.checkListArray.push(data);
      this.listDescription.setValue("");
    }
  }

  /**
   * @description delete item from checkList on pressing cancel button
   * @param item item to be deleted
   */
  filterCheckList(item){
    this.checkListArray=this.checkListArray.filter(listItem=>listItem!=item)
  }
  /**
   * 
   */
  saveCheckList(){
    if (this.title.valid) {
      var notes = { title: this.title.value, description: "", color: this.matCardColor, isPined: this.isPinned, isArchived: this.isArchived }
      this.noteServices.addNotes(notes).subscribe((response:any) => {
        this.isPinned = false;
        this.isArchived = false;
        
        while(this.checkListArray.length>0)
        {
          
          this.noteServices.addCheckList(response.status.details.id,this.checkListArray.shift()).subscribe(response=>{
            this.emitObservable.next();
          });
        }
        if(this.checkListArray.length==0)
          this.emitObservable.next();
      }, (error: any) => {
        this.snackBar.open(error.message, undefined, { duration: 2000 });
      });
    }
    this.title.setValue("");
    this.description.setValue("");
  }

  /**
   * @description unsubscribe to noteslist if component gets destoried
   */
  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }
}
