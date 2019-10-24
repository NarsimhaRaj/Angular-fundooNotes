import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';
import { UserService } from '../userServices/user.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public emitObservable: Subject<void> = new Subject<void>();
  
  constructor(private httpService: HttpService) { }


  /**
   * @description : executes httpServices post request with token to method to add a notes 
   * @param notes : its an object containing details like title, description 
   */
  addNotes(notes) {
    let url = "/notes/addNotes";
    return this.httpService.postWithToken(url, notes);
  }

  /**
   * @description : executes httpServices get request method to get Notes of logged in user
   */
  getNotesList() {
    let url = "/notes/getNotesList";
    return this.httpService.getWithToken(url);
  }

  /**
   * @description : executes httpServices post request with token method to delete a notes 
   * @param notes : its an object containing details like noteIdList , isDeleted, etc. 
   */
  deleteNotes(data) {    
    let url = "/notes/trashNotes";
    return this.httpService.postWithToken(url, data);
  }
  /**
   * @description to make a note archive here sending an post request to rest api with header token
   * @param note its an object containing details like isArchived, noteIdList.
   */
  addToArchive(data) {
    let url = "/notes/archiveNotes";
    return this.httpService.postWithToken(url, data);
  }

  /**
   * @description updates background color of notes
   * @param note its an object containing details like noteIdList, color. 
   */
  updateBackgroundColor(data) {
    let url = "/notes/changesColorNotes";
    return this.httpService.postWithToken(url, data)
  }

  /**
   * @description to delete a note permanently 
   * @param data contains noteId and isDeleted key value pairs
   */
  deleteForeverNotes(data){
    let url = "/notes/deleteForeverNotes";
    return this.httpService.postWithToken(url, data);
  }

  /**
   * @description to update a notes
   * @param data contains noteId key value pairs
   */
  updateNotes(data){
    let url = "/notes/updateNotes";
    return this.httpService.postWithToken(url, data)
  }

  /**
   * @description pin or unpin note from note list
   * @param data data contains note Id and is Pinned and is Archived details
   */
  pinUnpinNotes(data){
    let url="/notes/pinUnpinNotes";
    return this.httpService.postWithToken(url,data);
  }


  /**
   * @description add lebel to notes 
   */
  addLabelToNote(noteId,labelId){
    
    let url=`/notes/${noteId}/addLabelToNotes/${labelId}/add`;

    let params=new HttpParams();
    params.append('noteId',noteId);
    params.append('labelId',labelId);

    return this.httpService.postWithParams(url,params)
  }

  /**
   * @description sending a post request to removes label to note 
   * @param noteId noteId to which label to be removed
   * @param labelId labelId of labels
   */
  removeLabelToNotes(noteId,labelId){

    let url=`/notes/${noteId}/addLabelToNotes/${labelId}/remove`;

    let params=new HttpParams();
    params.append('noteId',noteId);
    params.append('labelId',labelId);

    return this.httpService.postWithParams(url,params)
  }

  /**
   * @description sends post request with labelname as parameter to gets all notes list of that label 
   * @param labelName name of the label
   */
  getLabelNotesList(labelName){
    let url=`/notes/getNotesListByLabel/${labelName}`;

    let params=new HttpParams();
    params.append('labelName',labelName);

    return this.httpService.postWithParams(url,params)
  }


  /**
   * @description adding a collaborator to notes with noteId id, sending a post request
   * @param noteId note id 
   * @param data data with collaborator details
   */
  addCollaborator(noteId,data){
    
    let url= `/notes/${noteId}/AddcollaboratorsNotes`;

    return this.httpService.postWithToken(url,data);
  }

  /**
   * @description to delete a collaborator from notes
   * @param noteId note id of notes
   * @param collaboratorUserId added collabarotor userId of notes 
   */
  removeCollaborator(noteId,collaboratorUserId){

    let url= `/notes/${noteId}/removeCollaboratorsNotes/${collaboratorUserId}`;

    return this.httpService.delete(url,{});
  }

  /**
   * @description to add checklist item to existed
   * @param noteId note id os notes
   * @param data checkList data
   */
  addCheckList(noteId,data){
 
    let url= `/notes/${noteId}/noteCheckLists`;
    return this.httpService.postWithToken(url,data);

  }
}
