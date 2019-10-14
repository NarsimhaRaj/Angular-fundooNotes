import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/userServices/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public emailFormGroup:FormGroup;
  
  /**
   * @description constructor injects these following dependencies on initialization, and also validates details
   * @param Route : provides routing from one component to other component 
   * @param userService : provides user services for resetting password 
   * @param snackBar : snackbar to show resultent details
   * 
   */
  constructor(private userService: UserService, private snackBar:MatSnackBar,private route:Router) {
    this.emailFormGroup=new FormGroup({
      'email': new FormControl('',[Validators.email,Validators.required])
    })
   }

   /**
    * @description sends mail to user registered account only if it is valid 
    */
  send(){
    this.userService.forgotPassword({email:this.emailFormGroup.get('email').value})
    .subscribe((response:any)=>{
      this.snackBar.open(response.message,undefined,{duration:2000});
    },(error)=>{
      this.snackBar.open(error.message,undefined,{duration:2000})
    });
  }

  /**
   * @description provides route to login component page on clicking back button in view template
   */
  backToLoginPage(){
    this.route.navigateByUrl('/login');
  }
  
  ngOnInit() {
  }

}
