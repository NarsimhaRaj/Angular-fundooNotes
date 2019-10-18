import { Component, OnInit, OnDestroy} from '@angular/core';
// import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/userServices/user.service';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

export interface DialogData {
  noteId: String;
  title: String;
  description: String;
  color: String;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  // notesList from server
  notesList: any;

  //mat cards expansion panel variables
  private getNotesObs: any;
  panelOpenState: Boolean = false;

  // mat card title and description formcontrol varibales
  title = new FormControl('', [
    Validators.required
  ]);
  description = new FormControl('', [
    Validators.required
  ]);

  // data from dashboard component
  data = {
    viewLayoutType: "row wrap",
    viewStyling: true
  }

  // user Service variable
  isAdvancedUser: boolean = true;//initially value set to advance

  // matcardColor
  matCardColor: string = "";

  pinCountZero: boolean = false;

  // to emit an event after every modifications
  public emitObservable: Subject<void> = new Subject<void>();


  constructor(private userService: UserService, private noteServices: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog, private dashBoard: DashboardComponent) {
    this.getUserService();

    this.dashBoard.emitView2.subscribe(()=>{
      console.log("here1111");
      this.data = this.dashBoard.getData();
    })
  }


  ngOnInit() {
    console.log("created");
    // to get user registered Service
    this.userService.setUser();
    this.getNotesList();

    this.getNotesObs = this.emitObservable.subscribe(() => {
      this.getNotesList();
    });

  }

  /**
   * @description to get logged in user registered service we sent a rest api request
   */
  getUserService() {
    this.userService.getUserDetailsById().subscribe((response: any) => {
      if (response.service == "basic")
        this.isAdvancedUser = false;
    });
  }

  openDialog(note): void {

    if (this.isAdvancedUser) {

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

  }

  /**
   * @description to pin or unpin a notes
   * @param note notes which has to be pinned
   * @param isPinned if notes is pinned true or false value will be set 
   */
  pinUnpin(note, isPinned: boolean) {
    let data = { noteIdList: [note.id], isPined: isPinned };
    this.noteServices.pinUnpinNotes(data).subscribe((response) => {
      this.emitObservable.next();
    });
  }

  /**
   * @description counts number of notes are pinned 
   */
  pinned(notesList: any) {
    let note: any;
    for (note of notesList) {
      if (note.isPined) {
        return true;
      }
    }
    return false;
  }

  onClickedOutside(e: Event) {
    this.panelOpenState = !this.panelOpenState;
  }
  /**
   * 
   */
  save() {
    if (this.title.valid || this.description.valid) {
      var notes = { title: this.title.value, description: this.description.value, color: this.matCardColor }
      this.noteServices.addNotes(notes).subscribe((response) => {
        this.emitObservable.next();
      }, (error: any) => {
        this.snackBar.open(error.message, undefined, { duration: 2000 });
      });;

      // resetting title and description to empty
      this.title.setValue("");
      this.description.setValue("");

      // calling child event 
    }
  }


  getNotesList() {
    this.noteServices.getNotesList().subscribe((response: any) => {
      this.notesList = response.data.data;
      this.pinCountZero = this.pinned(this.notesList);
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
      this.emitObservable.next();
    });
  }

  /**
   * @description : add notes to archive notes list
   * @param note: note to be added
   */
  archive(note) {
    let data = { noteIdList: [note.id], isArchived: true };

    this.noteServices.addToArchive(data).subscribe((response) => {
      this.emitObservable.next();
    })
  }

  /**
   * @description
   */
  updateBackgroundColor(color, note?) {
    if (note) {
      let data = { noteIdList: [note.id], color: color };
      this.noteServices.updateBackgroundColor(data).subscribe((response) => {
        this.emitObservable.next();
      });
    }
    else {
      this.matCardColor = color;
    }
  }


  ngOnDestroy() {
    this.getNotesObs.unsubscribe();
  }
}
