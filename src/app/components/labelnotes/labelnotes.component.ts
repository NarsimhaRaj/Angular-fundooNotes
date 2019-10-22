import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { Subject } from 'rxjs';
import { LabelService } from 'src/app/services/label/label.service';

@Component({
  selector: 'app-labelnotes',
  templateUrl: './labelnotes.component.html',
  styleUrls: ['./labelnotes.component.scss']
})
export class LabelnotesComponent implements OnInit {


  isPinned:boolean=false;
  isArchived:boolean=false;

  //mat cards expansion panel variables
  panelOpenState: Boolean = false;

  // Subject observable
  getNotesObs: any;

  // mat card title and description formcontrol varibales
  title = new FormControl('', [
    Validators.required
  ]);
  description = new FormControl('', [
    Validators.required
  ]);

  labelNotesList:any;
  labelName:string;

  // list of labels of a notes
  labels:any;

  // matcardColor
  matCardColor: string = "";

  // if pin count is zero then it should not show PINNED and OTHERS headings
  pinCountZero: boolean = false;

  // default data before changes applied from dashboard component
  data = {
    viewLayoutType: "row wrap",
    viewStyling: true
  }
  // to emit an event after every modifications
  public emitObservable: Subject<void> = new Subject<void>();


  constructor(private noteServices:NoteService, private activeRoute:ActivatedRoute, private dashBoard:DashboardComponent,
    public dialog: MatDialog, private snackBar: MatSnackBar, private labelServices:LabelService) {

    this.data = this.dashBoard.getData();

    this.dashBoard.emitView.subscribe(()=>{
      this.data = this.dashBoard.getData();
    });

   }

  ngOnInit() {

    this.activeRoute.paramMap.subscribe((params)=>{
      this.labelName=params.get("labelName");
      this.getNoteListByLabel(this.labelName);
    })

    this.getNotesObs = this.emitObservable.subscribe(() => {
      
      this.activeRoute.paramMap.subscribe((params)=>{
        this.labelName=params.get("labelName");
        this.getNoteListByLabel(this.labelName);
      })

    });
  }

  /**
   * @description passes a labelName to getlabelNotesList in noteService which sends an api request to http services
   * @param labelName label name 
   */
  getNoteListByLabel(labelName){
    this.noteServices.getLabelNotesList(labelName).subscribe((response:any)=>{
      this.labelNotesList=response.data.data;
      this.pinCountZero = this.pinned(this.labelNotesList);
    });
  }

  /**
   * @description opens a dialog box for updating selected note
   * @param note note, which has to be updated
   */
  openDialog(note): void {

      const dialogRef = this.dialog.open(UpdateDialogComponent, {
        width: '550px',
        data: { noteId: note.id, title: note.title, description: note.description, color: note.color },
        panelClass: "matDialogBox"
      });

      dialogRef.afterClosed().subscribe(result => {
        
        if(result.color!=note.color){
          this.updateBackgroundColor(result.color,note);
        }
        if(result.isDeleted){
          this.delete(note);
        }
        else{
          if (result) {
            this.noteServices.updateNotes(result).subscribe((response) => {
            })
          }
        }
        this.emitObservable.next();
      });
  }
 
   /**
   * @description updates mat card color of selected notes
   * @param color color value
   * @param note note, which has to be colored
   */
  updateBackgroundColor(color, note) {
    let data = { noteIdList: [note.id], color: color };
    this.noteServices.updateBackgroundColor(data).subscribe((response) => {
      this.emitObservable.next();
    });
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

  setPin(){
    this.isPinned=!this.isPinned;
  }
  setArchive(){
    this.isArchived=!this.isArchived;
  }
  /**
   *@description this will add a notes to user notes list 
   */
  save() {
    if (this.title.valid || this.description.valid) {
      let user=JSON.parse(sessionStorage.getItem("user"));
      var notes = { 
        title: this.title.value,
        description: this.description.value, 
        color: this.matCardColor,
        isPined:this.isPinned, 
        isArchived:this.isArchived,
        noteLabels:[{label:this.labelName, isDeleted:false, userId:user.userId}] 
      }
      this.noteServices.addNotes(notes).subscribe((response) => {
        this.isPinned=false;
        this.isArchived=false;
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

  /**
   * @description get all the labels created by user
   */
  getAllLabels(){
    this.labelServices.getNoteLabelList().subscribe((response:any)=>{
      this.labels=response.data.details;
    });
  }

  /**
   * @description adds a label to notes
   * @param noteId note id of note to which label will be added 
   * @param label label details to add
   */
  addLable(noteId,labelId,event){

    if(event.checked)
    {
      this.noteServices.addLabelToNote(noteId,labelId).subscribe((response)=>{
        // console.log(response);
        this.emitObservable.next();
      })
    }
    else
    {
      this.removeLabel(noteId,labelId);
    }

  }

  /**
   * @description removing a label with post request params 
   * @param noteId noteid to which label attached
   * @param labelId label id
   */
  removeLabel(noteId,labelId){
    this.noteServices.removeLabelToNotes(noteId,labelId).subscribe((response)=>{
      // console.log(response);
      this.emitObservable.next();
    })
  }

  /**
   * @description if a notes has already given with the label name then checkbox should be checked
   * @param note note details contains noteLabels
   * @param label label details 
   */
  isChecked(note,label){

    for(let notelabel of note.noteLabels)
    {
      if(notelabel.label==label.label)
        return true;
    }
    return false;

  }
}
