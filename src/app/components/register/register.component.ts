import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { UserService } from 'src/app/services/userServices/user.service';
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

  /**
   * @description constructor injects these following dependencies on initialization, and also validates registered details
   * @param Route : provides routing from one component to other component 
   * @param userService : provides user services for resetting password 
   * @param snackBar : snackbar to show resultent details
   * 
   */

  constructor(private userService: UserService,private snackBar:MatSnackBar,private route:Router) 
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
  /**
   * @description returns boolean value on validating equality of password and confirmpassword
   * @param frm formgroup of password and confirm password
   */
  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }
  //register new user to database
  register() {
  
    // user services will be provided for register after details are validated  
    if (this.registerFormGroup.valid) {
  
      var newUser = {
        firstName: this.registerFormGroup.get("firstName").value,
        lastName: this.registerFormGroup.get("lastName").value,
        email: this.registerFormGroup.get("email").value,
        password: this.registerFormGroup.get("passwordFormGroup").get("password").value,
        service: this.registerFormGroup.get("service").value
      }

      this.userService.register(newUser).subscribe((response:any) => {
        this.snackBar.open(response.message,undefined,{duration:2000})
        this.route.navigateByUrl('/login');
      },(error)=>{
        this.snackBar.open(error.message,undefined,{duration:2000});
        this.registerFormGroup.reset();
      });

    } 
    else {
      
      this.snackBar.open("Invalid Details Entered, Register again ",undefined,{duration:2000});
    
    }
  }


  ngOnInit() {
  }

}