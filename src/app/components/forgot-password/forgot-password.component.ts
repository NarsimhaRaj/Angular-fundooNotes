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
  
  constructor(private userService: UserService, private snackBar:MatSnackBar,private route:Router) {
    this.emailFormGroup=new FormGroup({
      'email': new FormControl('',[Validators.email,Validators.required])
    })
   }

  send(){
    this.userService.forgotPassword({email:this.emailFormGroup.get('email').value})
    .subscribe((response:any)=>{
      this.snackBar.open(response.message,undefined,{duration:2000});
    },(error)=>{
      this.snackBar.open(error.message,undefined,{duration:2000})
    });
  }


  backToLoginPage(){
    this.route.navigateByUrl('/login');
  }
  
  ngOnInit() {
  }

}
