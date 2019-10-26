import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/userServices/user.service';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
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

  // to emit an event after every modifications
  public emitObservable: Subject<void> = new Subject<void>();

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  searchWord:string;

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
   * @description to get logged in user registered service we sent a rest api request
   */
  getUserService() {
    this.userService.getUserDetailsById().subscribe((response: any) => {
      if (response.service == "basic")
        this.isAdvancedUser = false;
    });
  }

  /**
   * @description opens a dialog box for updating selected note
   * @param note note, which has to be updated
   */
  openDialog(note): void {

    if (this.isAdvancedUser) {

      const dialogRef = this.dialog.open(UpdateDialogComponent, {
        width: '550px',
        data: note,
        panelClass: "matDialogBox"
      });
      
      dialogRef.afterClosed().subscribe(result => {

        if(result.isArchived){
          console.log(result);
          this.archive(result.note);
        }
        if(result.color){
          this.updateBackgroundColor(result.color, note);
        }
        else if (result.isDeleted) {
          this.delete(note);
        }
        else {
          if (result) {
            this.noteServices.updateNotes(result).subscribe((response) => {
            })
          }
        }
        this.emitObservable.next();
      });
    }

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
      var notes = { title: this.title.value, description: this.description.value, color: this.matCardColor, isPined: this.isPinned, isArchived: this.isArchived }
      this.noteServices.addNotes(notes).subscribe((response) => {
        this.isPinned = false;
        this.isArchived = false;
        this.emitObservable.next();
      }, (error: any) => {
        this.snackBar.open(error.message, undefined, { duration: 2000 });
      });;

      // resetting title and description to empty
      this.title.setValue("");
      this.description.setValue("");
      // calling child event 
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
   * @description : delete note and add to trash notes list
   * @param note: note to be deleted
   */
  delete(note) {

    let data = { noteIdList: [note.id], isDeleted: true };

    this.noteServices.deleteNotes(data).subscribe((response) => {
      this.emitObservable.next();
    });
  }

  /**
   * @description : add notes to archive notes list
   * @param note: note to be added
   */
  archive(note) {
    if (note.isPined) {
      let data = { noteIdList: [note.id], isArchived: true, isPined: false };

      this.noteServices.addToArchive(data).subscribe((response) => {
        this.emitObservable.next();
      });
    }
    else {
      let data = { noteIdList: [note.id], isArchived: true };

      this.noteServices.addToArchive(data).subscribe((response) => {
        this.emitObservable.next();
      });
    }
  }

  /**
   * @description updates mat card color of selected notes
   * @param color color value
   * @param note note, which has to be colored
   */
  updateBackgroundColor(color, note) {
    let data = { noteIdList: [note.id], color: color };
    this.noteServices.updateBackgroundColor(data).subscribe((response) => {
      this.emitObservable.next();
    });
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
   * @description adds a label to notes
   * @param noteId note id of note to which label will be added 
   * @param label label details to add
   */
  addLable(noteId, labelId, event) {

    if (event.checked) {
      this.noteServices.addLabelToNote(noteId, labelId).subscribe((response) => {
        // console.log(response);
        this.emitObservable.next();
      })
    }
    else {
      this.removeLabel(noteId, labelId);
    }

  }

  /**
   * @description removing a label with post request params 
   * @param noteId noteid to which label attached
   * @param labelId label id
   */
  removeLabel(noteId, labelId) {
    this.noteServices.removeLabelToNotes(noteId, labelId).subscribe((response) => {
      // console.log(response);
      this.emitObservable.next();
    })
  }

  /**
   * @description to show that label is already selected and checkbox is checked
   * @param note note to which check label is checked or not 
   * @param label label details 
   */
  isChecked(note, label) {

    for (let notelabel of note.noteLabels) {
      if (notelabel.label == label.label)
        return true;
    }
    return false;

  }

  /**
   * @description opens a dialog box for adding collaborator to notes 
   * @param note note details  
   */
  addCollaborator(note) {
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
      width: '550px',
      data: note,
      panelClass: "matDialogBox"
    });
    dialogRef.componentInstance.emitCollaboratorChanges.subscribe(() => {
      this.emitObservable.next();
    });
    // dialogRef.afterClosed().subscribe(result => {

    // });
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
   * @description to update checkbox status with close on checked or open on unchecked
   * @param event event is an event emitter of mat checkbox 
   * @param noteId note id of checkList
   * @param item checkList item details
   */
  changecheckListStatus(noteId,item,event){
    if(event.checked){
      let data={itemName:item.itemName,status:"close"};
      this.noteServices.updateCheckList(noteId,item.id,data).subscribe((response)=>{
      });
    }
    else{
      let data={itemName:item.itemName,status:"open"};
      this.noteServices.updateCheckList(noteId,item.id,data).subscribe((response)=>{
      });
    }
    this.emitObservable.next();
  }

  /**
   * @description unsubscribe to noteslist if component gets destoried
   */
  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }
}
