import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LabelDialogData } from '../dashboard/dashboard.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-labels-dialog',
  templateUrl: './labels-dialog.component.html',
  styleUrls: ['./labels-dialog.component.scss']
})
export class LabelsDialogComponent implements OnInit {

  labelName:FormControl=new FormControl('');
  constructor(
    public dialogRef: MatDialogRef<LabelsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LabelDialogData) {}

  onClickCreate(){
    this.dialogRef.close(this.labelName.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
