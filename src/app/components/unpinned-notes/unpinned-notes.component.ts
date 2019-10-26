import { Component, OnInit, Input } from '@angular/core';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { UserService } from 'src/app/services/userServices/user.service';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LabelService } from 'src/app/services/label/label.service';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-unpinned-notes',
  templateUrl: './unpinned-notes.component.html',
  styleUrls: ['./unpinned-notes.component.scss']
})
export class UnpinnedNotesComponent implements OnInit {

  // list of notes
  @Input() notesList:any;

  @Input() isAdvancedUser:boolean;

  @Input() labels:any;

  @Input() searchWord:string;

  @Input() data:any;


  constructor(private userService: UserService, private noteServices: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog, private dashBoard: DashboardComponent, private labelService: LabelService,private noteComponent:NotesComponent) {
    

    this.data = this.dashBoard.getData();

    this.dashBoard.emitView.subscribe(() => {
      this.data = this.dashBoard.getData();
    })
  }


  ngOnInit() {
    
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
        this.noteComponent.emitObservable.next();
      });
    }

  }
  /**
   * @description : delete note and add to trash notes list
   * @param note: note to be deleted
   */
  delete(note) {

    let data = { noteIdList: [note.id], isDeleted: true };

    this.noteServices.deleteNotes(data).subscribe((response) => {
      this.noteComponent.emitObservable.next();
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
        this.noteComponent.emitObservable.next();
      });
    }
    else {
      let data = { noteIdList: [note.id], isArchived: true };

      this.noteServices.addToArchive(data).subscribe((response) => {
        this.noteComponent.emitObservable.next();
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
      this.noteComponent.emitObservable.next();
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
      this.noteComponent.emitObservable.next();
    });
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
    this.noteComponent.emitObservable.next();
  }

  /**
   * @description opens a dialog box for adding collaborator to notes 
   * @param note note details  
   */
  addCollaborator(note?) {
    if(note){
      const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
        width: '550px',
        data: note,
        panelClass: "matDialogBox"
      });
      dialogRef.componentInstance.emitCollaboratorChanges.subscribe(() => {
        this.noteComponent.emitObservable.next();
      });
    }
    
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
        this.noteComponent.emitObservable.next();
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
      this.noteComponent.emitObservable.next();
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

}
