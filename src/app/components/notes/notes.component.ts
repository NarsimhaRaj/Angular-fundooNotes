import { Component, OnInit, OnDestroy, Input } from '@angular/core';
// import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  notesList: any;

  private getNotesObs: any;
  panelOpenState: Boolean = false;
  // isReminderEnable:Boolean=false;

  title = new FormControl('', [
    Validators.required
  ]);
  description = new FormControl('', [
    Validators.required
  ]);


  constructor(private noteServices: NoteService,private snackBar:MatSnackBar) { }

  

  ngOnInit() {

    this.getNotesList();

    this.getNotesObs = this.noteServices.emitObservable.subscribe(() => {
      this.getNotesList();
    });

  }

  
  onClickedOutside(e: Event) {
    this.panelOpenState = !this.panelOpenState;
  }
  /**
   * 
   */
  save() {
    if (this.title.valid || this.description.valid) {
      var notes = { title: this.title.value, description: this.description.value }
      this.noteServices.addNotes(notes).subscribe((response) => {
        this.noteServices.emitObservable.next();
      }, (error: any) => {
        this.snackBar.open(error.message, undefined, { duration: 2000 });
      });;

      // resetting title and description to empty
      this.title.setValue("");
      this.description.setValue("");

      // calling child event 
    }
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
  delete(note){
    this.noteServices.deleteNotes(note).subscribe((response) => {
      this.noteServices.emitObservable.next();
    });;
  }

  /**
   * @description : add notes to archive notes list
   * @param note: note to be added
   */
  archive(note)
  {
    this.noteServices.addToArchive(note).subscribe((response)=>{
      this.noteServices.emitObservable.next();
    })
  }

  /**
   * @description
   */
  updateBackgroundColor(color,note){
    this.noteServices.updateBackgroundColor(color,note).subscribe((response)=>{
      this.noteServices.emitObservable.next();
    });
  }
  // addReminder(){
  //   this.isReminderEnable=!this.isReminderEnable;
  // }

  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }
}
