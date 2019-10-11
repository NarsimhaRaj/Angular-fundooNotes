import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';
import { UserService } from '../userServices/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService:HttpService,private userServices:UserService) { }


  addNotes(notes) {
    this.httpService.addNotes(notes, this.userServices.loginId).subscribe((response)=>{
    });
  }

  getNotesList() {
    return this.httpService.getNotesList(this.userServices.loginId);
  }

}
