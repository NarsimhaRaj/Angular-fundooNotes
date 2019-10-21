import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LabelDialogData } from '../dashboard/dashboard.component';
import { FormControl } from '@angular/forms';
import { LabelService } from 'src/app/services/label/label.service';

@Component({
  selector: 'app-labels-dialog',
  templateUrl: './labels-dialog.component.html',
  styleUrls: ['./labels-dialog.component.scss']
})
export class LabelsDialogComponent implements OnInit {

  labelName:FormControl=new FormControl('');
  labels:any;
  constructor(
    public dialogRef: MatDialogRef<LabelsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LabelDialogData,private labelServices:LabelService) {}

  onClickCreate(){
    this.dialogRef.close(this.labelName.value);
  }

  getNoteLabelList(){
    this.labelServices.getNoteLabelList().subscribe((response:any)=>{
      this.labels=response.data.details;
      console.log(response);
    });
  }
  /**
   * @description creates a label 
   */
  createLabel(){

    let data={label:this.labelName.value,isDeleted:false,userId:sessionStorage.getItem("user")["id"]};
    this.labelServices.addLabel(data).subscribe((response)=>{
      this.getNoteLabelList();
    });

  }
  deleteLabel(label){
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getNoteLabelList();
  }

}
