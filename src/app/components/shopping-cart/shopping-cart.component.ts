import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  services=["",""];

  isProceedToCheckOut:boolean=false;
  signinOrder=true;
  reviewOrder=false;
  completeOrder=false;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.getService();
  }

  getService(){
    this.userService.getService().subscribe((response:any)=>{
      this.services=response.data.data;
    });
  }

  proceedToCheckOut(){
    this.signinOrder=false;
    this.reviewOrder=true;
    this.completeOrder=false;
    this.isProceedToCheckOut=!this.isProceedToCheckOut;
  }
  placeOrder(){
    this.signinOrder=false;
    this.reviewOrder=false;
    this.completeOrder=true;
    this.isProceedToCheckOut=!this.isProceedToCheckOut;
  }
}
