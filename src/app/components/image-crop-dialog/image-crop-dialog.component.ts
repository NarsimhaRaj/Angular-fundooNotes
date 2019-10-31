import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-crop-dialog',
  templateUrl: './image-crop-dialog.component.html',
  styleUrls: ['./image-crop-dialog.component.scss']
})
export class ImageCropDialogComponent implements OnInit {


  imageChangedEvent:any;
  fileToUpload:any;
  croppedImage:any;

  constructor(public dialogRef: MatDialogRef<ImageCropDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.imageChangedEvent=data;
    console.log(this.imageChangedEvent);
  }

  onUpload(){
    this.dialogRef.close(this.fileToUpload);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.fileToUpload=event.base64;
  }
  ngOnInit() {
  }

}
