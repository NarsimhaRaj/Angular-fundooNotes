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
  isAdvancedUser=true;

  constructor(private userService:UserService) {
    this.getUserService();
   }

  ngOnInit() {
    this.getService();
  }

  getService(){
    this.userService.getService().subscribe((response:any)=>{
      this.services=response.data.data;
    });
  }

    /**
   * @description to get logged in user registered service we sent a rest api request
   */
  getUserService() {
    this.userService.getUserDetailsById().subscribe((response: any) => {
      if (response.service == "basic")
        this.isAdvancedUser = false;
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
