import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  notesList: any;

  private getNotesObs: any;
  colorChange: boolean[] = new Array();

  // data from dashboard component
  data = {
    viewLayoutType: "row wrap",
    viewStyling: true
  }

  public emitObservable: Subject<void> = new Subject<void>();

  constructor(private noteServices: NoteService, private snackBar: MatSnackBar,
    private dashBoard: DashboardComponent) {
      
    
    this.data = this.dashBoard.getData();
    
    this.dashBoard.emitView.subscribe(()=>{
      this.data = this.dashBoard.getData();
    })
  }

  ngOnInit() {

    this.getNotesList();

    this.getNotesObs = this.emitObservable.subscribe(() => {
      this.getNotesList();
    });

  }
  getNotesList() {
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
  deleteForever(note) {

    let data = { noteIdList: [note.id], isDeleted: true };

    this.noteServices.deleteForeverNotes(data).subscribe((response) => {
      this.emitObservable.next();
    });
  }

  /**
   * @description : to restore notes updating a key value in notes
   * @param note: note to be restored
   */
  restoreNotes(note) {

    let newNote={noteIdList:[note.id],isDeleted:false};

    this.noteServices.deleteNotes(newNote).subscribe((response) => {
      this.emitObservable.next();
    });
  }

  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }
}
