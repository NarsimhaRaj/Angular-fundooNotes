import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { HttpService } from 'src/app/services/httpServices/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //Member varibales of class, for 2way data binding
  firstname:String;
  lastname:String;
  email:String;
  password:String;
  confirmPassword:String;
  // Contorllers for Validation
  firstnameController:FormControl;
  lastnameController:FormControl;
  emailController:FormControl;
  passwordController:FormControl;
  hide:Boolean = true;
  
  constructor(private httpService: HttpService) {
    // email Validation 
    this.emailController=new FormControl('',[
      Validators.email,Validators.required
    ]);
    //firstname Validation 
    this.firstnameController=new FormControl('',[
      Validators.required
    ]);
    // last name validation
    this.lastnameController=new FormControl('',[
      Validators.required
    ]);
    //password validation
    this.passwordController=new FormControl('',[
      Validators.required,Validators.minLength(8)
    ]);
   }

   //register new user to database
   register(){
     var newUser={firstName:this.firstname,lastName:this.lastname,
      email:this.email,password:this.password,confirmPassword:this.confirmPassword,service:"basic" }

      this.httpService.register(newUser).subscribe((response)=>{
        console.log(response);
      });
   }
  ngOnInit() {
  }

}
