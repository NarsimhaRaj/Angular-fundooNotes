import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpService:HttpService) { }
  
  addToCart(data){
    let url="/productcarts/addToCart"
    return this.httpService.post(url,data);
  }

  getCartDetails(cartId){
    let url=`/productcarts/getCartDetails/${cartId}`;
    return this.httpService.get(url);
  }
  
  placeOrder(data){
    let url=`/productcarts/placeOrder`;
    return this.httpService.postWithToken(url,data);
  }
}
