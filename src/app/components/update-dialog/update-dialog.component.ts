import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/components/notes/notes.component';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { Subject } from 'rxjs';

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

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private noteServices:NoteService) { 
      this.noteId=data.noteId;
      this.title.setValue(data.title);
      this.description.setValue(data.description);
      this.color.setValue(data.color);   
    }
  /**
   * @description pass the modified or updated data where dialogRef is being called
   */
  onCloseClick():void{
    this.dialogRef.close({noteId:this.noteId,title:this.title.value,description:this.description.value});
  }

  /**
   * @description to update color of note on clickign selected color in update dialog box
   * @param color type of color
   */
  updateBackgroundColor(color){
    this.data.color=color;
    this.color.setValue(color);
    this.emitColorEvent.next(color);
  }

  /**
   * @description to deletes a note on clicking delete button 
   * @param note note which has to be deleted
   */
  delete(){
    
    let data = { noteListId: [this.noteId], isDeleted: true };
    this.dialogRef.close(data);
  }

  ngOnInit(){
  }

}
