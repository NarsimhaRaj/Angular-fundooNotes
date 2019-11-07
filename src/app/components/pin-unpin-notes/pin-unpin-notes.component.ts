import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatDialog } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pin-unpin-notes',
  templateUrl: './pin-unpin-notes.component.html',
  styleUrls: ['./pin-unpin-notes.component.scss']
})
export class PinUnpinNotesComponent implements OnInit {

  // list of notes
  @Input() notesList:any;

  @Input() isAdvancedUser:boolean;

  @Input() labels:any;

  @Input() searchWord:string;

  @Input() data:any;

  @Input() isPinned:boolean;

  @Output() componentRef=new EventEmitter();

  searchLabel:string;

  constructor(private noteServices: NoteService, public dialog: MatDialog, private dashBoard: DashboardComponent,
    private route:Router) {
    

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

        if(result!=undefined && result.isArchived){
          console.log(result);
          this.archive(result.note);
        }
        if(result!=undefined &&  result.color){
          this.updateBackgroundColor(result.color, note);
        }
        else if (result!=undefined && result.isDeleted) {
          this.delete(note);
        }
        else {
          if (result) {
            this.noteServices.updateNotes(result).subscribe((response) => {
            })
          }
        }
        this.componentRef.emit(null);
        console.log(note);
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
      this.componentRef.emit(null);
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
        this.componentRef.emit(null);
      });
    }
    else {
      let data = { noteIdList: [note.id], isArchived: true };

      this.noteServices.addToArchive(data).subscribe((response) => {
        this.componentRef.emit(null);
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
      this.componentRef.emit(null);
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
      this.componentRef.emit(null);
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
        this.componentRef.emit(null);
      });
    }
    else{
      let data={itemName:item.itemName,status:"open"};
      this.noteServices.updateCheckList(noteId,item.id,data).subscribe((response)=>{
        this.componentRef.emit(null);
      });
    }
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
        this.componentRef.emit(null);
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
        this.componentRef.emit(null);
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
      this.componentRef.emit(null);
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
   * @description keyboard char input reading to search
   * @param event 
   */
  searchLabelMatInput(event){
    this.searchLabel=event.target.value;
    console.log(this.searchLabel)
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
      this.componentRef.emit(null);
    });
  }

  /**
   * @description to delete a note's reminder
   * @param noteId id of notes with reminder
   */
  removeReminder(noteId){
    let data={noteIdList:[noteId]};
    this.noteServices.removeReminderNotes(data).subscribe((response)=>{
      this.componentRef.emit(null);
    })
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

}

