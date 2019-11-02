import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';

export interface DialogData {
  noteId: String;
  title: String;
  description: String;
  color: String;
}

@Component({
  selector: 'app-reminder-notes',
  templateUrl: './reminder-notes.component.html',
  styleUrls: ['./reminder-notes.component.scss']
})
export class ReminderNotesComponent implements OnInit {

  notesList: any;

  private getNotesObs: any;
  colorChange: boolean[] = new Array();

  // data from dashboard component
  data = {
    viewLayoutType: "row wrap",
    viewStyling: true
  }

  // filtering notes with searchWord
  searchWord:string;
  
  public emitObservable: Subject<void> = new Subject<void>();

  constructor(private noteServices: NoteService, private snackBar: MatSnackBar, public dialog: MatDialog,
    private dashBoard: DashboardComponent) {

    // modifies data on list and grid view
    this.data = this.dashBoard.getData();
    
    // to madify on current route emitting an event
    this.dashBoard.emitView.subscribe(()=>{
      this.data = this.dashBoard.getData();
    })
  }

  ngOnInit() {

    console.log("created");

    this.getNotesList();

    this.getNotesObs = this.emitObservable.subscribe(() => {
      this.getNotesList();
    });

    this.dashBoard.emitSearchEvent.subscribe((search:string)=>{
      this.searchWord=search;
    })

  }

  /**
   * @description opens a dialog box for updating selected note
   * @param note note, which has to be updated
   */
  openDialog(note): void {

      const dialogRef = this.dialog.open(UpdateDialogComponent, {
        width: '550px',
        data: note,
        panelClass: "matDialogBox"
      });
      
      dialogRef.afterClosed().subscribe(result => {

        if(result!=undefined && result.isArchived){
          this.archive(result.note);
        }
        if(result!=undefined &&  result.color){
          this.updateBackgroundColor(result.color, note);
        }
        if (result!=undefined && result.isDeleted) {
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

  getNotesList() {
    this.noteServices.getReminderNotesList().subscribe((response: any) => {
      this.notesList = response.data.data;
      this.notesList.reverse();
    }, (error) => {
      this.snackBar.open(error.message, undefined, { duration: 2000 });
    })
  }

  pinUnpin(note,isPinned) {
    let data = { noteIdList: [note.id], isPined: isPinned, isArchived:false };
    this.noteServices.pinUnpinNotes(data).subscribe((response) => {
      this.emitObservable.next();
    });
  }


  /**
   * @description : delete note and add to trash notes list
   * @param note: note to be deleted
   */
  delete(note) {

    let data = { noteIdList: [note.id], isDeleted: true };

    this.noteServices.deleteNotes(data).subscribe((response) => {
      console.log(response);
      this.emitObservable.next();
    });
  }

  /**
   * @description : add notes to archive notes list
   * @param note: note to be added
   */
  unArchive(note) {
    let data = { noteIdList: [note.id], isArchived: false };

    this.noteServices.addToArchive(data).subscribe((response) => {
      this.emitObservable.next();
    })

  }

  /**
   * @description
   */
  updateBackgroundColor(color, note) {

    let data = { noteIdList: [note.id], color: color };

    this.noteServices.updateBackgroundColor(data).subscribe((response) => {
      this.emitObservable.next();
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
    this.emitObservable.next();
  }

  /**
   * @description if atleast on open or close list item exist then show list item otherwise hide it
   * @param noteCheckLists checkList notes
   * @param status status of list item  
   */
  checkListItemStatus(noteCheckLists,status){
    for(let item of noteCheckLists)
    {
      if(item.status==status)
        return true;
    }
    return false;
  }

   /**
   * @description to set reminder to a notes
   * @param reminderTimeDate 
   */
  setReminder(reminderTimeDate,note){
    let data={noteIdList:[note.id],reminder:reminderTimeDate};

    console.log(data.reminder);
    this.noteServices.addUpdateReminderNotes(data).subscribe((response)=>{
      // console.log(response)
      this.emitObservable.next();
    });
  }

  /**
   * @description to delete a note's reminder
   * @param noteId id of notes with reminder
   */
  removeReminder(noteId){
    let data={noteIdList:[noteId]};
    this.noteServices.removeReminderNotes(data).subscribe((response)=>{
      this.emitObservable.next();
    })
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
        this.emitObservable.next();
      });
    }
    
  }

  /**
   * @description if reminder completed then strike that reminder
   * @param reminder note reminder
   */
  reminderDecoration(reminder){
    let today=new Date();
    let newReminder=reminder.replace('GMT+0000','GMT+0530');
    let reminderDate=new Date(newReminder);
    if(today.getTime()>reminderDate.getTime())
      return "line-through";
    return "none";
  }

  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }
}
