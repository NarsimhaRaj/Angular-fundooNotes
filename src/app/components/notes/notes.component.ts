import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit,OnChanges {

  notesList:any;

  constructor(private userServices: UserService) { }

  ngOnChanges(){
    
  }

  ngOnInit() {
    this.userServices.getNotesList().subscribe((response:any)=>{
      console.log(response.data);
      this.notesList=response.data.data;
    },(error)=>{
      console.log(error);
    })
  }

}
