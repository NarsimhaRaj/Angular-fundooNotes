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
  }

  /**
   * @description closes dialogbox and passes data
   */
  onUpload(){
    this.dialogRef.close(this.fileToUpload);
  }

  /**
   * @description this function gets called everytime we make changes while image cropping
   * @param event cropped event 
   */
  imageCropped(event: ImageCroppedEvent) {
    var fileBeforeUpload=this.imageChangedEvent.target.files[0];
    this.fileToUpload=new File([this.base64toBlob(event.base64)], fileBeforeUpload.name,{type:fileBeforeUpload.type});
    // console.log(this.fileToUpload);
  }
  ngOnInit() {
  }

  /**
   * @description converting base64 data to blob 
   * @param dataURI cropped image base 64 data
   */
  base64toBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

}
