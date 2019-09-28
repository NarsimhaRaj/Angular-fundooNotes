import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public _router:Router;
  public emailFormController: FormControl;
  constructor() {
    this.emailFormController = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
  }
  btnClick():void {
    this._router.navigateByUrl('/register');
  };
  ngOnInit() {

  }
}
