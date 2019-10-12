import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';
import { UserService } from '../userServices/user.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public emitObservable: Subject<void> = new Subject<void>();

  constructor(private httpService: HttpService, private userServices: UserService, private snackBar: MatSnackBar) { }


  /**
   * @description : executes httpServices post request with token to method to add a notes 
   * @param notes : its an object containing like title, description 
   */
  addNotes(notes) {
    let url = "/notes/addNotes";
    this.httpService.postWithToken(url, notes, this.userServices.loginId).subscribe((response) => {
      this.emitObservable.next();
    }, (error: any) => {
      this.snackBar.open(error.message, undefined, { duration: 2000 });
    });
  }

  /**
   * @description : executes httpServices get request method to get Notes of logged in user
   */
  getNotesList() {
    let url = "/notes/getNotesList";
    return this.httpService.getWithToken(url, this.userServices.loginId);
  }

  /**
   * @description : executes httpServices post request with token method to delete a notes 
   * @param notes : its an object containing like title, description 
   */
  deleteNotes(note) {

    let data = { noteIdList: [note.id], isDeleted: true };
    let url = "/notes/trashNotes";

    this.httpService.postWithToken(url, data, this.userServices.loginId).subscribe((response) => {
      console.log("deleted notes");
      this.emitObservable.next();
    });
  }
}
