import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public emailFormController:FormControl;

  constructor(){
      this.emailFormController = new FormControl('', [
        Validators.required,
        Validators.email
      ]);
    }
  ngOnInit(){

  }
}
