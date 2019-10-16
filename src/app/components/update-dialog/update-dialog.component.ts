import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/components/notes/notes.component';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/noteServices/note.service';

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

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private noteServices:NoteService) { 
      this.noteId=data.noteId;
      this.title.setValue(data.title);
      this.description.setValue(data.description);
      this.color.setValue(data.color);   
    }

  onCloseClick():void{
    this.dialogRef.close({noteId:this.noteId,title:this.title.value,description:this.description.value,color:this.color.value});
  }

  updateBackgroundColor(color){
    this.color.setValue(color);
  }

  delete(note){
    
    let data = { noteIdList: [note.id], isDeleted: true };

    this.noteServices.deleteNotes(data).subscribe((response) => {
      this.dialogRef.close();
    });
  }

  ngOnInit(){
  }

}
