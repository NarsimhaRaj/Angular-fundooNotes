import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/httpServices/http.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordFormGroup: FormGroup;
  hide:Boolean=true;
  token:any;

  constructor(private activateRoute:ActivatedRoute,private httpService:HttpService) 
  {
    this.resetPasswordFormGroup = new FormGroup({

         password: new FormControl('', [Validators.required]),
         confirmPassword: new FormControl('', [Validators.required]),
      }, 
      { validators: this.pwdMatchValidator }
      )
  }
  pwdMatchValidator(frm: FormGroup) 
  {
    return frm.get('password').value === frm.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }
  ngOnInit() {
    this.token=this.activateRoute.snapshot.params['token'];
  }
  change() {
    if(this.resetPasswordFormGroup.valid)
     {
       var passwordData={password:this.resetPasswordFormGroup.get('password').value,
            confirmPassword:this.resetPasswordFormGroup.get('confirmPassword').value
      } 
      this.httpService.resetPassword(passwordData,this.token).subscribe((response)=>{
        console.log(response)
      })
     }
    else
      console.log("error")
  }
}
