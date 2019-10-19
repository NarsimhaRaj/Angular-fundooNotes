import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

export interface DialogData {
  noteId: String;
  title: String;
  description: String;
  color: String;
}

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  notesList: any;

  private getNotesObs: any;
  colorChange: boolean[] = new Array();

  // data from dashboard component
  data = {
    viewLayoutType: "row wrap",
    viewStyling: true
  }

  public emitObservable: Subject<void> = new Subject<void>();

  constructor(private noteServices: NoteService, private snackBar: MatSnackBar, public dialog: MatDialog,
    private dashBoard: DashboardComponent) {

    this.data = this.dashBoard.getData();
    
    this.dashBoard.emitView.subscribe(()=>{
      this.data = this.dashBoard.getData();
    })
  }

  ngOnInit() {

    console.log("created");

    this.getNotesList();

    this.getNotesObs = this.emitObservable.subscribe(() => {
      this.getNotesList();
    });

  }

  openDialog(note): void {

    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '550px',
      data: { noteId: note.id, title: note.title, description: note.description, color: note.color },
      panelClass: "matDialogBox"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.noteServices.updateNotes(result).subscribe((response) => {
          // console.log(response);
        })
      }
      this.emitObservable.next();
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
  delete(note) {

    let data = { noteIdList: [note.id], isDeleted: true };

    this.noteServices.deleteNotes(data).subscribe((response) => {
      console.log(response);
      this.emitObservable.next();
    });
  }

  /**
   * @description : add notes to archive notes list
   * @param note: note to be added
   */
  unArchive(note) {
    let data = { noteIdList: [note.id], isArchived: false };

    this.noteServices.addToArchive(data).subscribe((response) => {
      this.emitObservable.next();
    })

  }

  /**
   * @description
   */
  updateBackgroundColor(color, note) {

    let data = { noteIdList: [note.id], color: color };

    this.noteServices.updateBackgroundColor(data).subscribe((response) => {
      this.emitObservable.next();
    });
  }
  // addReminder(){
  //   this.isReminderEnable=!this.isReminderEnable;
  // }

  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }
}
