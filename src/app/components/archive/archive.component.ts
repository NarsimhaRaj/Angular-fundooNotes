import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  notesList: any;

  private getNotesObs: any;
  colorChange: boolean[] = new Array();
  // isReminderEnable:Boolean=false;

  constructor(private noteServices: NoteService,private snackBar:MatSnackBar) { }

  

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
