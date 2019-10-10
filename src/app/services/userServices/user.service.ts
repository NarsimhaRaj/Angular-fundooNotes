import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private messageSource = new BehaviorSubject('');
  loginId = this.messageSource.asObservable();

  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) {

  }
  getData() {
    this.httpService.getData();
  }
  login(data) {
    this.httpService.login(data).subscribe((response: any) => {
      this.snackBar.open("SuccessFully Logged In", undefined, { duration: 2000 });
      this.loginId = response.id;
      this.router.navigateByUrl('/dashboard');
    }, (error: any) => {
      this.snackBar.open(error.message, undefined, { duration: 2000 })
    });
  }
  register(data) {
    return this.httpService.register(data);
  }
  forgotPassword(data) {
    return this.httpService.forgotPassword(data);
  }
  resetPassword(passwordData, token) {
    
    this.httpService.resetPassword(passwordData, token)
      .subscribe((response: any) => {
           this.snackBar.open("password has been changed", undefined, { duration: 2000 });
        }, (error: any) => {
          this.snackBar.open(error.message, undefined, { duration: 2000 });
       });

  }

  addNotes(notes) {
    this.httpService.addNotes(notes, this.loginId).subscribe((response)=>{
      console.log(response);
    });
  }

  getNotesList() {
    return this.httpService.getNotesList(this.loginId);
  }
}
