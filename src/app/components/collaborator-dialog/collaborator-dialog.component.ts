import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/noteServices/note.service';

@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit {

  email:FormControl=new FormControl('');
  imageUrl:FormControl=new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private noteServices:NoteService) {
      this.email.setValue(data.user.email);   
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickSave(){
    this.dialogRef.close({});
  }


  remove(noteId,collaboratorUsedId){
    this.noteServices.removeCollaborator(noteId,collaboratorUsedId).subscribe((response)=>{
      
    });
  }
  ngOnInit() {
  }

}
