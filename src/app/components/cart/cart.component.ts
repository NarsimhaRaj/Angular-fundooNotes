import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userServices/user.service';
import { MatDialog } from '@angular/material';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

export interface CartDialogData{
  service:any;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

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
