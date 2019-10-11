import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';
import { UserService } from '../userServices/user.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService:HttpService,private userServices:UserService,private snackBar:MatSnackBar) { }


  addNotes(notes) {
    this.httpService.addNotes(notes, this.userServices.loginId).subscribe((response)=>{
    },(error: any) => {
      this.snackBar.open(error.message, undefined, { duration: 2000 });
   });
  }

  getNotesList() {
    return this.httpService.getNotesList(this.userServices.loginId);
  }

  deleteNotes(note){
    let data={id:note.id,isDeleted:true};
    this.httpService.deleteNotes(data,this.userServices.loginId).subscribe((response)=>{
      console.log("note deleted")
    });
  }
}
