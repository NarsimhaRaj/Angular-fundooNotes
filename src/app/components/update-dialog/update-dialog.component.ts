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

    for (let item of data.noteCheckLists) {
      this.listItemFormArray.push(new FormControl(item.itemName));
    }
    console.log(this.listItemFormArray.controls[0]);
    console.log(this.listItemFormArray.controls[1]);
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
      this.data.noteCheckLists.push(data);

      this.noteServices.addCheckList(this.data.id, data).subscribe(response => { });

      this.listDescription.setValue("");
    }
  }

  /**
  * @description delete item from checkList on pressing cancel button
  * @param item item to be deleted
  */
  filterCheckList(item) {
    this.data.noteCheckLists = this.data.noteCheckLists.filter(listItem => listItem != item);
    console.log(item.id);
    console.log(this.data.id);
    this.noteServices.removeCheckListItem(this.data.id, item.id).subscribe((response) => {
      console.log(response);
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
      this.noteServices.updateCheckList(this.noteId, item.id, data).subscribe((response) => {
      });
    }
    else {
      let data = { itemName: item.itemName, status: "open" };
      this.noteServices.updateCheckList(this.noteId, item.id, data).subscribe((response) => {
      });
    }
  }
}
