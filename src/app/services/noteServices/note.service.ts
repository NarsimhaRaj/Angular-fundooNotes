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
   * @param notes : its an object containing details like title, description 
   */
  addNotes(notes) {
    let url = "/notes/addNotes";
    return this.httpService.postWithToken(url, notes, this.userServices.loginId);
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
   * @param notes : its an object containing details like noteIdList , isDeleted, etc. 
   */
  deleteNotes(data) {    
    let url = "/notes/trashNotes";
    return this.httpService.postWithToken(url, data, this.userServices.loginId);
  }
  /**
   * @description to make a note archive here sending an post request to rest api with header token
   * @param note its an object containing details like isArchived, noteIdList.
   */
  addToArchive(data) {
    let url = "/notes/archiveNotes";
    return this.httpService.postWithToken(url, data, this.userServices.loginId);
  }

  /**
   * @description updates background color of notes
   * @param note its an object containing details like noteIdList, color. 
   */
  updateBackgroundColor(data) {
    let url = "/notes/changesColorNotes";
    return this.httpService.postWithToken(url, data, this.userServices.loginId)
  }

  /**
   * @description to delete a note permanently 
   * @param data contains noteId and isDeleted key value pairs
   */
  deleteForeverNotes(data){
    let url = "/notes/deleteForeverNotes";
    return this.httpService.postWithToken(url, data, this.userServices.loginId);
  }

  /**
   * @description to update a notes
   * @param data contains noteId key value pairs
   */
  updateNotes(data){
    let url = "/notes/updateNotes";
    return this.httpService.postWithToken(url, data, this.userServices.loginId)
  }
}
