import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userServices/user.service';
import { MatDialog } from '@angular/material';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { Router } from '@angular/router';

export interface CardDialogData{
  service:any;
}

@Component({
  selector: 'app-cart',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  services:any;

  constructor(private userService:UserService,private dialog:MatDialog,private route:Router) { }

  ngOnInit() {
    this.getService();
  }

  getService(){
    this.userService.getService().subscribe((response:any)=>{
      this.services=response.data.data;
    });
  }

  openDialog(service): void {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '550px',
      data: {service:service},
      panelClass:"cartDailog"
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        sessionStorage.setItem("serviceId",result.serviceId);
        this.route.navigateByUrl("/register");
      }
    });
  }

  /**
   * @description on clicking sign in instead it open login component
   */
  loginPage(){
    this.route.navigateByUrl("/login");
  }

}
