import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userServices/user.service';
import { CartService } from 'src/app/services/cartServices/cart.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  service: any;

  isProceedToCheckOut: boolean = false;
  signinOrder = true;
  reviewOrder = false;
  completeOrder = false;
  isAdvancedUser = true;
  cartId: string = "";

  address = new FormControl();

  constructor(private userService: UserService, private cartService: CartService) {
    this.getUserService();
  }

  ngOnInit() {
    this.getCartDetails();
  }

  getCartDetails() {
    let productId = sessionStorage.getItem("serviceId");
    let data = { productId: productId };
    this.cartService.addToCart(data).subscribe((response: any) => {
      this.cartId = response.data.details.id;
      this.cartService.getCartDetails(this.cartId).subscribe((response: any) => {
        this.service = response.data.product;
      })
    })
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



  proceedToCheckOut() {
    this.signinOrder = false;
    this.reviewOrder = true;
    this.completeOrder = false;
    this.isProceedToCheckOut = !this.isProceedToCheckOut;
  }
  placeOrder() {
    if (this.address.value != "") {

      let data = { cartId: this.cartId, address: this.address.value };
      this.cartService.placeOrder(data).subscribe((response) => {
        this.signinOrder = false;
        this.reviewOrder = false;
        this.completeOrder = true;
      })
      // this.isProceedToCheckOut=!this.isProceedToCheckOut;
    }
  }
}
