import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { HttpService } from 'src/app/services/httpServices/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Contorllers for Validation
  registerFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  hide: Boolean = true;

  constructor(private httpService: HttpService,private snackBar:MatSnackBar,private route:Router) 
  {
    this.registerFormGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      passwordFormGroup : new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      }, {validators:this.pwdMatchValidator}),
      service: new FormControl('',[Validators.required])
    })
    // "service": new FormControl('',[Validators.required])
    
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }
  //register new user to database
  register() {
    if (this.registerFormGroup.valid) {
      var newUser = {

        firstName: this.registerFormGroup.get("firstName").value,
        lastName: this.registerFormGroup.get("lastName").value,
        email: this.registerFormGroup.get("email").value,
        password: this.registerFormGroup.get("passwordFormGroup").get("password").value,
        // confirmPassword:this.passwordFormGroup.get("confirmPassword").value,
        service: this.registerFormGroup.get("service").value
        // service:this.registerFormGroup.get("service").value
      }
      this.httpService.register(newUser).subscribe((response:any) => {
        this.snackBar.open(response.message,undefined,{duration:2000})
        this.route.navigateByUrl('/login');
      },(error)=>{
        this.snackBar.open(error.message,undefined,{duration:2000});
        this.registerFormGroup.reset();
      });
    } else {
      this.snackBar.open("Invalid Details Entered, Register again ",undefined,{duration:2000});
    }
  }


  ngOnInit() {
  }

}