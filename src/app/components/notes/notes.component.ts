import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar } from '@angular/material';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  notesList: any;

  private getNotesObs: any;

  @Input() newNoteEvent: Observable<void>;

  constructor(private noteServices: NoteService,private snackBar:MatSnackBar) { }



  delete(note){
    console.log(note.noteId);
    this.noteServices.deleteNotes(note);
  }

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
        this.notesList = response.data.data;
      }, (error: any) => {
        this.snackBar.open(error.message, undefined, { duration: 2000 });
     })

    });

  }
  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }

}
