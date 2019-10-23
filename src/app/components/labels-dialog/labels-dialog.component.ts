import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { LabelService } from 'src/app/services/label/label.service';
import { EventEmitter } from 'events';
import { NoteService } from 'src/app/services/noteServices/note.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-labels-dialog',
  templateUrl: './labels-dialog.component.html',
  styleUrls: ['./labels-dialog.component.scss']
})
export class LabelsDialogComponent implements OnInit {

  labelName:FormControl=new FormControl('');
  labels:any;
  editLabel:boolean=true;
  editedTextLabel=new FormControl('');
  // global id 
  defaultLabelId:string="";

  emitUpdateLabelEvent=new Subject();

  constructor(public dialogRef: MatDialogRef<LabelsDialogComponent>,private labelServices:LabelService, 
    private noteService:NoteService ) {}


  ngOnInit() {
    this.getNoteLabelList();

    this.emitUpdateLabelEvent.subscribe(()=>{
      this.getNoteLabelList();
    })
  }

  /**
   * @description gets all the labels created by user
   */
  getNoteLabelList(){
    this.labelServices.getNoteLabelList().subscribe((response:any)=>{
      this.labels=response.data.details;
    });
  }

  /**
   * @description creates a label 
   */
  createLabel(){

    let user=JSON.parse(sessionStorage.getItem('user'));
    let data={label:this.labelName.value,isDeleted:false,userId:user.userId};
    this.labelServices.addLabel(data).subscribe((response)=>{
      this.getNoteLabelList();
    });

  }

  /**
   * @description sends delete request to remove label with labelId 
   * @param label label contains label name, id
   */
  deleteLabel(labelId){

    this.labelServices.deleteLabel(labelId).subscribe((response)=>{

      // on deleting label delete label name on the notes
      this.noteService.getNotesList().subscribe((response:any)=>{
        let noteList=response.data.data;
        noteList.forEach(note => {
          this.noteService.removeLabelToNotes(note.id,labelId).subscribe((response)=>{
            console.log("deleted");
          });
        });
      })
      this.getNoteLabelList();
    });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * @description set value of editable label  
   * @param label label details passed to set value 
   */
  setEditLabel(labelId){
    this.defaultLabelId=labelId;
    this.editLabel=!this.editLabel;
  }
  /**
   * @description to update a label sending service request in labelServices
   * @param labelId labelId of label
   */
  updateLabel(labelId){
    
    if(this.editedTextLabel.value!=""){
      let user=JSON.parse(sessionStorage.getItem('user'));
      let data={label:this.editedTextLabel.value,isDeleted:false,userId:user.userId};

      this.labelServices.updateLabel(data,labelId).subscribe((response)=>{
      this.getNoteLabelList();
    })
    }
    this.defaultLabelId="";
  }

}
