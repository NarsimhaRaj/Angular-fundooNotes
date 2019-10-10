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

  constructor(private activateRoute: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar) {
    this.resetPasswordFormGroup = new FormGroup({

      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
      { validators: this.pwdMatchValidator }
    )
  }
  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }
  ngOnInit() {
    this.token = this.activateRoute.snapshot.params['token'];
  }
  change() {
    if (this.resetPasswordFormGroup.valid) {
      var passwordData = {
        newPassword: this.resetPasswordFormGroup.get('password').value,
        confirmPassword: this.resetPasswordFormGroup.get('confirmPassword').value
      }
      this.userService.resetPassword(passwordData, this.token);
    }
    else {
      this.snackBar.open("Entered Details are not right format",undefined,{duration:2000});
    }
  }
}
