import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { UserService } from 'src/app/services/userServices/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit {

  searchWord:FormControl=new FormControl('');
  users:any;
  notesList;

  emitCollaboratorChanges=new Subject();

  constructor(
    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private noteServices:NoteService, private userServices:UserService) {
 
    }

  /**
   * @description removes collaborator details from note 
   * @param noteId noteId of note 
   * @param collaboratorUsedId collaboratorUserId
   */
  remove(noteId,collaboratorUsedId){
    this.noteServices.removeCollaborator(noteId,collaboratorUsedId).subscribe((response)=>{
      
      this.data.collaborators=this.data.collaborators.filter((user)=>{
        return user.userId!=collaboratorUsedId;    
      })
      this.emitCollaboratorChanges.next();
    });
  }

  /**
   * @description search
   * @param searchWord 
   */
  searchUser(searchWord){
    if(searchWord!=""){
      let data={"searchWord":searchWord}
      this.userServices.searchUser(data).subscribe((response:any)=>{
      this.users=response.data.details;
    });
    }
  }
  /**
   * @description on pressing key event gets trigggered and searches in notes
   * @param event event object
   */
  searchOnKeyPress(event){
   this.searchUser(event.target.value); 
  }


  /**
   * @description on selecting a user add as collaborator
   * @param user user details -id, firstName, lastName, email
   */
  onSelect(user){
    this.noteServices.addCollaborator(this.data.id,user).subscribe(()=>{
      this.data.collaborators.push(user);
      this.emitCollaboratorChanges.next();
    })
  }
  ngOnInit() {
  }

}
