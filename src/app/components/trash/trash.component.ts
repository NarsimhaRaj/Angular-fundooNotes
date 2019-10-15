import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  notesList: any;

  private getNotesObs: any;
  colorChange: boolean[] = new Array();
  // isReminderEnable:Boolean=false;

  public emitObservable: Subject<void> = new Subject<void>();

  constructor(private noteServices: NoteService,private snackBar:MatSnackBar) { }

  

  ngOnInit() {

    this.getNotesList();

    this.getNotesObs = this.emitObservable.subscribe(() => {
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

  /**
   * @description : delete note and add to trash notes list
   * @param note: note to be deleted
   */
  deleteForever(note){

    let data = { noteIdList: [note.id], isDeleted: true };

    this.noteServices.deleteForeverNotes(data).subscribe((response) => {
      this.emitObservable.next();
    });
  }

  /**
   * @description : to restore notes updating a key value in notes
   * @param note: note to be restored
   */
  restoreNotes(note){
    
    let newNote={title:note.title,description:note.description}

    this.noteServices.addNotes(newNote).subscribe((response) => {
      this.emitObservable.next();
    });
    this.deleteForever(note);
  }

  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }
}
