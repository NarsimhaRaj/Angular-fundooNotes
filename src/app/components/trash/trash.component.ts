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

  // filtering notes with searchWord
  searchWord:string;

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

    this.dashBoard.emitSearchEvent.subscribe((search:string)=>{
      this.searchWord=search;
    })

  }
  getNotesList() {
    this.noteServices.getNotesList().subscribe((response: any) => {
      this.notesList = response.data.data;
      this.notesList.reverse();
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

  /**
   * @description if reminder completed then strike that reminder
   * @param reminder note reminder
   */
  reminderDecoration(reminder){
    let today=new Date();
    let newReminder=reminder.replace('GMT+0000','GMT+0530');
    let reminderDate=new Date(newReminder);
    if(today.getTime()>reminderDate.getTime())
      return "line-through";
    return "none";
  }

  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }
}
