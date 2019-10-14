import { Component, OnInit, OnDestroy, Input } from '@angular/core';
// import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  notesList: any;

  private getNotesObs: any;
  private colorChange= false;

  constructor(private noteServices: NoteService,private snackBar:MatSnackBar) { }

  delete(note){
    this.noteServices.deleteNotes(note).subscribe((response) => {
      console.log("deleted notes");
      this.noteServices.emitObservable.next();
    });;
  }

  ngOnInit() {

    this.getNotesList();

    this.getNotesObs = this.noteServices.emitObservable.subscribe(() => {
      this.getNotesList();
    });

  }
  getNotesList(){
    this.noteServices.getNotesList().subscribe((response: any) => {
      this.notesList = response.data.data;
    }, (error) => {
      this.snackBar.open(error.message, undefined, { duration: 2000 });
    })
  }
  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }

}
