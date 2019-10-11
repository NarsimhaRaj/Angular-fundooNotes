import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserService } from 'src/app/services/userServices/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  notesList: any;

  private getNotesObs: any;

  @Input() newNoteEvent: Observable<void>;

  constructor(private userServices: UserService) { }

  ngOnInit() {

    this.userServices.getNotesList().subscribe((response: any) => {
      console.log(response.data);
      this.notesList = response.data.data;
    }, (error) => {
      console.log(error);
    })

    console.log("this is executing ");

    this.getNotesObs = this.newNoteEvent.subscribe(() => {

      this.userServices.getNotesList().subscribe((response: any) => {
        console.log(response.data);
        this.notesList = response.data.data;
      }, (error) => {
        console.log(error);
      })

    });

  }
  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }

}
