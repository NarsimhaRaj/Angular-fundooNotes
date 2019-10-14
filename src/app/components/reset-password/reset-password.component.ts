import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordFormGroup: FormGroup;
  hide: Boolean = true;
  token: any;

  /**
   * @description constructor injects these following dependencies on initialization
   * @param activateRoute : provides routing from one component to other component 
   * @param userService : provides user services for resetting password 
   * @param snackBar : snackbar to show resultent details
   */
  constructor(private activateRoute: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar) {
    this.resetPasswordFormGroup = new FormGroup({

      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
      { validators: this.pwdMatchValidator }
    )
  }
  /**
   * @description this function is to check whether password and confirm password field matches
   * @param frm : formgroup of password and confirmPasword
   */
  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  ngOnInit() {
    this.token = this.activateRoute.snapshot.params['token'];
  }
  
  /**
   * @description resets new password is its a valid password 
   */

  change() {
   
    if (this.resetPasswordFormGroup.valid) {
   
      var passwordData = {
        newPassword: this.resetPasswordFormGroup.get('password').value,
        confirmPassword: this.resetPasswordFormGroup.get('confirmPassword').value
      }
      this.userService.resetPassword(passwordData, this.token)
        .subscribe((response: any) => {
          this.snackBar.open("password has been changed", undefined, { duration: 2000 });
        }, (error: any) => {
          this.snackBar.open(error.message, undefined, { duration: 2000 });
        });;
    }
    else {
      this.snackBar.open("Entered Details are not right format", undefined, { duration: 2000 });
    }
  }
}
