import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CartDialogData } from '../cart/cart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CartDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  proceedToCheckout(){
    this.dialogRef.close({serviceId:this.data.service.id});
  }

  ngOnInit() {
  }

}
