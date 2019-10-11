import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/noteServices/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  notesList: any;

  private getNotesObs: any;

  @Input() newNoteEvent: Observable<void>;

  constructor(private noteServices: NoteService) { }

  ngOnInit() {

    this.noteServices.getNotesList().subscribe((response: any) => {
      console.log(response.data);
      this.notesList = response.data.data;
    }, (error) => {
      console.log(error);
    })

    console.log("this is executing ");

    this.getNotesObs = this.newNoteEvent.subscribe(() => {

      this.noteServices.getNotesList().subscribe((response: any) => {
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
