import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
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

  localData:any;
  title=new FormControl('');
  description=new FormControl('');
  color=new FormControl('');
  noteId:String;

  emitColorEvent=new Subject();

  emitLableEvent=new Subject();

  listDescription=new FormControl('');
  
  // all the labels creted by user
  labels=new Array();
  checkListArray=new Array();

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private noteServices:NoteService,private labelService:LabelService,
    private dialog:MatDialog) { 
      this.noteId=data.id;
      this.title.setValue(data.title);
      this.description.setValue(data.description);
      this.color.setValue(data.color);   
    }
  /**
   * @description pass the modified or updated data where dialogRef is being called
   */
  onCloseClick():void{
    this.dialogRef.close({noteId:this.noteId,title:this.title.value,description:this.description.value, color:this.color.value});
  }

  /**
   * @description to update color of note on clickign selected color in update dialog box
   * @param color type of color
   */
  updateBackgroundColor(color){
    this.data.color=color;
    this.color.setValue(color);
  }

  /**
   * @description to deletes a note on clicking delete button 
   * @param note note which has to be deleted
   */
  delete(){
    
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

  searchLabel(labelId){
    for(let label of this.labels)
    {
      if(label.id==labelId)
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
      let index=this.data.noteLabels.indexOf(this.searchLabel(labelId));
      this.data.noteLabels.splice(index,1);
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

  ngOnInit(){
    this.getAllLabels();
  }

}
