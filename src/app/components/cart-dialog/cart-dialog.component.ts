import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CardDialogData } from '../card/card.component';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CardDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  proceedToCheckout(){
    this.dialogRef.close({serviceId:this.data.service.id});
  }

  ngOnInit() {
  }

}
