import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, FormArray } from '@angular/forms';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { Subject } from 'rxjs';
import { LabelService } from 'src/app/services/label/label.service';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  localData: any;
  title = new FormControl('');
  description = new FormControl('');
  color = new FormControl('');
  noteId: String;

  emitColorEvent = new Subject();

  emitLableEvent = new Subject();

  listDescription = new FormControl('');

  listItemFormArray = new FormArray([]);

  // all the labels creted by user
  labels = new Array();
  checkListArray = new Array();

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private noteServices: NoteService, private labelService: LabelService,
    private dialog: MatDialog) {
    this.noteId = data.id;
    this.title.setValue(data.title);
    this.description.setValue(data.description);
    this.color.setValue(data.color);

    this.saveListFormArray();
  }

  saveListFormArray(){
    for (let item of this.data.noteCheckLists) {
      this.listItemFormArray.push(new FormControl(item.itemName));
    }
  }
  /**
   * @description pass the modified or updated data where dialogRef is being called
   */
  onCloseClick(): void {
    
    if(this.data.description==""){
      this.saveListItemChanges();
    }

    this.dialogRef.close({
      noteId: this.noteId,
      title: this.title.value,
      description: this.description.value,
      color: this.color.value
    });
  }
  /**
   * @description to save changes made to notes 
   */
  saveListItemChanges(){
    let index=0;
    for(let newItem of this.listItemFormArray.controls){
      let item=this.data.noteCheckLists[index];
      let data={itemName:newItem.value,status:item.status};
      this.noteServices.updateCheckList(this.noteId, item.id, data).subscribe((response) => {
      });
      index++;
    }
  }

  /**
   * @description to pin or unpin a notes
   * @param note notes which has to be pinned
   * @param isPinned if notes is pinned true or false value will be set 
   */
  pinUnpin(isPinned: boolean) {
    let data = { noteIdList: [this.data.id], isPined: isPinned };
    this.noteServices.pinUnpinNotes(data).subscribe((response) => {
      this.data.isPined=isPinned;
    });
  }

  archive() {
    this.dialogRef.close({ isArchived: true, note: this.data });
  }
  /**
   * @description to update color of note on clickign selected color in update dialog box
   * @param color type of color
   */
  updateBackgroundColor(color) {
    this.data.color = color;
    this.color.setValue(color);
  }

  /**
   * @description to deletes a note on clicking delete button 
   * @param note note which has to be deleted
   */
  delete() {

    let data = { noteListId: [this.noteId], isDeleted: true };
    this.dialogRef.close(data);
  }

  // LABELS


  /**
   * @description get all the labels created by user
   */
  getAllLabels() {
    this.labelService.getNoteLabelList().subscribe((response: any) => {
      this.labels = response.data.details;
    });
  }

  searchLabel(labelId) {
    for (let label of this.labels) {
      if (label.id == labelId)
        return label;
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
        this.data.noteLabels.push(this.searchLabel(labelId));
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
      let index = this.data.noteLabels.indexOf(this.searchLabel(labelId));
      this.data.noteLabels.splice(index, 1);
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
  addCollaborator() {
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
      width: '550px',
      data: this.data,
      panelClass: "matDialogBox"
    });
    dialogRef.componentInstance.emitCollaboratorChanges.subscribe(() => {

    });
  }

  ngOnInit() {
    this.getAllLabels();
  }

  /**
   * @description on pressing enter value gets added to checklistArray
   * @param event enter key event trggered
   */
  EnterCheckList(event) {
    if (event.keyCode == 13 && this.listDescription.value != "") {
      let data = { itemName: this.listDescription.value, status: "open" };

      this.noteServices.addCheckList(this.data.id, data).subscribe(response => {
        this.data.noteCheckLists.push(response);
       });

      this.listItemFormArray.push(new FormControl(this.listDescription.value));

      this.listDescription.setValue("");
    }
  }

  /**
  * @description delete item from checkList on pressing cancel button
  * @param item item to be deleted
  */
  filterCheckList(item,index) {
    this.data.noteCheckLists = this.data.noteCheckLists.filter(listItem => listItem != item);
    
    this.listItemFormArray.removeAt(index);
    // console.log(item,index);
    this.noteServices.removeCheckListItem(this.data.id, item.id).subscribe((response) => {
      
    });
  }

  /**
   * @description to update checkbox status with close on checked or open on unchecked
   * @param event event is an event emitter of mat checkbox 
   * @param noteId note id of checkList
   * @param item checkList item details
   */
  changecheckListStatus(item, event) {
    if (event.checked) {
      let data = { itemName: item.itemName, status: "close" };
      this.data.noteCheckLists.filter((listItem)=>{
        if(listItem==item){
          listItem.status='close';
        }
      })
      this.noteServices.updateCheckList(this.noteId, item.id, data).subscribe((response) => {
      });
    }
    else {
      let data = { itemName: item.itemName, status: "open" };
      
      this.data.noteCheckLists.filter((listItem)=>{
        if(listItem==item){
          listItem.status='open';
        }
        return true;
      })

      this.noteServices.updateCheckList(this.noteId, item.id, data).subscribe((response) => {
      });
    }
  }

  /**
   * @description to set reminder to a notes
   * @param reminderTimeDate event data send from child component
   */
  setReminder(reminderTimeDate){
    let data={noteIdList:[this.data.id],reminder:reminderTimeDate};

    this.noteServices.addUpdateReminderNotes(data).subscribe((response)=>{
      // console.log(response);
      this.data.reminder.push(data.reminder);
    });
  }

  /**
   * @description to delete a note's reminder
   * @param noteId id of notes with reminder
   */
  removeReminder(){
    let data={noteIdList:[this.data.id]};
    this.noteServices.removeReminderNotes(data).subscribe((response)=>{
      this.data.reminder.pop()
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
